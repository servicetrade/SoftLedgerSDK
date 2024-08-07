import * as t from '../types';
import { SoftLedgerAPIBase } from './SoftLedgerApiBase';
export declare class SoftLedgerAPI extends SoftLedgerAPIBase {
	Address_create(data: t.CreateAddressRequest): Promise<t.Address>;
	Address_delete(id: t.NumericId): Promise<void>;
	Address_find(options?: t.SoftledgerGetRequest<t.Address>): Promise<t.Address[]>;
	Address_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Address>;
	Address_update(id: t.NumericId, data: t.CreateAddressRequest): Promise<t.Address>;
	Audit_find(options?: t.SoftledgerGetRequest<t.AuditLog>): Promise<t.AuditLog[]>;
	Customer_create(data: t.CreateCustomerRequest): Promise<t.Customer>;
	Customer_delete(id: t.NumericId): Promise<void>;
	Customer_find(options?: t.SoftledgerGetRequest<t.Customer>): Promise<t.Customer[]>;
	Customer_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Customer>;
	Customer_update(id: t.NumericId, data: t.CreateCustomerRequest): Promise<t.Customer>;
	Inventory_runCostbasis(): Promise<void>;
	Item_create(data: t.CreateItemRequest): Promise<t.Item>;
	Item_delete(id: t.NumericId): Promise<void>;
	Item_find(options?: t.SoftledgerGetRequest<t.Item>): Promise<t.Item[]>;
	Item_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Item>;
	Item_stockSummary(id: t.NumericId): Promise<t.ItemStockSummary[]>;
	Item_update(id: t.NumericId, data: t.CreateItemRequest): Promise<t.Item>;
	Job_create(data: t.CreateJobRequest): Promise<t.Job>;
	Job_delete(id: t.NumericId): Promise<void>;
	Job_find(options?: t.SoftledgerGetRequest<t.Job>): Promise<t.Job[]>;
	Job_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Job>;
	Job_update(id: t.NumericId, data: t.CreateJobRequest): Promise<t.Job>;
	Location_create(data: t.CreateLocationRequest): Promise<t.Location>;
	Location_delete(id: t.NumericId): Promise<void>;
	Location_find(options?: t.SoftledgerGetRequest<t.Location>): Promise<t.Location[]>;
	Location_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Location>;
	Location_update(id: t.NumericId, data: t.CreateLocationRequest): Promise<t.Location>;
	PurchaseOrder_create(data: t.CreatePurchaseOrderRequest): Promise<t.PurchaseOrder>;
	PurchaseOrder_delete(id: t.NumericId): Promise<void>;
	PurchaseOrder_email(id: t.NumericId): Promise<void>;
	PurchaseOrder_externalId(id: t.NumericId, externalId: t.NumericId): Promise<void>;
	PurchaseOrder_find(options?: t.SoftledgerGetRequest<t.PurchaseOrder>): Promise<t.PurchaseOrder[]>;
	PurchaseOrder_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.PurchaseOrder>;
	PurchaseOrder_getLineItem(id: t.NumericId, options?: t.SoftledgerGetRequest<t.PurchaseOrderLineItem>): Promise<t.PurchaseOrderLineItem[]>;
	PurchaseOrder_issue(id: t.NumericId): Promise<void>;
	PurchaseOrder_unIssue(id: t.NumericId): Promise<void>;
	PurchaseOrder_update(id: t.NumericId, data: t.UpdatePurchaseOrderRequest): Promise<t.PurchaseOrder>;
	PurchaseOrder_void(id: t.NumericId): Promise<void>;
	PurchaseOrderLineItem_create(id: t.NumericId, data: t.CreatePurchaseOrderLineItemRequest): Promise<t.PurchaseOrderLineItem>;
	PurchaseOrderLineItem_delete(id: t.NumericId): Promise<void>;
	PurchaseOrderLineItem_find(options?: t.SoftledgerGetRequest<t.PurchaseOrderLineItem>): Promise<t.PurchaseOrderLineItem[]>;
	PurchaseOrderLineItem_update(id: t.NumericId, data: t.UpdatePurchaseOrderLineItemRequest): Promise<t.PurchaseOrderLineItem>;
	SalesOrder_complete(id: t.NumericId): Promise<void>;
	SalesOrder_create(data: t.CreateSalesOrderRequest): Promise<t.SalesOrder>;
	SalesOrder_delete(id: t.NumericId): Promise<void>;
	SalesOrder_email(id: t.NumericId): Promise<void>;
	SalesOrder_find(options?: t.SoftledgerGetRequest<t.SalesOrder>): Promise<t.SalesOrderCompact[]>;
	SalesOrder_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.SalesOrder>;
	SalesOrder_issue(id: t.NumericId): Promise<void>;
	SalesOrder_lines(id: t.NumericId, options?: t.SoftledgerGetRequest<t.SalesOrderLineItem>): Promise<t.SalesOrderLineItem[]>;
	SalesOrder_reject(id: t.NumericId): Promise<void>;
	SalesOrder_unComplete(id: t.NumericId): Promise<void>;
	SalesOrder_update(id: t.NumericId, data: t.UpdateSalesOrderRequest): Promise<t.SalesOrder>;
	SalesOrder_void(id: t.NumericId): Promise<void>;
	SalesOrderLineItem_create(id: t.NumericId, data: t.CreateSalesOrderLineRequest): Promise<t.SalesOrderLineItem>;
	SalesOrderLineItem_createSuppressWebhooks(id: t.NumericId, data: t.CreateSalesOrderLineRequest): Promise<t.SalesOrderLineItem>;
	SalesOrderLineItem_delete(id: t.NumericId): Promise<void>;
	SalesOrderLineItem_externalId(id: t.NumericId, externalId: t.NumericId): Promise<void>;
	SalesOrderLineItem_find(options?: t.SoftledgerGetRequest<t.SalesOrderLineItem>): Promise<t.SalesOrderLineItem[]>;
	SalesOrderLineItem_fulfill(id: t.NumericId, data: t.FulFillLineRequest): Promise<void>;
	SalesOrderLineItem_unfulfill(id: t.NumericId, data: t.UnFulFillLineRequest): Promise<void>;
	SalesOrderLineItem_update(id: t.NumericId, data: t.UpdateSalesOrderLineRequest): Promise<t.SalesOrderLineItem>;
	Settings_get(options?: t.SoftLedgerSDKOptions): Promise<t.Settings>;
	ShipmentReceipt_find(options?: t.SoftledgerGetRequest<t.ShipmentReceipt>): Promise<t.ShipmentReceipt[]>;
	ShipmentReceipt_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.ShipmentReceipt>;
	ShipmentReceiptLine_find(options?: t.SoftledgerGetRequest<t.ShipmentReceiptLine>): Promise<t.ShipmentReceiptLine[]>;
	Status_get(type: t.StatusType, options?: t.SoftLedgerSDKOptions): Promise<t.Status>;
	StockAdjustment_find(options?: t.SoftledgerGetRequest<t.StockAdjustment>): Promise<t.StockAdjustment[]>;
	StockAdjustment_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.StockAdjustment>;
	StockAdjustment_summary(options?: t.SoftledgerGetRequest<t.StockAdjustment>): Promise<t.Stock[]>;
	Template_find(options?: t.SoftledgerGetRequest<t.Template>): Promise<t.Template[]>;
	Template_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Template>;
	Transfer_create(options?: t.CreateTransferRequest): Promise<t.Transfer>;
	Vendor_create(data: t.CreateVendorRequest): Promise<t.Vendor>;
	Vendor_delete(id: t.NumericId): Promise<void>;
	Vendor_find(options?: t.SoftledgerGetRequest<t.Vendor>): Promise<t.Vendor[]>;
	Vendor_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Vendor>;
	Vendor_update(id: t.NumericId, data: t.UpdateVendorRequest): Promise<t.Vendor>;
	Warehouse_create(data: t.CreateWarehouseRequest): Promise<t.Warehouse>;
	Warehouse_delete(id: t.NumericId): Promise<void>;
	Warehouse_find(options?: t.SoftledgerGetRequest<t.Warehouse>): Promise<t.Warehouse[]>;
	Warehouse_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions): Promise<t.Warehouse>;
	Warehouse_update(id: t.NumericId, data: t.UpdateWarehouseRequest): Promise<t.Warehouse>;
}
