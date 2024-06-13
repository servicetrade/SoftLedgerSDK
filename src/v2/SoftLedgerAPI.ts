import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as t from '../types';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as _ from 'lodash';

export const DEFAULT_CHUNK_SIZE = 1000;
export type NumericId = number | string;

export interface SoftledgerConnectionCacheInterface {
	set: (authData: SoftledgerConnectionAuthResponse) => Promise<void>;
	get: () => Promise<string>;
}

export type SoftledgerConnectionAuthResponse = {
	access_token: string;
	scope: string;
	expires_in: number;
	token_type: string;
};

export interface SoftledgerConnectionLoggerInterface {
	debug: (data: any) => any;
	info: (data: any) => any;
	verbose: (data: any) => any;
	warn: (data: any) => any;
	error: (data: any) => any;
}

export type SoftledgerConnectionOptions = {
	auth0Options: {
		grant_type: 'client_credentials';
		tenantUUID: string;
		audience: string;
		client_id: string;
		client_secret: string;
	};
	url: string;
	authUrl: string;
	refreshAuth?: boolean;
	cache?: SoftledgerConnectionCacheInterface;
	logger?: SoftledgerConnectionLoggerInterface;
};

interface SoftledgerPage<T> {
	hasNextPage: boolean;
	cursor: string;
	data: Array<T>;
}
export type SoftledgerGetFilterType = 'all' | 'any';
export type SoftledgerOrder = Array<[string, 'ASC' | 'DESC']>;
export interface SoftledgerGetRequestBase {
	filter?: { [k: string]: any };
	filterType?: SoftledgerGetFilterType;
	limit?: number;
	cursor?: string;
	LocationId?: NumericId;
}
export interface SoftledgerGetRequest extends SoftledgerGetRequestBase {
	order?: SoftledgerOrder;
}
export interface SoftledgerGetRequestFormatted extends SoftledgerGetRequestBase {
	order?: string;
}

export type SoftLedgerSDKOptions = {
	ifExists: boolean;
};

enum Entity {
	Address = 'addresses',
	Customer = 'customer',
	StockAdjustment = 'stock-adjustments',
	StockAdjustmentSummary = 'stock-adjustments/summary',
	StockSummary = 'stock/summary',
	Item = 'items',
	Job = 'jobs',
	LineItem = 'lines',
	Location = 'locations',
	PurchaseOrder = 'purchase-orders',
	PurchaseOrderLineItems = 'purchase-orders/lines',
	SalesOrder = 'sales-orders',
	SalesOrderLineItem = 'sales-orders/line',
	SalesOrderLineItems = 'sales-orders/lines', // [sic] The current SL api is not consistent and uses both.
	ShipmentReceipt = 'shipment-receipts',
	ShipmentReceiptLine = 'shipment-receipts/lines',
	Template = 'templates',
	Transfer = 'transfers',
	Vendor = 'vendors',
	Warehouse = 'warehouses',
}

enum Verb {
	Accept = 'accept',
	Complete = 'complete',
	Email = 'email',
	Fulfill = 'fulfill',
	Issue = 'issue',
	Receive = 'receive',
	Reject = 'reject',
	UnComplete = 'uncomplete',
	UnFulfill = 'unfulfill',
	UnIssue = 'unissue',
	Void = 'void',
}

const NULL_LOGGER: SoftledgerConnectionLoggerInterface = {
	debug: () => {},
	info: () => {},
	verbose: () => {},
	warn: () => {},
	error: () => {},
};

export class SoftLedgerAPI {
	private logger: SoftledgerConnectionLoggerInterface;
	private cache: SoftledgerConnectionCacheInterface;
	private instance: AxiosInstance;
	constructor(private options: SoftledgerConnectionOptions) {
		this.logger = options.logger || NULL_LOGGER;
		this.cache = options.cache;
	}

	// Get a new token from the Auth service via a auth request.
	private async getNewAuth(): Promise<SoftledgerConnectionAuthResponse> {
		return (await axios.post(this.options.authUrl, this.options.auth0Options))?.data;
	}

	private async buildInstance(): Promise<void> {
		this.logger.info(this.options);
		this.instance = axios.create({ baseURL: this.options.url });
		this.instance.defaults.headers.common['Content-Type'] = 'application/json';
		await this.setAuth();
		if (this.options.refreshAuth === true) {
			createAuthRefreshInterceptor(this.instance, async () => await this.setAuth(true));
		}
	}

