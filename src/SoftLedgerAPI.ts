import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateAddressRequest } from './types/addresses/CreateAddressRequest';
import { Address } from './types/addresses/Address';
import { Item } from './types/items/Item';
import { CreateItemRequest } from './types/items/CreateItemRequest';
import { ListResponse } from './types/ListResponse';
import { Job } from './types/jobs/Job';
import { CreateJobRequest } from './types/jobs/CreateJobRequest';
import { PurchaseOrder } from './types/purchaseOrders/PurchaseOrder';
import { CreatePurchaseOrderRequest } from './types/purchaseOrders/CreatePurchaseOrderRequest';
import { LineItem } from './types/purchaseOrders/LineItem';
import { ReceiveLinePayload } from './types/purchaseOrders/ReceiveLinePayload';
import { ReceiveLineResponse } from './types/purchaseOrders/ReceiveLineResponse';
import { Warehouse } from './types/warehouses/Warehouse';
import { CreateWarehouseRequest } from './types/warehouses/CreateWarehouseRequest';
import { CreateLocationRequest } from './types/locations/CreateLocationRequest';
import { Location } from './types/locations/Location';
import { LocationAccount } from './types/locations/LocationAccount';
import { SalesOrder } from './types/salesOrders/SalesOrder';
import { CreateSalesOrderRequest } from './types/salesOrders/CreateSalesOrderRequest';
import { FulFillLineRequest } from './types/salesOrders/FulFillLineRequest';
import { UnFulFillLineRequest } from './types/salesOrders/UnFulFillLineRequest';
import { Vendor } from './types/vendors/Vendor';
import { CreateVendorRequest } from './types/vendors/CreateVendorRequest';
import { CreateCustomFieldRequest } from './types/customFields/CreateCustomFieldRequest';
import { CustomField } from './types/customFields/CustomField';
import { CreateCustomerRequest } from './types/customers/CreateCustomerRequest';
import { Customer } from './types/customers/Customer';
import { UpdateCustomerRequest } from './types/customers/UpdateCustomerRequest';
import { Stock } from './types/stock/Stock';
import { StockAdjustment } from './types/stock/StockAdjustment';
import { TransferStockRequest } from './types/stock/TransferStockRequest';
import { UpdateSalesOrderRequest } from './types/salesOrders/UpdateSalesOrderRequest';
import { UpdatePurchaseOrderRequest } from './types/purchaseOrders/UpdatePurchaseOrderRequest';
import { ShipmentReceipt, ShipmentReceiptLine } from './types/shipmentReceipt/ShipmentReceipt';
import { ShipmentReceiptRequest } from './types/shipmentReceipt/ShipmentRecieptRequest';
import { Template } from './types/system/Template';
import { SetStartingDocumentNumberRequest } from './types/system/SetStartingDocumentNumberRequest';

export const AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';
export const DEFAULT_GET_LIMIT = 500;

const GRAND_TYPE = '';
const TENANT_UUID = '';
const AUDIENCE = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';

const BASE_URL = 'https://api.softledger.com/api';
const BASE_V2_URL = 'https://api.softledger.com/v2';

export type AUTH_Response = {
	access_token: string;
	scope: string;
	expires_in: number;
	token_type: string;
};

export class SoftLedgerAPI {
	public authData: any;

	public instance: AxiosInstance;
	public instanceV2: AxiosInstance;

	private constructor(
		accessToken: string,
		private baseURL: string,
		private baseV2URL: string,
		authData?: any
	) {
		this.authData = authData;
		this.instance = axios.create({ baseURL });
		this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		this.instance.defaults.headers.common['Content-Type'] = 'application/json';

		this.instanceV2 = axios.create({ baseURL: baseV2URL });
		this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		this.instanceV2.defaults.headers.common['Content-Type'] = 'application/json';
	}

