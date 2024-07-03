'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NULL_LOGGER = exports.Verb = exports.Entity = exports.AuthorizationType = void 0;
var AuthorizationType;
(function (AuthorizationType) {
	AuthorizationType[(AuthorizationType['AUTH0'] = 0)] = 'AUTH0';
	AuthorizationType[(AuthorizationType['MIDDLEWARE'] = 1)] = 'MIDDLEWARE';
})((AuthorizationType = exports.AuthorizationType || (exports.AuthorizationType = {})));
var Entity;
(function (Entity) {
	Entity['AuditLogs'] = 'audit-logs';
	Entity['Address'] = 'addresses';
	Entity['Customer'] = 'customer';
	Entity['Item'] = 'items';
	Entity['Job'] = 'jobs';
	Entity['LineItem'] = 'lines';
	Entity['Location'] = 'locations';
	Entity['InventoryCostbasis'] = 'inventory/cost-basis';
	Entity['PurchaseOrder'] = 'purchase-orders';
	Entity['PurchaseOrderLineItem'] = 'purchase-orders/line';
	Entity['PurchaseOrderLineItems'] = 'purchase-orders/lines';
	Entity['SalesOrder'] = 'sales-orders';
	Entity['SalesOrderLineItem'] = 'sales-orders/line';
	Entity['SalesOrderLineItems'] = 'sales-orders/lines';
	Entity['Settings'] = 'settings';
	Entity['ShipmentReceipt'] = 'shipment-receipts';
	Entity['ShipmentReceiptLine'] = 'shipment-receipts/lines';
	Entity['Status'] = 'status';
	Entity['StockAdjustment'] = 'stock-adjustments';
	Entity['StockAdjustmentSummary'] = 'stock-adjustments/summary';
	Entity['StockSummary'] = 'stock/summary';
	Entity['Template'] = 'templates';
	Entity['Transfer'] = 'transfers';
	Entity['Vendor'] = 'vendors';
	Entity['Warehouse'] = 'warehouses';
})((Entity = exports.Entity || (exports.Entity = {})));
var Verb;
(function (Verb) {
	Verb['Accept'] = 'accept';
	Verb['Complete'] = 'complete';
	Verb['Email'] = 'email';
	Verb['Fulfill'] = 'fulfill';
	Verb['Issue'] = 'issue';
	Verb['ExternalId'] = 'externalId';
	Verb['Line'] = 'line';
	Verb['Receive'] = 'receive';
	Verb['Reject'] = 'reject';
	Verb['UnComplete'] = 'uncomplete';
	Verb['UnFulfill'] = 'unfulfill';
	Verb['UnIssue'] = 'unissue';
	Verb['Void'] = 'void';
})((Verb = exports.Verb || (exports.Verb = {})));
exports.NULL_LOGGER = {
	debug: () => {},
	info: () => {},
	verbose: () => {},
	warn: () => {},
	error: () => {},
};
