'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PurchaseOrderStatus = exports.OrderStatus = exports.JobStatus = void 0;
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
