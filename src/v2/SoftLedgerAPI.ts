import * as t from '../types';
import * as _ from 'lodash';
import { SoftLedgerAPIBase } from './SoftLedgerApiBase';
import { Entity, Verb } from './types';

// Split the api calls of the SDK out here so that to implementing class is just a list of the
// endpoints that are implemented and the base class is the logic.
export class SoftLedgerAPI extends SoftLedgerAPIBase {
	public async Address_create(data: t.CreateAddressRequest) {
		return this.create<t.Address, t.CreateAddressRequest>(Entity.Address, data);
	}
	public async Address_delete(id: t.NumericId) {
		return this.delete<t.Address>(Entity.Address, id);
	}
	public async Address_find(options?: t.SoftledgerGetRequest<t.Address>) {
		return this.getAll<t.Address>(Entity.Address, options);
	}
	public async Address_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Address>(Entity.Address, id, options);
	}
	public async Address_update(id: t.NumericId, data: t.CreateAddressRequest) {
		return this.update<t.Address, t.CreateAddressRequest>(Entity.Address, id, data);
	}

	public async Audit_find(options?: t.SoftledgerGetRequest<t.AuditLog>) {
		return this.getAll<t.AuditLog>(Entity.AuditLogs, options);
	}

	public async Customer_create(data: t.CreateCustomerRequest) {
		return this.create<t.Customer, t.CreateCustomerRequest>(Entity.Customer, data);
	}
	public async Customer_delete(id: t.NumericId) {
		return this.delete<t.Customer>(Entity.Customer, id);
	}
	public async Customer_find(options?: t.SoftledgerGetRequest<t.Customer>) {
		return this.getAll<t.Customer>(Entity.Customer, options);
	}
	public async Customer_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Customer>(Entity.Customer, id, options);
	}
	public async Customer_update(id: t.NumericId, data: t.CreateCustomerRequest) {
		return this.update<t.Customer, t.CreateCustomerRequest>(Entity.Customer, id, data);
	}

	public async Inventory_runCostbasis() {
		return this.create<void, {}>(Entity.InventoryCostbasis, {});
	}

	public async Item_create(data: t.CreateItemRequest) {
		return this.create<t.Item, t.CreateItemRequest>(Entity.Item, data);
	}
	public async Item_delete(id: t.NumericId) {
		return this.delete<t.Item>(Entity.Item, id);
	}
	public async Item_find(options?: t.SoftledgerGetRequest<t.Item>) {
		return this.getAll<t.Item>(Entity.Item, options);
	}
	public async Item_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Item>(Entity.Item, id, options);
	}
	public async Item_stockSummary(id: t.NumericId) {
		// Note: 'getAll' in this API implies iterating through data pages. ItemSummary returns an unpaged list, so we use getOne,
		//       though the one thing it gets is a list of summary items.
		return this.getOneSubEntity<t.ItemStockSummary[]>(Entity.Item, Entity.StockSummary, id);
	}
	public async Item_update(id: t.NumericId, data: t.CreateItemRequest) {
		return this.update<t.Item, t.CreateItemRequest>(Entity.Item, id, data);
	}

	public async Job_create(data: t.CreateJobRequest) {
		return this.create<t.Job, t.CreateJobRequest>(Entity.Job, data);
	}
	public async Job_delete(id: t.NumericId) {
		return this.delete<t.Job>(Entity.Job, id);
	}
	public async Job_find(options?: t.SoftledgerGetRequest<t.Job>) {
		return this.getAll<t.Job>(Entity.Job, options);
	}
	public async Job_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Job>(Entity.Job, id, options);
	}
	public async Job_update(id: t.NumericId, data: t.CreateJobRequest) {
		return this.update<t.Job, t.CreateJobRequest>(Entity.Job, id, data);
	}

	public async Location_create(data: t.CreateLocationRequest) {
		return this.create<t.Location, t.CreateLocationRequest>(Entity.Location, data);
	}
	public async Location_delete(id: t.NumericId) {
		return this.delete<t.Location>(Entity.Location, id);
	}
	public async Location_find(options?: t.SoftledgerGetRequest<t.Location>) {
		return this.getAll<t.Location>(Entity.Location, options);
	}
	public async Location_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Location>(Entity.Location, id, options);
	}
	public async Location_update(id: t.NumericId, data: t.CreateLocationRequest) {
		return this.update<t.Location, t.CreateLocationRequest>(Entity.Location, id, data);
	}

	public async PurchaseOrder_create(data: t.CreatePurchaseOrderRequest) {
		return this.create<t.PurchaseOrder, t.CreatePurchaseOrderRequest>(Entity.PurchaseOrder, data);
	}
	public async PurchaseOrder_delete(id: t.NumericId) {
		return this.delete<t.PurchaseOrder>(Entity.PurchaseOrder, id);
	}
	public async PurchaseOrder_email(id: t.NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.Email, id);
	}
	public async PurchaseOrder_externalId(id: t.NumericId, externalId: t.NumericId) {
		return this.doWithId(Entity.PurchaseOrder, Verb.ExternalId, id, String(externalId));
	}
	public async PurchaseOrder_find(options?: t.SoftledgerGetRequest<t.PurchaseOrder>) {
		return this.getAll<t.PurchaseOrder>(Entity.PurchaseOrder, options);
	}
	public async PurchaseOrder_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.PurchaseOrder>(Entity.PurchaseOrder, id, options);
	}
	public async PurchaseOrder_getLineItem(id: t.NumericId, options?: t.SoftledgerGetRequest<t.PurchaseOrderLineItem>) {
		return this.getAllSubEntity<t.PurchaseOrderLineItem>(Entity.PurchaseOrder, Entity.LineItem, id, options);
	}
	public async PurchaseOrder_issue(id: t.NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.Issue, id);
	}
	public async PurchaseOrder_unIssue(id: t.NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.UnIssue, id);
	}
	public async PurchaseOrder_update(id: t.NumericId, data: t.UpdatePurchaseOrderRequest) {
		return this.update<t.PurchaseOrder, t.UpdatePurchaseOrderRequest>(Entity.PurchaseOrder, id, data);
	}
	public async PurchaseOrder_void(id: t.NumericId) {
		return this.do(Entity.PurchaseOrder, Verb.Void, id);
	}

	public async PurchaseOrderLineItem_create(id: t.NumericId, data: t.CreatePurchaseOrderLineItemRequest) {
		return this.createSubEntity<t.PurchaseOrderLineItem, t.CreatePurchaseOrderLineItemRequest>(Entity.PurchaseOrder, Verb.Line, id, data);
	}
	public async PurchaseOrderLineItem_delete(id: t.NumericId) {
		return this.delete<t.PurchaseOrderLineItem>(Entity.PurchaseOrderLineItem, id);
	}
	public async PurchaseOrderLineItem_find(options?: t.SoftledgerGetRequest<t.PurchaseOrderLineItem>) {
		return this.getAll<t.PurchaseOrderLineItem>(Entity.PurchaseOrderLineItems, options);
	}
	public async PurchaseOrderLineItem_update(id: t.NumericId, data: t.UpdatePurchaseOrderLineItemRequest) {
		return this.update<t.PurchaseOrderLineItem, t.UpdatePurchaseOrderLineItemRequest>(Entity.PurchaseOrderLineItem, id, data);
	}

	public async SalesOrder_complete(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.Complete, id);
	}
	public async SalesOrder_create(data: t.CreateSalesOrderRequest) {
		return this.create<t.SalesOrder, t.CreateSalesOrderRequest>(Entity.SalesOrder, data);
	}
	public async SalesOrder_delete(id: t.NumericId) {
		return this.delete<t.SalesOrder>(Entity.SalesOrder, id);
	}
	public async SalesOrder_email(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.Email, id);
	}
	public async SalesOrder_find(options?: t.SoftledgerGetRequest<t.SalesOrder>) {
		return this.getAll<t.SalesOrderCompact>(Entity.SalesOrder, options);
	}
	public async SalesOrder_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.SalesOrder>(Entity.SalesOrder, id, options);
	}
	public async SalesOrder_issue(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.Issue, id);
	}
	public async SalesOrder_lines(id: t.NumericId, options?: t.SoftledgerGetRequest<t.SalesOrderLineItem>) {
		return this.getAllSubEntity<t.SalesOrderLineItem>(Entity.SalesOrder, Entity.LineItem, id, options);
	}
	public async SalesOrder_reject(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.Reject, id);
	}
	public async SalesOrder_unComplete(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.UnComplete, id);
	}
	public async SalesOrder_update(id: t.NumericId, data: t.UpdateSalesOrderRequest) {
		return this.update<t.SalesOrder, t.UpdateSalesOrderRequest>(Entity.SalesOrder, id, data);
	}
	public async SalesOrder_void(id: t.NumericId) {
		return this.do(Entity.SalesOrder, Verb.Void, id);
	}

	public async SalesOrderLineItem_create(id: t.NumericId, data: t.CreateSalesOrderLineRequest) {
		return this.createSubEntity<t.SalesOrderLineItem, t.CreateSalesOrderLineRequest>(Entity.SalesOrder, Verb.Line, id, data);
	}
	public async SalesOrderLineItem_createSuppressWebhooks(id: t.NumericId, data: t.CreateSalesOrderLineRequest) {
		return this.createSubEntity<t.SalesOrderLineItem, t.CreateSalesOrderLineRequest>(Entity.SalesOrder, Verb.Line, id, { suppressWebhooks: true, ...data } as t.CreateSalesOrderLineRequest);
	}
	public async SalesOrderLineItem_delete(id: t.NumericId) {
		return this.delete<t.SalesOrderLineItem>(Entity.SalesOrderLineItem, id);
	}
	public async SalesOrderLineItem_externalId(id: t.NumericId, externalId: t.NumericId) {
		return this.doWithId(Entity.SalesOrderLineItem, Verb.ExternalId, id, String(externalId));
	}
	public async SalesOrderLineItem_find(options?: t.SoftledgerGetRequest<t.SalesOrderLineItem>) {
		return this.getAll<t.SalesOrderLineItem>(Entity.SalesOrderLineItems, options);
	}
	public async SalesOrderLineItem_fulfill(id: t.NumericId, data: t.FulFillLineRequest) {
		return this.doWithData<t.FulFillLineRequest>(Entity.SalesOrderLineItem, Verb.Fulfill, id, data);
	}
	public async SalesOrderLineItem_unfulfill(id: t.NumericId, data: t.UnFulFillLineRequest) {
		return this.doWithData<t.UnFulFillLineRequest>(Entity.SalesOrderLineItem, Verb.UnFulfill, id, data);
	}
	public async SalesOrderLineItem_update(id: t.NumericId, data: t.UpdateSalesOrderLineRequest) {
		return this.update<t.SalesOrderLineItem, t.UpdateSalesOrderLineRequest>(Entity.SalesOrderLineItem, id, data);
	}

	public async Settings_get(options?: t.SoftLedgerSDKOptions) {
		return this.getNoArgs<t.Settings>(Entity.Settings, options);
	}

	public async ShipmentReceipt_find(options?: t.SoftledgerGetRequest<t.ShipmentReceipt>) {
		return this.getAll<t.ShipmentReceipt>(Entity.ShipmentReceipt, options);
	}
	public async ShipmentReceipt_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.ShipmentReceipt>(Entity.ShipmentReceipt, id, options);
	}
	public async ShipmentReceiptLine_find(options?: t.SoftledgerGetRequest<t.ShipmentReceiptLine>) {
		return this.getAll<t.ShipmentReceiptLine>(Entity.ShipmentReceiptLine, options);
	}

	public async Status_get(type: t.StatusType, options?: t.SoftLedgerSDKOptions) {
		return this.getOneWithCustomType<t.Status, t.StatusType>(Entity.Status, type, options);
	}

	public async StockAdjustment_find(options?: t.SoftledgerGetRequest<t.StockAdjustment>) {
		return this.getAll<t.StockAdjustment>(Entity.StockAdjustment, options);
	}
	public async StockAdjustment_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.StockAdjustment>(Entity.StockAdjustment, id, options);
	}
	public async StockAdjustment_summary(options?: t.SoftledgerGetRequest<t.StockAdjustment>) {
		return this.getAll<t.Stock>(Entity.StockAdjustmentSummary, options);
	}

	public async Template_find(options?: t.SoftledgerGetRequest<t.Template>) {
		return this.getAll<t.Template>(Entity.Template, options);
	}
	public async Template_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Template>(Entity.Template, id, options);
	}

	public async Transfer_create(options?: t.CreateTransferRequest) {
		return this.create<t.Transfer, t.CreateTransferRequest>(Entity.Transfer, options);
	}
	public async Vendor_create(data: t.CreateVendorRequest) {
		return this.create<t.Vendor, t.CreateVendorRequest>(Entity.Vendor, data);
	}
	public async Vendor_delete(id: t.NumericId) {
		return this.delete<t.Vendor>(Entity.Vendor, id);
	}
	public async Vendor_find(options?: t.SoftledgerGetRequest<t.Vendor>) {
		return this.getAll<t.Vendor>(Entity.Vendor, options);
	}
	public async Vendor_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Vendor>(Entity.Vendor, id, options);
	}
	public async Vendor_update(id: t.NumericId, data: t.UpdateVendorRequest) {
		return this.update<t.Vendor, t.UpdateVendorRequest>(Entity.Vendor, id, data);
	}

	public async Warehouse_create(data: t.CreateWarehouseRequest) {
		return this.create<t.Warehouse, t.CreateWarehouseRequest>(Entity.Warehouse, data);
	}
	public async Warehouse_delete(id: t.NumericId) {
		return this.delete<t.Warehouse>(Entity.Warehouse, id);
	}
	public async Warehouse_find(options?: t.SoftledgerGetRequest<t.Warehouse>) {
		return this.getAll<t.Warehouse>(Entity.Warehouse, options);
	}
	public async Warehouse_get(id: t.NumericId, options?: t.SoftLedgerSDKOptions) {
		return this.getOne<t.Warehouse>(Entity.Warehouse, id, options);
	}
	public async Warehouse_update(id: t.NumericId, data: t.UpdateWarehouseRequest) {
		return this.update<t.Warehouse, t.UpdateWarehouseRequest>(Entity.Warehouse, id, data);
	}
}
