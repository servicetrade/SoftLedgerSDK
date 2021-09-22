import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {CreateAddressRequest} from './types/addresses/CreateAddressRequest';
import {Address} from './types/addresses/Address';
import {Item} from './types/items/Item';
import {CreateItemRequest} from './types/items/CreateItemRequest';
import {ListResponse} from './types/ListResponse';
import {Job} from './types/jobs/Job';
import {CreateJobRequest} from './types/jobs/CreateJobRequest';
import {PurchaseOrder} from './types/purchaseOrders/PurchaseOrder';
import {CreatePurchaseOrderRequest} from './types/purchaseOrders/CreatePurchaseOrderRequest';
import {LineItem} from './types/purchaseOrders/LineItem';
import {ReceiveLinePayload} from './types/purchaseOrders/ReceiveLinePayload';
import {ReceiveLineResponse} from './types/purchaseOrders/ReceiveLineResponse';
import {Warehouse} from './types/warehouses/Warehouse';
import {CreateWarehouseRequest} from './types/warehouses/CreateWarehouseRequest';
import {CreateLocationRequest} from './types/locations/CreateLocationRequest';
import {LocationAccount} from './types/locations/LocationAccount';
import {LocationTreeResponse} from './types/locations/LocationTreeResponse';
import {SalesOrder} from './types/salesOrders/SalesOrder';
import {CreateSalesOrderRequest} from './types/salesOrders/CreateSalesOrderRequest';
import {FulFillLineRequest} from './types/salesOrders/FulFillLineRequest';

export const AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';

const GRAND_TYPE = 'client_credentials';
const TENANT_UUID = '300fccd3-dd05-4f68-b48b-df40adccd01c';
const AUDIENCE = 'https://sl-sb.softledger.com';
const CLIENT_ID = '6u6eM7jtGwArxYmMet767Rtq4oGuwYcu';
const CLIENT_SECRET = 'ctPIZfGxZeVgbMxS1qCXD7bzSakdFHt3meVADHI4RIgEZ5Is2KSOagDYm-9m-D-c';

const SANDBOX_URL = 'https://sb-api.softledger.com/api';
const BASE_URL = 'https://api.softledger.com/api';

// type Config = {
//     grant_type: string;
//     tenantUUID: string;
//     audience: string;
//     client_id: string;
//     client_secret: string;
//     baseURL: string;
// }

export type AUTH_Response = {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}

export class SoftLedgerAPI {
    private instance: AxiosInstance;

    private constructor(accessToken: string, private baseURL: string) {
        this.instance = axios.create({baseURL});
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instance.defaults.headers.common['Content-Type'] = 'application/json';
    }

    public static build(
        {
            grant_type = GRAND_TYPE,
            tenantUUID = TENANT_UUID,
            audience = AUDIENCE,
            client_id = CLIENT_ID,
            client_secret = CLIENT_SECRET,
            baseURL = SANDBOX_URL,
        }
    ) {
        return axios.post(AUTH_URL, {
            grant_type,
            tenantUUID,
            audience,
            client_id,
            client_secret,
        }).then((response: { data: AUTH_Response }) => {
            const {access_token} = response.data;

            return new SoftLedgerAPI(access_token, baseURL);
        })
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

    getAllItems(): Promise<AxiosResponse<ListResponse<Item>>> {
        return this.instance.get('/items');
    }

    createItem(payload: CreateItemRequest): Promise<AxiosResponse<Item>> {
        return this.instance.post('/items');
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
        return this.instance.post('/jobs');
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

    createPurchaseOrder(payload: CreatePurchaseOrderRequest): Promise<AxiosResponse<PurchaseOrder>> {
        return this.instance.post('/purchaseOrders');
    }

    getPOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>> {
        return this.instance.get('/purchaseOrders/lineItems');
    }

    getPOLineItems(id: number): Promise<AxiosResponse<LineItem[]>> {
        return this.instance.get(`/purchaseOrders/${id}/lineItems`);
    }

    receiveLine(id: number, payload: ReceiveLinePayload): Promise<AxiosResponse<ReceiveLineResponse>> {
        return this.instance.put(`purchaseOrders/lineItems/${id}/receive`, payload);
    }

    getOnePurchaseOrder(id: number): Promise<AxiosResponse<PurchaseOrder>> {
        return this.instance.get(`/purchaseOrders/${id}`);
    }

    updatePurchaseOrder(id: number, payload: CreatePurchaseOrderRequest): Promise<AxiosResponse<PurchaseOrder>> {
        return this.instance.put(`/purchaseOrders/${id}`, payload);
    }

    issuePurchaseOrder(id: number): Promise<AxiosResponse<{status: 'issued'}>> {
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

    updateWarehouse(id: number, payload: CreateWarehouseRequest): Promise<AxiosResponse<Warehouse>> {
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

    getOneSalesOrder(id: number): Promise<AxiosResponse<ListResponse<SalesOrder>>> {
        return this.instance.get(`/salesOrders/${id}`);
    }

    updateSalesOrder(id: number, payload: CreateSalesOrderRequest): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.put(`/salesOrders/${id}`, payload);
    }

    deleteSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.delete(`/salesOrders/${id}`);
    }

    issueSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.put(`/salesOrders/${id}/issueQuote`);
    }

    emailSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.put(`/salesOrders/${id}/email`);
    }

    acceptSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.put(`/salesOrders/${id}/acceptQuote`);
    }

    rejectSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>> {
        return this.instance.put(`/salesOrders/${id}/rejectQuote`);
    }
}
