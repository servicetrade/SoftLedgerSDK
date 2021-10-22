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
import { LocationAccount } from './types/locations/LocationAccount';
import { SalesOrder } from './types/salesOrders/SalesOrder';
import { CreateSalesOrderRequest } from './types/salesOrders/CreateSalesOrderRequest';
import { FulFillLineRequest } from './types/salesOrders/FulFillLineRequest';
import { Vendor } from './types/vendors/Vendor';
import { CreateVendorRequest } from './types/vendors/CreateVendorRequest';
import { CreateCustomFieldRequest } from './types/customFields/CreateCustomFieldRequest';
import { CustomField } from './types/customFields/CustomField';
import { CreateCustomerRequest } from './types/customers/CreateCustomerRequest';
import { Customer } from './types/customers/Customer';
import { UpdateCustomerRequest } from './types/customers/UpdateCustomerRequest';
import { Stock } from './types/stock/Stock';
import {TransferStockRequest} from "./types/stock/TransferStockRequest";

export const AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';

const GRAND_TYPE = 'client_credentials';
const TENANT_UUID = '300fccd3-dd05-4f68-b48b-df40adccd01c';
const AUDIENCE = 'https://sl-sb.softledger.com';
const CLIENT_ID = '6u6eM7jtGwArxYmMet767Rtq4oGuwYcu';
const CLIENT_SECRET = 'ctPIZfGxZeVgbMxS1qCXD7bzSakdFHt3meVADHI4RIgEZ5Is2KSOagDYm-9m-D-c';

const SANDBOX_URL = 'https://sb-api.softledger.com/api';
const SANDBOX_V2_URL = 'https://sb-api.softledger.com/v2';

const BASE_URL = 'https://api.softledger.com/api';
const BASE_V2_URL = 'https://api.softledger.com/v2';

export type AUTH_Response = {
	access_token: string;
	scope: string;
	expires_in: number;
	token_type: string;
};

export class SoftLedgerAPI {
	private instance: AxiosInstance;
	private instanceV2: AxiosInstance;

	private constructor(accessToken: string, private baseURL: string, private baseV2URL: string) {
		this.instance = axios.create({ baseURL });
		this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		this.instance.defaults.headers.common['Content-Type'] = 'application/json';

		this.instanceV2 = axios.create({ baseURL: baseV2URL });
		this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		this.instanceV2.defaults.headers.common['Content-Type'] = 'application/json';
	}

	public static build({
		grant_type = GRAND_TYPE,
		tenantUUID = TENANT_UUID,
		audience = AUDIENCE,
		client_id = CLIENT_ID,
		client_secret = CLIENT_SECRET,
		baseURL = BASE_URL,
		baseV2URL = BASE_V2_URL,
	}) {
		return axios
			.post(AUTH_URL, {
				grant_type,
				tenantUUID,
				audience,
				client_id,
				client_secret,
			})
			.then((response: { data: AUTH_Response }) => {
				const { access_token } = response.data;

				return new SoftLedgerAPI(access_token, baseURL, baseV2URL);
			});
	}

	getAllAddresses(): Promise<AxiosResponse<ListResponse<Address>>> {
		return this.instance.get(`/addresses`);
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
		return this.instance.get(`/items?where=${JSON.stringify(params)}`);
	}

	getAllItems(): Promise<AxiosResponse<ListResponse<Item>>> {
		return this.instance.get('/items');
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
		return this.instance.get('/jobs');
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

	getAllPurchaseOrders(): Promise<AxiosResponse<ListResponse<PurchaseOrder>>> {
		return this.instance.get('/purchaseOrders');
	}

	createPurchaseOrder(
		payload: CreatePurchaseOrderRequest
	): Promise<AxiosResponse<PurchaseOrder>> {
		return this.instance.post('/purchaseOrders', payload);
	}

	getPOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this.instance.get('/purchaseOrders/lineItems');
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
		payload: CreatePurchaseOrderRequest
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

	deletePurchaseOrder(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/purchaseOrders/${id}`);
	}

	getAllWarehouses(): Promise<AxiosResponse<ListResponse<Warehouse>>> {
		return this.instance.get('/warehouses');
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
		return this.instance.get('/locations');
	}

	createLocation(payload: CreateLocationRequest): Promise<AxiosResponse<Location>> {
		return this.instance.post('/locations', payload);
	}

	distinctCurrencies(): Promise<AxiosResponse<string[]>> {
		return this.instance.get('/locations/currencies');
	}

	getLocationAccounts(id: number): Promise<AxiosResponse<ListResponse<LocationAccount>>> {
		return this.instance.get(`/locations/${id}/accounts`);
	}

	userLocationTree(): Promise<AxiosResponse<Location>> {
		return this.instance.get('/locations/me');
	}

	getOneLocation(id: number): Promise<AxiosResponse<Location>> {
		return this.instance.get(`/locations/${id}`);
	}

	updateLocation(id: number, payload: CreateLocationRequest): Promise<AxiosResponse<Location>> {
		return this.instance.put(`/locations/${id}`);
	}

	deleteLocation(id: number): Promise<AxiosResponse<void>> {
		return this.instance.delete(`/locations/${id}`);
	}

	locationDescendents(id: number): Promise<AxiosResponse<Location[]>> {
		return this.instance.get(`/locations/${id}/descendents`);
	}

	getAllSalesOrders(): Promise<AxiosResponse<ListResponse<SalesOrder>>> {
		return this.instance.get('/salesOrders');
	}

	createSalesOrder(payload: CreateSalesOrderRequest): Promise<AxiosResponse<SalesOrder>> {
		return this.instance.post('/salesOrders', payload);
	}

	getSOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>> {
		return this.instance.get('/salesOrders/lineItems');
	}

	fulfillLine(id: number, payload: FulFillLineRequest): Promise<AxiosResponse<void>> {
		return this.instance.put(`/salesOrders/lineItems/${id}/fulfill`, payload);
	}

	getOneSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
		return this.instance.get(`/salesOrders/${id}`);
	}

	updateSalesOrder(
		id: number,
		payload: CreateSalesOrderRequest
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

	getAllVendors(): Promise<AxiosResponse<ListResponse<Vendor>>> {
		return this.instance.get('/vendors');
	}

	createVendor(payload: CreateVendorRequest): Promise<AxiosResponse<Vendor>> {
		return this.instance.post('/vendors', payload);
	}

	getAllCustomers(): Promise<AxiosResponse<ListResponse<Location>>> {
		return this.instance.get('/customers');
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
		return this.instanceV2.get(`/custom-fields/${type}`);
	}

	createCustomField(
		type: string,
		payload: CreateCustomFieldRequest
	): Promise<AxiosResponse<CustomField>> {
		return this.instanceV2.post(`/custom-fields/${type}`, payload);
	}
	
	getStockSummary(): Promise<AxiosResponse<ListResponse<Stock>>> {
		return this.instance.get('/stock/summary');
	}

	transferStock(payload: TransferStockRequest): Promise<TransferStockRequest> {
		return this.instance.post('/stock/transfer', payload);
	}
}
