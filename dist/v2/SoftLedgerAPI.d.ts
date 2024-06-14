import { AxiosInstance } from 'axios';
import * as t from '../types';
export declare const DEFAULT_CHUNK_SIZE = 1000;
export declare type NumericId = number | string;
export interface SoftledgerConnectionCacheInterface {
	set: (authData: SoftledgerConnectionAuthResponse) => Promise<void>;
	get: () => Promise<string>;
}
export declare type SoftledgerConnectionAuthResponse = {
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
export declare type SoftledgerConnectionOptions = {
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
export declare type SoftledgerGetFilterType = 'all' | 'any';
export declare type SoftledgerOrder = Array<[string, 'ASC' | 'DESC']>;
export interface SoftledgerGetRequestBase {
	filter?: {
		[k: string]: any;
	};
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
export declare type SoftLedgerSDKOptions = {
	ifExists: boolean;
};
export declare class SoftLedgerAPI {
	private options;
	private logger;
	private cache;
	private instance;
	constructor(options: SoftledgerConnectionOptions);
	private getNewAuth;
	private buildInstance;
	private getToken;
	private setAuth;
	private logResponse;
	private logError;
	private query;
	private getOne;
	private _getAll;
	private getAll;
	private getAllSubEntity;
	private delete;
	private create;
	private update;
	private do;
	private doWithData;
	private static formatSearchOptions;
	getInstance(): Promise<AxiosInstance>;
	Address_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Address>;
	Address_find(options?: SoftledgerGetRequest): Promise<t.Address[]>;
	Address_delete(id: NumericId): Promise<void>;
	Address_create(data: t.CreateAddressRequest): Promise<t.Address>;
	Address_update(id: NumericId, data: t.CreateAddressRequest): Promise<t.Address>;
	Customer_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Customer>;
	Customer_find(options?: SoftledgerGetRequest): Promise<t.Customer[]>;
	Customer_delete(id: NumericId): Promise<void>;
	Customer_create(data: t.CreateCustomerRequest): Promise<t.Customer>;
	Customer_update(id: NumericId, data: t.CreateCustomerRequest): Promise<t.Customer>;
	Item_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Item>;
	Item_find(options?: SoftledgerGetRequest): Promise<t.Item[]>;
	Item_delete(id: NumericId): Promise<void>;
	Item_create(data: t.CreateItemRequest): Promise<t.Item>;
	Item_update(id: NumericId, data: t.CreateItemRequest): Promise<t.Item>;
	Item_stockSummary(id: NumericId): Promise<t.ItemStockSummary[]>;
	Job_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Job>;
	Job_find(options?: SoftledgerGetRequest): Promise<t.Job[]>;
	Job_delete(id: NumericId): Promise<void>;
	Job_create(data: t.CreateJobRequest): Promise<t.Job>;
	Job_update(id: NumericId, data: t.CreateJobRequest): Promise<t.Job>;
	Location_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Location>;
	Location_find(options?: SoftledgerGetRequest): Promise<t.Location[]>;
	Location_delete(id: NumericId): Promise<void>;
	Location_create(data: t.CreateLocationRequest): Promise<t.Location>;
	Location_update(id: NumericId, data: t.CreateLocationRequest): Promise<t.Location>;
	PurchaseOrder_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.PurchaseOrder>;
	PurchaseOrder_getLineItem(id: NumericId, options?: SoftledgerGetRequest): Promise<t.PurchaseOrderLineItem[]>;
	PurchaseOrder_find(options?: SoftledgerGetRequest): Promise<t.PurchaseOrder[]>;
	PurchaseOrder_delete(id: NumericId): Promise<void>;
	PurchaseOrder_create(data: t.CreatePurchaseOrderRequest): Promise<t.PurchaseOrder>;
	PurchaseOrder_update(id: NumericId, data: t.CreatePurchaseOrderRequest): Promise<t.PurchaseOrder>;
	PurchaseOrder_issue(id: NumericId): Promise<void>;
	PurchaseOrder_unIssue(id: NumericId): Promise<void>;
	PurchaseOrder_email(id: NumericId): Promise<void>;
	PurchaseOrderLineItem_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.PurchaseOrderLineItem>;
	PurchaseOrderLineItem_find(options?: SoftledgerGetRequest): Promise<t.PurchaseOrderLineItem[]>;
	SalesOrder_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.SalesOrder>;
	SalesOrder_find(options?: SoftledgerGetRequest): Promise<t.SalesOrderCompact[]>;
	SalesOrder_delete(id: NumericId): Promise<void>;
	SalesOrder_create(data: t.CreateSalesOrderRequest): Promise<t.SalesOrder>;
	SalesOrder_update(id: NumericId, data: t.CreateSalesOrderRequest): Promise<t.SalesOrder>;
	SalesOrder_complete(id: NumericId): Promise<void>;
	SalesOrder_unComplete(id: NumericId): Promise<void>;
	SalesOrder_email(id: NumericId): Promise<void>;
	SalesOrder_issue(id: NumericId): Promise<void>;
	SalesOrder_reject(id: NumericId): Promise<void>;
	SalesOrder_void(id: NumericId): Promise<void>;
	SalesOrder_lines(id: NumericId, options?: SoftledgerGetRequest): Promise<t.SalesOrderLineItem[]>;
	SalesOrderLineItem_find(options?: SoftledgerGetRequest): Promise<t.SalesOrderLineItem[]>;
	SalesOrderLineItem_delete(id: NumericId): Promise<void>;
	SalesOrderLineItem_update(id: NumericId, data: t.CreateSalesOrderLineRequest): Promise<t.SalesOrderLineItem>;
	SalesOrderLineItem_fulfill(id: NumericId, data: t.FulFillLineRequest): Promise<void>;
	SalesOrderLineItem_unfulfill(id: NumericId, data: t.UnFulFillLineRequest): Promise<void>;
	ShipmentReceipt_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.ShipmentReceipt>;
	ShipmentReceipt_find(options?: SoftledgerGetRequest): Promise<t.ShipmentReceipt[]>;
	ShipmentReceiptLine_find(options?: SoftledgerGetRequest): Promise<t.ShipmentReceiptLine[]>;
	StockAdjustment_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.StockAdjustment>;
	StockAdjustment_find(options?: SoftledgerGetRequest): Promise<t.StockAdjustment[]>;
	StockAdjustment_summary(options?: SoftledgerGetRequest): Promise<t.Stock[]>;
	Transfer_create(options?: t.CreateTransferRequest): Promise<t.Transfer>;
	Template_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Template>;
	Template_find(options?: SoftledgerGetRequest): Promise<t.Template[]>;
	Vendor_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Vendor>;
	Vendor_find(options?: SoftledgerGetRequest): Promise<t.Vendor[]>;
	Vendor_delete(id: NumericId): Promise<void>;
	Vendor_create(data: t.CreateVendorRequest): Promise<t.Vendor>;
	Vendor_update(id: NumericId, data: t.CreateVendorRequest): Promise<t.Vendor>;
	Warehouse_get(id: NumericId, options?: SoftLedgerSDKOptions): Promise<t.Warehouse>;
	Warehouse_find(options?: SoftledgerGetRequest): Promise<t.Warehouse[]>;
	Warehouse_delete(id: NumericId): Promise<void>;
	Warehouse_create(data: t.CreateWarehouseRequest): Promise<t.Warehouse>;
	Warehouse_update(id: NumericId, data: t.CreateWarehouseRequest): Promise<t.Warehouse>;
}
