'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ItemType = exports.TransferStatus = exports.PurchaseOrderStatus = exports.OrderStatus = exports.JobStatus = void 0;
var JobStatus_1 = require('./jobs/JobStatus');
Object.defineProperty(exports, 'JobStatus', {
	enumerable: true,
	get: function () {
		return JobStatus_1.JobStatus;
	},
});
var OrderStatus_1 = require('./salesOrders/OrderStatus');
Object.defineProperty(exports, 'OrderStatus', {
	enumerable: true,
	get: function () {
		return OrderStatus_1.OrderStatus;
	},
});
var PurchaseOrderStatus_1 = require('./purchaseOrders/PurchaseOrderStatus');
Object.defineProperty(exports, 'PurchaseOrderStatus', {
	enumerable: true,
	get: function () {
		return PurchaseOrderStatus_1.PurchaseOrderStatus;
	},
});
var TransferStatus_1 = require('./stock/TransferStatus');
Object.defineProperty(exports, 'TransferStatus', {
	enumerable: true,
	get: function () {
		return TransferStatus_1.TransferStatus;
	},
});
var Item_1 = require('./items/Item');
Object.defineProperty(exports, 'ItemType', {
	enumerable: true,
	get: function () {
		return Item_1.ItemType;
	},
});
