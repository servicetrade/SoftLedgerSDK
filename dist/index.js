"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.Status = exports.SoftLedgerAPI = void 0;
var SoftLedgerAPI_1 = require("./SoftLedgerAPI");
Object.defineProperty(exports, "SoftLedgerAPI", { enumerable: true, get: function () { return SoftLedgerAPI_1.SoftLedgerAPI; } });
var CreateSalesOrderRequest_1 = require("./types/salesOrders/CreateSalesOrderRequest");
Object.defineProperty(exports, "Status", { enumerable: true, get: function () { return CreateSalesOrderRequest_1.Status; } });
var OrderStatus_1 = require("./types/salesOrders/OrderStatus");
Object.defineProperty(exports, "OrderStatus", { enumerable: true, get: function () { return OrderStatus_1.OrderStatus; } });
