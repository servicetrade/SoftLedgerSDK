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
import { LocationTreeResponse } from './types/locations/LocationTreeResponse';
import { SalesOrder } from './types/salesOrders/SalesOrder';
import { CreateSalesOrderRequest } from './types/salesOrders/CreateSalesOrderRequest';
import { FulFillLineRequest } from './types/salesOrders/FulFillLineRequest';
export declare class SoftLedgerAPI {
    private baseURL;
    private instance;
    private constructor();
    static build(grant_type?: string, tenantUUID?: string, audience?: string, client_id?: string, client_secret?: string, baseURL?: string): Promise<SoftLedgerAPI>;
    getAllAddresses(): Promise<ListResponse<Address>>;
    createAddress(payload: CreateAddressRequest): Promise<Address>;
    getOneAddress(id: number): Promise<Address>;
    updateAddress(id: number, payload: Address): Promise<Address>;
    deleteAddress(id: number): Promise<void>;
    getAllItems(): Promise<ListResponse<Item>>;
    createItem(payload: CreateItemRequest): Promise<Item>;
    getOneItem(id: number): Promise<Item>;
    updateItem(id: number, payload: CreateItemRequest): Promise<Item>;
    deleteItem(id: number): Promise<void>;
    getAlllJobs(): Promise<ListResponse<Job>>;
    createJob(payload: CreateJobRequest): Promise<Job>;
    getOneJob(id: number): Promise<Job>;
    updateJob(id: number, payload: CreateJobRequest): Promise<Job>;
    deleteJob(id: number): Promise<void>;
    getAllPurchaseOrders(): Promise<ListResponse<PurchaseOrder>>;
    createPurchaseOrder(payload: CreatePurchaseOrderRequest): Promise<PurchaseOrder>;
    getPOAllLineItems(): Promise<ListResponse<LineItem>>;
    getPOLineItems(id: number, payload: ReceiveLinePayload): Promise<ListResponse<LineItem>>;
    receiveLine(id: number): Promise<ReceiveLineResponse>;
    getOnePurchaseOrder(id: number): Promise<PurchaseOrder>;
    updatePurchaseOrder(id: number, payload: CreatePurchaseOrderRequest): Promise<PurchaseOrder>;
    issuePurchaseOrder(id: number): Promise<void>;
    emailPurchaseOrder(id: number): Promise<void>;
    unissuePurchaseOrder(id: number): Promise<void>;
    deletePurchaseOrder(id: number): Promise<void>;
    getAllWarehouses(): Promise<ListResponse<Warehouse>>;
    createWarehouse(payload: CreateWarehouseRequest): Promise<Warehouse>;
    getOneWarehouse(id: number): Promise<Warehouse>;
    updateWarehouse(id: number, payload: CreateWarehouseRequest): Promise<Warehouse>;
    deleteWarehouse(id: number): Promise<void>;
    getAllLocations(): Promise<ListResponse<Location>>;
    createLocationn(payload: CreateLocationRequest): Promise<Location>;
    distinctCurrencies(): Promise<string[]>;
    getLocationAccounts(id: number): Promise<ListResponse<LocationAccount>>;
    userLocationTree(): Promise<LocationTreeResponse>;
    getOneLocation(id: number): Promise<Location>;
    updateLocation(id: number, payload: CreateLocationRequest): Promise<Location>;
    deleteLocation(id: number): Promise<void>;
    locationDescendents(id: number): Promise<LocationTreeResponse[]>;
    getAllSalesOrders(): Promise<ListResponse<SalesOrder>>;
    createSalesOrder(payload: CreateSalesOrderRequest): Promise<SalesOrder>;
    getSOAllLineItems(): Promise<ListResponse<LineItem>>;
    fulfillLine(id: number, payload: FulFillLineRequest): Promise<void>;
    getOneSalesOrder(id: number): Promise<ListResponse<SalesOrder>>;
    updateSalesOrder(id: number, payload: CreateSalesOrderRequest): Promise<SalesOrder>;
    deleteSalesOrder(id: number): Promise<SalesOrder>;
    issueSalesOrder(id: number): Promise<SalesOrder>;
    emailSalesOrder(id: number): Promise<SalesOrder>;
    acceptSalesOrder(id: number): Promise<SalesOrder>;
    rejectSalesOrder(id: number): Promise<SalesOrder>;
}