	// The currect softledger API imposes (according to the API docs) a hard limit of 999 items returned in a request.
	// This function encapsulated pulling 'ALL' of something so that calling libraries do not need to handle multi-chunk
	// requests individually. The key thing to look for if Paging is being used in a endpoint here is if the return type
	// is ListResponse. ListResponse implies that softledger is paging the returned data.
	private _getAll(
		instance: AxiosInstance,
		url: string,
		params: object = {}
	): Promise<AxiosResponse<any>> {
		// Wrapper Promise -- loads an initial chunk and returns that promise immediately if it contains all of the data. If not
		// this promise will call additional chunks in sequences and append them to the initial promise's data. Returns the modified
		// initial promise when all chunks are loaded to make it appear that all data was returned in a single call to upstream applications.
		return new Promise((resolve, reject) => {
			let headerResp: AxiosResponse = null;
			let totalItems: Number = null;
			let currentItems: Number = 0;

			function _loadNextChunk(): Promise<any> {
				const mergedParams = { ...params, limit: DEFAULT_GET_LIMIT, offset: currentItems };
				return instance.get(url, { params: mergedParams }).then(_processChunk, reject);
			}

			function _processChunk(resp: AxiosResponse) {
				// This is the first chunk.
				if (headerResp === null) {
					headerResp = resp;
					totalItems = headerResp.data.totalItems;
				} else {
					headerResp.data.data.push(...resp.data.data);
				}

				currentItems = headerResp.data.data.length;

				if (currentItems > totalItems) {
					return reject('Unexpectedly received too much data');
				} else if (currentItems === totalItems) {
					return resolve(headerResp);
				} else if (resp.data.data.length < DEFAULT_GET_LIMIT) {
					return reject('Unexpectedly received too little data in chunk');
				} else {
					return _loadNextChunk();
				}
			}

			// Start loading chunks.
			return _loadNextChunk();
		});
	}

	public static build({
		grant_type = GRAND_TYPE,
		tenantUUID = TENANT_UUID,
		audience = AUDIENCE,
		client_id = CLIENT_ID,
		client_secret = CLIENT_SECRET,
		baseURL = BASE_URL,
		baseV2URL = BASE_V2_URL,
		authUrl = AUTH_URL,
		token = '',
	}) {
		if (token) {
			return new SoftLedgerAPI(token, baseURL, baseV2URL);
		}
		return axios
			.post(authUrl, {
				grant_type,
				tenantUUID,
				audience,
				client_id,
				client_secret,
			})
			.then((response: { data: AUTH_Response }) => {
				const { access_token } = response.data;

				return new SoftLedgerAPI(access_token, baseURL, baseV2URL, response.data);
			});
	}

	setToken(token: string) {
		this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	getAllAddresses(): Promise<AxiosResponse<ListResponse<Address>>> {
		return this._getAll(this.instance, `/addresses`);
	}

	createAddress(payload: CreateAddressRequest): Promise<AxiosResponse<Address>> {
		return this.instance.post('/addresses', payload);
	}

	getOneAddress(id: number): Promise<AxiosResponse<Address>> {
		return this.instance.get(`/addresses/${id}`);
	}

	updateAddress(id: number, payload: CreateAddressRequest): Promise<AxiosResponse<Address>> {
		return this.instance.put(`/addresses/${id}`, payload);
	}

	deleteAddress(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/addresses/${id}`);
	}

	getItemsByParams(params: object): Promise<AxiosResponse<ListResponse<Item>>> {
		return this._getAll(this.instance, '/items', params);
	}

	getAllItems(): Promise<AxiosResponse<ListResponse<Item>>> {
		return this._getAll(this.instance, '/items');
	}

	createItem(payload: CreateItemRequest): Promise<AxiosResponse<Item>> {
		return this.instance.post('/items', payload);
	}

	getOneItem(id: number): Promise<AxiosResponse<Item>> {
		return this.instance.get(`/items/${id}`);
	}

	updateItem(id: number, payload: CreateItemRequest): Promise<AxiosResponse<Item>> {
		return this.instance.put(`/items/${id}`, payload);
	}

	deleteItem(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/items/${id}`);
	}

	getAllJobs(): Promise<AxiosResponse<ListResponse<Job>>> {
		return this._getAll(this.instance, '/jobs');
	}

	createJob(payload: CreateJobRequest): Promise<AxiosResponse<Job>> {
		return this.instance.post('/jobs', payload);
	}

	getOneJob(id: number): Promise<AxiosResponse<Job>> {
		return this.instance.get(`/jobs/${id}`);
	}

	updateJob(id: number, payload: CreateJobRequest): Promise<AxiosResponse<Job>> {
		return this.instance.put(`/jobs/${id}`, payload);
	}

