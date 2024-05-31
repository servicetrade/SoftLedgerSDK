'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderStatus = exports.Status = exports.PurchaseOrderStatus = exports.ItemType = exports.SoftLedgerAPIv2 = exports.SoftLedgerAPI = void 0;
var SoftLedgerAPI_1 = require('./SoftLedgerAPI');
Object.defineProperty(exports, 'SoftLedgerAPI', {
	enumerable: true,
	get: function () {
		return SoftLedgerAPI_1.SoftLedgerAPI;
	},
});
var SoftLedgerAPI_2 = require('./v2/SoftLedgerAPI');
Object.defineProperty(exports, 'SoftLedgerAPIv2', {
	enumerable: true,
	get: function () {
		return SoftLedgerAPI_2.SoftLedgerAPI;
	},
});
var Item_1 = require('./types/items/Item');
Object.defineProperty(exports, 'ItemType', {
	enumerable: true,
	get: function () {
		return Item_1.ItemType;
	},
});
var types_1 = require('./types');
Object.defineProperty(exports, 'PurchaseOrderStatus', {
	enumerable: true,
	get: function () {
		return types_1.PurchaseOrderStatus;
	},
});
var CreateSalesOrderRequest_1 = require('./types/salesOrders/CreateSalesOrderRequest');
Object.defineProperty(exports, 'Status', {
	enumerable: true,
	get: function () {
		return CreateSalesOrderRequest_1.Status;
	},
});
var OrderStatus_1 = require('./types/salesOrders/OrderStatus');
Object.defineProperty(exports, 'OrderStatus', {
	enumerable: true,
	get: function () {
		return OrderStatus_1.OrderStatus;
	},
});