	private async getToken(ignoreCache: boolean = false): Promise<string> {
		if (!ignoreCache && !!this.cache) {
			const token = await this.cache.get();
			if (!!token) return token;
		}

		const authData = await this.getNewAuth();
		if (!!this.cache) await this.cache.set(authData);

		return authData.access_token;
	}

	private async setAuth(ignoreCache: boolean = false): Promise<void> {
		const token = await this.getToken(ignoreCache);
		this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	private logResponse(resp: AxiosResponse, code: number = 200, message: string = 'OK'): void {
		const { url, method, data, params } = resp?.config || {};
		this.logger.info(`${method} ${url} ${params} ${data}: ${code} ${message}`);
		this.logger.verbose({ url, method, data, params, responseData: resp.data, code, message });
	}

	private logError(err: AxiosError): void {
		const { url, method, data, params } = err.response?.config || {};
		const { code, message } = err;
		this.logger.info(`${method} ${url} ${params} ${data}: ${err.code} ${err.message}`);
		this.logger.verbose({ url, method, data, params, responseData: null, code, message });
	}

	private async query<ReturnType>(cb: (ax: AxiosInstance) => Promise<AxiosResponse<ReturnType>>, options?: SoftLedgerSDKOptions): Promise<ReturnType> {
		try {
			const inst = await this.getInstance();
			const resp = await cb(inst);
			delete resp?.config?.headers?.Authorization;
			this.logResponse(resp);
			return resp.data;
		} catch (e) {
			if (options?.ifExists === true && e?.response?.status === 404) {
				this.logResponse(e.resp, 404, 'Not Found (ifExists = TRUE)');
				return null;
			}
			delete e?.response?.config?.headers?.Authorization;
			this.logError(e);
			throw e.toJSON();
		}
	}

	private async getOne<T>(entity: Entity, id: NumericId, options: SoftLedgerSDKOptions): Promise<T> {
		return this.query<T>((i) => i.get(`/${entity}/${id}`), options);
	}

	private async _getAll<T>(path: string, options: SoftledgerGetRequest = {}): Promise<Array<T>> {
		let limit = options.limit || 1000;
		const data: Array<T> = [];
		while (true) {
			options.limit = Math.min(DEFAULT_CHUNK_SIZE, limit);
			limit = limit - options.limit;
			const page = await this.query<SoftledgerPage<T>>((i) => i.get(path, { params: SoftLedgerAPI.formatSearchOptions(options) }));
			data.push(...page.data);
			if (page.hasNextPage && limit > 0) {
				options.cursor = page.cursor;
			} else {
				return data;
			}
		}
	}

	private getAll<T>(entity: Entity, options?: SoftledgerGetRequest): Promise<Array<T>> {
		return this._getAll<T>(`/${entity}`, options);
	}

	private async getAllSubEntity<T>(entity: Entity, subEntity: Entity, id: NumericId, options?: SoftledgerGetRequest): Promise<Array<T>> {
		return this._getAll<T>(`/${entity}/${id}/${subEntity}`, options);
	}

	private async delete<T>(entity: Entity, id: NumericId): Promise<void> {
		return this.query<void>((i) => i.delete(`/${entity}/${id}`));
	}

	private async create<T, U>(entity: Entity, data: U): Promise<T> {
		return this.query<T>((i) => i.post(`/${entity}`, { data }));
	}

	private async update<T, U>(entity: Entity, id: NumericId, data: U): Promise<T> {
		return this.query<T>((i) => i.put(`/${entity}/${id}`, { data }));
	}

	private async do(entity: Entity, verb: Verb, id: NumericId): Promise<void> {
		return this.query<void>((i) => i.put(`/${entity}/${id}/${verb}`));
	}

	private async doWithData<T>(entity: Entity, verb: Verb, id: NumericId, data: T): Promise<void> {
		return this.query<void>((i) => i.put(`/${entity}/${id}/${verb}`, { data }));
	}

	private static formatSearchOptions(options?: SoftledgerGetRequest): SoftledgerGetRequestFormatted {
		return {
			...options,
			order: options?.order ? options.order.map((x) => `${x[0]}:${x[1]}`).join(',') : undefined,
		};
	}

	async getInstance() {
		if (!this.instance) {
			await this.buildInstance();
		}
		return this.instance;
	}

	public async Address_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Address>(Entity.Address, id, options);
	}
	public async Address_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Address>(Entity.Address, options);
	}
	public async Address_delete(id: NumericId) {
		return this.delete<t.Address>(Entity.Address, id);
	}
	public async Address_create(data: t.CreateAddressRequest) {
		return this.create<t.Address, t.CreateAddressRequest>(Entity.Address, data);
	}
	public async Address_update(id: NumericId, data: t.CreateAddressRequest) {
		return this.update<t.Address, t.CreateAddressRequest>(Entity.Address, id, data);
	}

	public async Customer_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Customer>(Entity.Customer, id, options);
	}
	public async Customer_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Customer>(Entity.Customer, options);
	}
	public async Customer_delete(id: NumericId) {
		return this.delete<t.Customer>(Entity.Customer, id);
	}
	public async Customer_create(data: t.CreateCustomerRequest) {
		return this.create<t.Customer, t.CreateCustomerRequest>(Entity.Customer, data);
	}
	public async Customer_update(id: NumericId, data: t.CreateCustomerRequest) {
		return this.update<t.Customer, t.CreateCustomerRequest>(Entity.Customer, id, data);
	}

	public async Item_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Item>(Entity.Item, id, options);
	}
	public async Item_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Item>(Entity.Item, options);
	}
	public async Item_delete(id: NumericId) {
		return this.delete<t.Item>(Entity.Item, id);
	}
	public async Item_create(data: t.CreateItemRequest) {
		return this.create<t.Item, t.CreateItemRequest>(Entity.Item, data);
	}
	public async Item_update(id: NumericId, data: t.CreateItemRequest) {
		return this.update<t.Item, t.CreateItemRequest>(Entity.Item, id, data);
	}
	public async Item_stockSummary(id: NumericId) {
		return this.getAllSubEntity<t.ItemStockSummary>(Entity.Item, Entity.StockSummary, id);
	}

	public async Job_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Job>(Entity.Job, id, options);
	}
	public async Job_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Job>(Entity.Job, options);
	}
	public async Job_delete(id: NumericId) {
		return this.delete<t.Job>(Entity.Job, id);
	}
	public async Job_create(data: t.CreateJobRequest) {
		return this.create<t.Job, t.CreateJobRequest>(Entity.Job, data);
	}
	public async Job_update(id: NumericId, data: t.CreateJobRequest) {
		return this.update<t.Job, t.CreateJobRequest>(Entity.Job, id, data);
	}

	public async Location_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Location>(Entity.Location, id, options);
	}
	public async Location_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Location>(Entity.Location, options);
	}
	public async Location_delete(id: NumericId) {
		return this.delete<t.Location>(Entity.Location, id);
	}
	public async Location_create(data: t.CreateLocationRequest) {
		return this.create<t.Location, t.CreateLocationRequest>(Entity.Location, data);
	}
	public async Location_update(id: NumericId, data: t.CreateLocationRequest) {
		return this.update<t.Location, t.CreateLocationRequest>(Entity.Location, id, data);
	}

	public async PurchaseOrder_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.PurchaseOrder>(Entity.PurchaseOrder, id, options);
	}
	public async PurchaseOrder_getLineItem(id: NumericId, options?: SoftledgerGetRequest) {
		return this.getAllSubEntity<t.PurchaseOrderLineItem>(Entity.PurchaseOrder, Entity.LineItem, id, options);
	}
	public async PurchaseOrder_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.PurchaseOrder>(Entity.PurchaseOrder, options);
	}
	public async PurchaseOrder_delete(id: NumericId) {
		return this.delete<t.PurchaseOrder>(Entity.PurchaseOrder, id);
	}
	public async PurchaseOrder_create(data: t.CreatePurchaseOrderRequest) {
		return this.create<t.PurchaseOrder, t.CreatePurchaseOrderRequest>(Entity.PurchaseOrder, data);
	}
	public async PurchaseOrder_update(id: NumericId, data: t.CreatePurchaseOrderRequest) {
		return this.update<t.PurchaseOrder, t.CreatePurchaseOrderRequest>(Entity.PurchaseOrder, id, data);
	}
	public async PurchaseOrder_issue(id: NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.Issue, id);
	}
	public async PurchaseOrder_unIssue(id: NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.UnIssue, id);
	}
	public async PurchaseOrder_email(id: NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.Email, id);
	}

	public async PurchaseOrderLineItem_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.PurchaseOrderLineItem>(Entity.PurchaseOrderLineItems, id, options);
	}
	public async PurchaseOrderLineItem_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.PurchaseOrderLineItem>(Entity.PurchaseOrderLineItems, options);
	}

	public async SalesOrder_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.SalesOrder>(Entity.SalesOrder, id, options);
	}
	public async SalesOrder_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.SalesOrderCompact>(Entity.SalesOrder, options);
	}
	public async SalesOrder_delete(id: NumericId) {
		return this.delete<t.SalesOrder>(Entity.SalesOrder, id);
	}
	public async SalesOrder_create(data: t.CreateSalesOrderRequest) {
		return this.create<t.SalesOrder, t.CreateSalesOrderRequest>(Entity.SalesOrder, data);
	}
	public async SalesOrder_update(id: NumericId, data: t.CreateSalesOrderRequest) {
		return this.update<t.SalesOrder, t.CreateSalesOrderRequest>(Entity.SalesOrder, id, data);
	}
	public async SalesOrder_complete(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.Complete, id);
	}
	public async SalesOrder_unComplete(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.UnComplete, id);
	}
	public async SalesOrder_email(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.Email, id);
	}
	public async SalesOrder_issue(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.Issue, id);
	}
	public async SalesOrder_reject(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.Reject, id);
	}
	public async SalesOrder_void(id: NumericId) {
		return this.do(Entity.SalesOrder, Verb.Void, id);
	}
	public async SalesOrder_lines(id: NumericId, options?: SoftledgerGetRequest) {
		return this.getAllSubEntity<t.SalesOrderLineItem>(Entity.SalesOrder, Entity.LineItem, id, options);
	}

	public async SalesOrderLineItem_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.SalesOrderLineItem>(Entity.SalesOrderLineItems, options);
	}
	public async SalesOrderLineItem_delete(id: NumericId) {
		return this.delete<t.SalesOrderLineItem>(Entity.SalesOrderLineItems, id);
	}
	public async SalesOrderLineItem_update(id: NumericId, data: t.CreateSalesOrderLineRequest) {
		return this.update<t.SalesOrderLineItem, t.CreateSalesOrderLineRequest>(Entity.SalesOrderLineItem, id, data);
	}
	public async SalesOrderLineItem_fulfill(id: NumericId, data: t.FulFillLineRequest) {
		return this.doWithData<t.FulFillLineRequest>(Entity.SalesOrderLineItems, Verb.Fulfill, id, data);
	}
	public async SalesOrderLineItem_unfulfill(id: NumericId, data: t.UnFulFillLineRequest) {
		return this.doWithData<t.UnFulFillLineRequest>(Entity.SalesOrderLineItems, Verb.UnFulfill, id, data);
	}

	public async ShipmentReceipt_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.ShipmentReceipt>(Entity.ShipmentReceipt, id, options);
	}
	public async ShipmentReceipt_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.ShipmentReceipt>(Entity.ShipmentReceipt, options);
	}
	public async ShipmentReceiptLine_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.ShipmentReceiptLine>(Entity.ShipmentReceiptLine, options);
	}

	public async StockAdjustment_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.StockAdjustment>(Entity.StockAdjustment, id, options);
	}
	public async StockAdjustment_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.StockAdjustment>(Entity.StockAdjustment, options);
	}
	public async StockAdjustment_summary(options?: SoftledgerGetRequest) {
		return this.getAll<t.Stock>(Entity.StockAdjustmentSummary, options);
	}

	public async Template_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Template>(Entity.Template, id, options);
	}
	public async Template_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Template>(Entity.Template, options);
	}

	public async Vendor_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Vendor>(Entity.Vendor, id, options);
	}
	public async Vendor_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Vendor>(Entity.Vendor, options);
	}
	public async Vendor_delete(id: NumericId) {
		return this.delete<t.Vendor>(Entity.Vendor, id);
	}
	public async Vendor_create(data: t.CreateVendorRequest) {
		return this.create<t.Vendor, t.CreateVendorRequest>(Entity.Vendor, data);
	}
	public async Vendor_update(id: NumericId, data: t.CreateVendorRequest) {
		return this.update<t.Vendor, t.CreateVendorRequest>(Entity.Vendor, id, data);
	}

	public async Warehouse_get(id: NumericId, options?: SoftLedgerSDKOptions) {
		return this.getOne<t.Warehouse>(Entity.Warehouse, id, options);
	}
	public async Warehouse_find(options?: SoftledgerGetRequest) {
		return this.getAll<t.Warehouse>(Entity.Warehouse, options);
	}
	public async Warehouse_delete(id: NumericId) {
		return this.delete<t.Warehouse>(Entity.Warehouse, id);
	}
	public async Warehouse_create(data: t.CreateWarehouseRequest) {
		return this.create<t.Warehouse, t.CreateWarehouseRequest>(Entity.Warehouse, data);
	}
	public async Warehouse_update(id: NumericId, data: t.CreateWarehouseRequest) {
		return this.update<t.Warehouse, t.CreateWarehouseRequest>(Entity.Warehouse, id, data);
	}
}