	deleteJob(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/jobs/${id}`);
	}

	getAllPurchaseOrders(params?: object): Promise<AxiosResponse<ListResponse<PurchaseOrder>>> {
		return this._getAll(this.instance, '/purchaseOrders', params);
	}

	createPurchaseOrder(
		payload: CreatePurchaseOrderRequest
	): Promise<AxiosResponse<PurchaseOrder>> {
		return this.instance.post('/purchaseOrders', payload);
	}

	getPurchaseOrderByParams(params?: object): Promise<AxiosResponse<ListResponse<PurchaseOrder>>> {
		return this._getAll(this.instance, '/purchaseOrders', params);
	}

	getPOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this._getAll(this.instance, '/purchaseOrders/lineItems');
	}

	getPOLineItemsByParams(params?: object): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this._getAll(this.instance, '/purchaseOrders/lineItems', params);
	}

	getPOLineItems(id: number): Promise<AxiosResponse<LineItem[]>> {
		return this.instance.get(`/purchaseOrders/${id}/lineItems`);
	}

	receiveLine(
		id: number,
		payload: ReceiveLinePayload
	): Promise<AxiosResponse<ReceiveLineResponse>> {
		return this.instance.put(`purchaseOrders/lineItems/${id}/receive`, payload);
	}

	getOnePurchaseOrder(id: number): Promise<AxiosResponse<PurchaseOrder>> {
		return this.instance.get(`/purchaseOrders/${id}`);
	}

	updatePurchaseOrder(
		id: number,
		payload: UpdatePurchaseOrderRequest
	): Promise<AxiosResponse<PurchaseOrder>> {
		return this.instance.put(`/purchaseOrders/${id}`, payload);
	}

	issuePurchaseOrder(id: number): Promise<AxiosResponse<{ status: 'issued' }>> {
		return this.instance.put(`/purchaseOrders/${id}/issue`);
	}

	emailPurchaseOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/purchaseOrders/${id}/email`);
	}

	unissuePurchaseOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/purchaseOrders/${id}/unissue`);
	}

	voidPurchaseOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/purchaseOrders/${id}/void`);
	}

	deletePurchaseOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/purchaseOrders/${id}`);
	}

	getAllWarehouses(): Promise<AxiosResponse<ListResponse<Warehouse>>> {
		return this._getAll(this.instance, '/warehouses');
	}

	createWarehouse(payload: CreateWarehouseRequest): Promise<AxiosResponse<Warehouse>> {
		return this.instance.post('/warehouses', payload);
	}

	getOneWarehouse(id: number): Promise<AxiosResponse<Warehouse>> {
		return this.instance.get(`/warehouses/${id}`);
	}

	updateWarehouse(
		id: number,
		payload: CreateWarehouseRequest
	): Promise<AxiosResponse<Warehouse>> {
		return this.instance.put(`/warehouses/${id}`);
	}

	deleteWarehouse(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/warehouses/${id}`);
	}

	getAllLocations(): Promise<AxiosResponse<ListResponse<Location>>> {
		return this._getAll(this.instance, '/locations');
	}

	createLocation(payload: CreateLocationRequest): Promise<AxiosResponse<Location>> {
		return this.instance.post('/locations', payload);
	}

	distinctCurrencies(): Promise<AxiosResponse<string[]>> {
		return this.instance.get('/locations/currencies');
	}

	getLocationAccounts(id: number): Promise<AxiosResponse<ListResponse<LocationAccount>>> {
		return this._getAll(this.instance, `/locations/${id}/accounts`);
	}

	userLocationTree(): Promise<AxiosResponse<Location>> {
		return this.instance.get('/locations/me');
	}

	getOneLocation(id: number): Promise<AxiosResponse<Location>> {
		return this.instance.get(`/locations/${id}`);
	}

	updateLocation(id: number, payload: CreateLocationRequest): Promise<AxiosResponse<Location>> {
		return this.instance.put(`/locations/${id}`, payload);
	}

	deleteLocation(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/locations/${id}`);
	}

	locationDescendents(id: number): Promise<AxiosResponse<Location[]>> {
		return this.instance.get(`/locations/${id}/descendents`);
	}

	getAllSalesOrders(params?: object): Promise<AxiosResponse<ListResponse<SalesOrder>>> {
		return this._getAll(this.instance, '/salesOrders', params);
	}

	getSalesOrderByParams(params?: object): Promise<AxiosResponse<ListResponse<SalesOrder>>> {
		return this._getAll(this.instance, '/salesOrders', params);
	}

	createSalesOrder(payload: CreateSalesOrderRequest): Promise<AxiosResponse<SalesOrder>> {
		return this.instance.post('/salesOrders', payload);
	}

	completeSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/complete`);
	}

	uncompleteSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/uncomplete`);
	}

	getSOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this._getAll(this.instance, '/salesOrders/lineItems');
	}

	getSOLineItemsByParams(params?: object): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this._getAll(this.instance, '/salesOrders/lineItems', params);
	}

	fulfillLine(id: number, payload: FulFillLineRequest): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/lineItems/${id}/fulfill`, payload);
	}

	unFulfillLine(id: number, payload: UnFulFillLineRequest): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/lineItems/${id}/unfulfill`, payload);
	}

	getOneSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
		return this.instance.get(`/salesOrders/${id}`);
	}

	updateSalesOrder(
		id: number,
		payload: UpdateSalesOrderRequest
	): Promise<AxiosResponse<SalesOrder>> {
		return this.instance.put(`/salesOrders/${id}`, payload);
	}

	deleteSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/salesOrders/${id}`);
	}

	issueSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/issueQuote`);
	}

	emailSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/email`);
	}

	acceptSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/acceptQuote`);
	}

	rejectSalesOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/${id}/rejectQuote`);
	}

	getVendor(id: number): Promise<AxiosResponse<Vendor>> {
		return this.instance.get(`/vendors/${id}`);
	}

	getAllVendors(): Promise<AxiosResponse<ListResponse<Vendor>>> {
		return this.instance.get('/vendors');
	}

	createVendor(payload: CreateVendorRequest): Promise<AxiosResponse<Vendor>> {
		return this.instance.post('/vendors', payload);
	}

	deleteVendor(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/vendors/${id}`);
	}

	getAllCustomers(): Promise<AxiosResponse<ListResponse<Location>>> {
		return this._getAll(this.instance, '/customers');
	}

	getCustomer(id: number): Promise<AxiosResponse<Customer>> {
		return this.instance.get(`/customers/${id}`);
	}

	createCustomer(payload: CreateCustomerRequest): Promise<AxiosResponse<Customer>> {
		return this.instance.post('/customers', payload);
	}

	updateCustomer(payload: UpdateCustomerRequest): Promise<AxiosResponse<Customer>> {
		return this.instance.put(`/customers/${payload._id}`, payload);
	}

	deleteCustomer(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/customers/${id}`);
	}

	getCustomFields(type: string): Promise<AxiosResponse<ListResponse<CustomField>>> {
		return this._getAll(this.instanceV2, `/custom-fields/${type}`);
	}

	createCustomField(
		type: string,
		payload: CreateCustomFieldRequest
	): Promise<AxiosResponse<CustomField>> {
		return this.instanceV2.post(`/custom-fields/${type}`, payload);
	}

	getStockSummary(params?: object): Promise<AxiosResponse<ListResponse<Stock>>> {
		return this._getAll(this.instance, '/stock/summary', params);
	}

	getStockAdjustments(params?: object): Promise<AxiosResponse<ListResponse<StockAdjustment>>> {
		return this._getAll(this.instance, '/stock', params);
	}

	transferStock(payload: TransferStockRequest): Promise<AxiosResponse<TransferStockRequest>> {
		return this.instance.post('/stock/transfer', payload);
	}

	getSettings(): Promise<AxiosResponse<any>> {
		return this.instance.get('/settings');
	}

	getShipmentReceipt(id: number): Promise<AxiosResponse<ShipmentReceipt>> {
		return this.instance.get(`/shipmentReceipts/${id}`);
	}

	getShipmentReceiptLineItems(id: number): Promise<AxiosResponse<ShipmentReceiptLine[]>> {
		return this.instance.get(`/shipmentReceipts/${id}/lineItems`);
	}

	getShipmentReceiptAllLineItems(params: object): Promise<AxiosResponse<ShipmentReceiptLine[]>> {
		return this._getAll(this.instance, `/shipmentReceipts/lineItems`, params);
	}

	createShipmentReceipt(
		payload: ShipmentReceiptRequest
	): Promise<AxiosResponse<ShipmentReceipt>> {
		return this.instance.post('/shipmentReceipts', payload);
	}

	getTemplates(params: object): Promise<AxiosResponse<ListResponse<Template>>> {
		return this._getAll(this.instance, '/system/templates', params);
	}

	setStartingDocumentNumber(
		payload: SetStartingDocumentNumberRequest
	): Promise<AxiosResponse<void>> {
		return this.instance.put('/settings/sequence', payload);
	}

	getStatusOfCostBasisCalculation(): Promise<AxiosResponse<any>> {
		return this.instanceV2.get('/status/inventory');
	}

	runCostBasis(): Promise<AxiosResponse<any>> {
		return this.instance.post('/stock/costbasis');
	}
}
