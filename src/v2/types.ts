import { SoftledgerConnectionLoggerInterface } from '../types';

export enum AuthorizationType {
	AUTH0,
	MIDDLEWARE,
}

export enum Entity {
	AuditLogs = 'audit-logs',
	Address = 'addresses',
	Customer = 'customer',
	Item = 'items',
	Job = 'jobs',
	LineItem = 'lines',
	Location = 'locations',
	InventoryCostbasis = 'inventory/cost-basis',
	PurchaseOrder = 'purchase-orders',
	PurchaseOrderLineItem = 'purchase-orders/line', // [sic] Sl Api uses both, singular for update, plural for get and find.
	PurchaseOrderLineItems = 'purchase-orders/lines',
	SalesOrder = 'sales-orders',
	SalesOrderLineItem = 'sales-orders/line',
	SalesOrderLineItems = 'sales-orders/lines', // [sic] Sl Api uses both, singular for update, plural for get and find
	Settings = 'settings',
	ShipmentReceipt = 'shipment-receipts',
	ShipmentReceiptLine = 'shipment-receipts/lines',
	Status = 'status',
	StockAdjustment = 'stock-adjustments',
	StockAdjustmentSummary = 'stock-adjustments/summary',
	StockSummary = 'stock/summary',
	Template = 'templates',
	Transfer = 'transfers',
	Vendor = 'vendors',
	Warehouse = 'warehouses',
}

export enum Verb {
	Accept = 'accept',
	Complete = 'complete',
	Email = 'email',
	Fulfill = 'fulfill',
	Issue = 'issue',
	ExternalId = 'externalId',
	Line = 'line',
	Receive = 'receive',
	Reject = 'reject',
	UnComplete = 'uncomplete',
	UnFulfill = 'unfulfill',
	UnIssue = 'unissue',
	Void = 'void',
}

export const NULL_LOGGER: SoftledgerConnectionLoggerInterface = {
	debug: () => {},
	info: () => {},
	verbose: () => {},
	warn: () => {},
	error: () => {},
};
