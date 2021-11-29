import { AxiosResponse } from 'axios';
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
import { TransferStockRequest } from './types/stock/TransferStockRequest';
export declare const AUTH_URL = "https://auth.accounting-auth.com/oauth/token";
export declare type AUTH_Response = {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
};
export declare class SoftLedgerAPI {
    private baseURL;
    private baseV2URL;
    private instance;
    private instanceV2;
    private constructor();
    static build({ grant_type, tenantUUID, audience, client_id, client_secret, baseURL, baseV2URL, authUrl, }: {
        grant_type?: string;
        tenantUUID?: string;
        audience?: string;
        client_id?: string;
        client_secret?: string;
        baseURL?: string;
        baseV2URL?: string;
        authUrl?: string;
    }): Promise<SoftLedgerAPI>;
    getAllAddresses(): Promise<AxiosResponse<ListResponse<Address>>>;
    createAddress(payload: CreateAddressRequest): Promise<AxiosResponse<Address>>;
    getOneAddress(id: number): Promise<AxiosResponse<Address>>;
    updateAddress(id: number, payload: CreateAddressRequest): Promise<AxiosResponse<Address>>;
    deleteAddress(id: number): Promise<AxiosResponse<void>>;
    getItemsByParams(params: object): Promise<AxiosResponse<ListResponse<Item>>>;
    getAllItems(): Promise<AxiosResponse<ListResponse<Item>>>;
    createItem(payload: CreateItemRequest): Promise<AxiosResponse<Item>>;
    getOneItem(id: number): Promise<AxiosResponse<Item>>;
    updateItem(id: number, payload: CreateItemRequest): Promise<AxiosResponse<Item>>;
    deleteItem(id: number): Promise<AxiosResponse<void>>;
    getAllJobs(): Promise<AxiosResponse<ListResponse<Job>>>;
    createJob(payload: CreateJobRequest): Promise<AxiosResponse<Job>>;
    getOneJob(id: number): Promise<AxiosResponse<Job>>;
    updateJob(id: number, payload: CreateJobRequest): Promise<AxiosResponse<Job>>;
    deleteJob(id: number): Promise<AxiosResponse<void>>;
    getAllPurchaseOrders(params?: string): Promise<AxiosResponse<ListResponse<PurchaseOrder>>>;
    getPurchaseOrderByParams(params: object): Promise<AxiosResponse<ListResponse<PurchaseOrder>>>;
    createPurchaseOrder(payload: CreatePurchaseOrderRequest): Promise<AxiosResponse<PurchaseOrder>>;
    getPOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>>;
    getPOLineItems(id: number): Promise<AxiosResponse<LineItem[]>>;
    receiveLine(id: number, payload: ReceiveLinePayload): Promise<AxiosResponse<ReceiveLineResponse>>;
    getOnePurchaseOrder(id: number): Promise<AxiosResponse<PurchaseOrder>>;
    updatePurchaseOrder(id: number, payload: CreatePurchaseOrderRequest): Promise<AxiosResponse<PurchaseOrder>>;
    issuePurchaseOrder(id: number): Promise<AxiosResponse<{
        status: 'issued';
    }>>;
    emailPurchaseOrder(id: number): Promise<AxiosResponse<void>>;
    unissuePurchaseOrder(id: number): Promise<AxiosResponse<void>>;
    deletePurchaseOrder(id: number): Promise<AxiosResponse<void>>;
    getAllWarehouses(): Promise<AxiosResponse<ListResponse<Warehouse>>>;
    createWarehouse(payload: CreateWarehouseRequest): Promise<AxiosResponse<Warehouse>>;
    getOneWarehouse(id: number): Promise<AxiosResponse<Warehouse>>;
    updateWarehouse(id: number, payload: CreateWarehouseRequest): Promise<AxiosResponse<Warehouse>>;
    deleteWarehouse(id: number): Promise<AxiosResponse<void>>;
    getAllLocations(): Promise<AxiosResponse<ListResponse<Location>>>;
    createLocation(payload: CreateLocationRequest): Promise<AxiosResponse<Location>>;
    distinctCurrencies(): Promise<AxiosResponse<string[]>>;
    getLocationAccounts(id: number): Promise<AxiosResponse<ListResponse<LocationAccount>>>;
    userLocationTree(): Promise<AxiosResponse<Location>>;
    getOneLocation(id: number): Promise<AxiosResponse<Location>>;
    updateLocation(id: number, payload: CreateLocationRequest): Promise<AxiosResponse<Location>>;
    deleteLocation(id: number): Promise<AxiosResponse<void>>;
    locationDescendents(id: number): Promise<AxiosResponse<Location[]>>;
    getAllSalesOrders(params?: string): Promise<AxiosResponse<ListResponse<SalesOrder>>>;
    getSalesOrderByParams(params: object): Promise<AxiosResponse<ListResponse<SalesOrder>>>;
    createSalesOrder(payload: CreateSalesOrderRequest): Promise<AxiosResponse<SalesOrder>>;
    getSOAllLineItems(): Promise<AxiosResponse<ListResponse<LineItem>>>;
    fulfillLine(id: number, payload: FulFillLineRequest): Promise<AxiosResponse<void>>;
    getOneSalesOrder(id: number): Promise<AxiosResponse<SalesOrder>>;
    updateSalesOrder(id: number, payload: CreateSalesOrderRequest): Promise<AxiosResponse<SalesOrder>>;
    deleteSalesOrder(id: number): Promise<AxiosResponse<void>>;
    issueSalesOrder(id: number): Promise<AxiosResponse<void>>;
    emailSalesOrder(id: number): Promise<AxiosResponse<void>>;
    acceptSalesOrder(id: number): Promise<AxiosResponse<void>>;
    rejectSalesOrder(id: number): Promise<AxiosResponse<void>>;
    getAllVendors(): Promise<AxiosResponse<ListResponse<Vendor>>>;
    createVendor(payload: CreateVendorRequest): Promise<AxiosResponse<Vendor>>;
    deleteVendor(id: number): Promise<AxiosResponse<void>>;
    getAllCustomers(): Promise<AxiosResponse<ListResponse<Location>>>;
    getCustomer(id: number): Promise<AxiosResponse<Customer>>;
    createCustomer(payload: CreateCustomerRequest): Promise<AxiosResponse<Customer>>;
    updateCustomer(payload: UpdateCustomerRequest): Promise<AxiosResponse<Customer>>;
    deleteCustomer(id: number): Promise<AxiosResponse<void>>;
    getCustomFields(type: string): Promise<AxiosResponse<ListResponse<CustomField>>>;
    createCustomField(type: string, payload: CreateCustomFieldRequest): Promise<AxiosResponse<CustomField>>;
    getStockSummary(): Promise<AxiosResponse<ListResponse<Stock>>>;
    transferStock(payload: TransferStockRequest): Promise<TransferStockRequest>;
    getSettings(): Promise<AxiosResponse<any>>;
}
