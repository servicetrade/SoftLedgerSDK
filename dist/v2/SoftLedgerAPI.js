'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.SoftLedgerAPI = void 0;
const SoftLedgerApiBase_1 = require('./SoftLedgerApiBase');
const types_1 = require('./types');
class SoftLedgerAPI extends SoftLedgerApiBase_1.SoftLedgerAPIBase {
	Address_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Address, data);
		});
	}
	Address_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Address, id);
		});
	}
	Address_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Address, options);
		});
	}
	Address_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Address, id, options);
		});
	}
	Address_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Address, id, data);
		});
	}
	Audit_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.AuditLogs, options);
		});
	}
	Customer_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Customer, data);
		});
	}
	Customer_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Customer, id);
		});
	}
	Customer_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Customer, options);
		});
	}
	Customer_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Customer, id, options);
		});
	}
	Customer_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Customer, id, data);
		});
	}
	Inventory_runCostbasis() {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.InventoryCostbasis, {});
		});
	}
	Item_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Item, data);
		});
	}
	Item_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Item, id);
		});
	}
	Item_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Item, options);
		});
	}
	Item_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Item, id, options);
		});
	}
	Item_stockSummary(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOneSubEntity(types_1.Entity.Item, types_1.Entity.StockSummary, id);
		});
	}
	Item_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Item, id, data);
		});
	}
	Job_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Job, data);
		});
	}
	Job_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Job, id);
		});
	}
	Job_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Job, options);
		});
	}
	Job_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Job, id, options);
		});
	}
	Job_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Job, id, data);
		});
	}
	Location_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Location, data);
		});
	}
	Location_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Location, id);
		});
	}
	Location_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Location, options);
		});
	}
	Location_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Location, id, options);
		});
	}
	Location_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Location, id, data);
		});
	}
	PurchaseOrder_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.PurchaseOrder, data);
		});
	}
	PurchaseOrder_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.PurchaseOrder, id);
		});
	}
	PurchaseOrder_email(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.PurchaseOrder, types_1.Verb.Email, id);
		});
	}
	PurchaseOrder_externalId(id, externalId) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithId(types_1.Entity.PurchaseOrder, types_1.Verb.ExternalId, id, String(externalId));
		});
	}
	PurchaseOrder_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.PurchaseOrder, options);
		});
	}
	PurchaseOrder_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.PurchaseOrder, id, options);
		});
	}
	PurchaseOrder_getLineItem(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAllSubEntity(types_1.Entity.PurchaseOrder, types_1.Entity.LineItem, id, options);
		});
	}
	PurchaseOrder_issue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.PurchaseOrder, types_1.Verb.Issue, id);
		});
	}
	PurchaseOrder_unIssue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.PurchaseOrder, types_1.Verb.UnIssue, id);
		});
	}
	PurchaseOrder_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.PurchaseOrder, id, data);
		});
	}
	PurchaseOrder_void(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.PurchaseOrder, types_1.Verb.Void, id);
		});
	}
	PurchaseOrderLineItem_create(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.createSubEntity(types_1.Entity.PurchaseOrder, types_1.Verb.Line, id, data);
		});
	}
	PurchaseOrderLineItem_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.PurchaseOrderLineItem, id);
		});
	}
	PurchaseOrderLineItem_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.PurchaseOrderLineItems, options);
		});
	}
	PurchaseOrderLineItem_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.PurchaseOrderLineItem, id, data);
		});
	}
	SalesOrder_complete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.Complete, id);
		});
	}
	SalesOrder_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.SalesOrder, data);
		});
	}
	SalesOrder_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.SalesOrder, id);
		});
	}
	SalesOrder_email(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.Email, id);
		});
	}
	SalesOrder_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.SalesOrder, options);
		});
	}
	SalesOrder_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.SalesOrder, id, options);
		});
	}
	SalesOrder_issue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.Issue, id);
		});
	}
	SalesOrder_lines(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAllSubEntity(types_1.Entity.SalesOrder, types_1.Entity.LineItem, id, options);
		});
	}
	SalesOrder_reject(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.Reject, id);
		});
	}
	SalesOrder_unComplete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.UnComplete, id);
		});
	}
	SalesOrder_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.SalesOrder, id, data);
		});
	}
	SalesOrder_void(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(types_1.Entity.SalesOrder, types_1.Verb.Void, id);
		});
	}
	SalesOrderLineItem_create(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.createSubEntity(types_1.Entity.SalesOrder, types_1.Verb.Line, id, data);
		});
	}
	SalesOrderLineItem_createSuppressWebhooks(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.createSubEntity(types_1.Entity.SalesOrder, types_1.Verb.Line, id, Object.assign({ suppressWebhooks: true }, data));
		});
	}
	SalesOrderLineItem_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.SalesOrderLineItem, id);
		});
	}
	SalesOrderLineItem_externalId(id, externalId) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithId(types_1.Entity.SalesOrderLineItem, types_1.Verb.ExternalId, id, String(externalId));
		});
	}
	SalesOrderLineItem_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.SalesOrderLineItems, options);
		});
	}
	SalesOrderLineItem_fulfill(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithData(types_1.Entity.SalesOrderLineItem, types_1.Verb.Fulfill, id, data);
		});
	}
	SalesOrderLineItem_unfulfill(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithData(types_1.Entity.SalesOrderLineItem, types_1.Verb.UnFulfill, id, data);
		});
	}
	SalesOrderLineItem_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.SalesOrderLineItem, id, data);
		});
	}
	Settings_get(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getNoArgs(types_1.Entity.Settings, options);
		});
	}
	ShipmentReceipt_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.ShipmentReceipt, options);
		});
	}
	ShipmentReceipt_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.ShipmentReceipt, id, options);
		});
	}
	ShipmentReceiptLine_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.ShipmentReceiptLine, options);
		});
	}
	Status_get(type, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOneWithCustomType(types_1.Entity.Status, type, options);
		});
	}
	StockAdjustment_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.StockAdjustment, options);
		});
	}
	StockAdjustment_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.StockAdjustment, id, options);
		});
	}
	StockAdjustment_summary(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.StockAdjustmentSummary, options);
		});
	}
	Template_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Template, options);
		});
	}
	Template_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Template, id, options);
		});
	}
	Transfer_create(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Transfer, options);
		});
	}
	Vendor_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Vendor, data);
		});
	}
	Vendor_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Vendor, id);
		});
	}
	Vendor_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Vendor, options);
		});
	}
	Vendor_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Vendor, id, options);
		});
	}
	Vendor_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Vendor, id, data);
		});
	}
	Warehouse_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(types_1.Entity.Warehouse, data);
		});
	}
	Warehouse_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(types_1.Entity.Warehouse, id);
		});
	}
	Warehouse_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(types_1.Entity.Warehouse, options);
		});
	}
	Warehouse_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(types_1.Entity.Warehouse, id, options);
		});
	}
	Warehouse_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(types_1.Entity.Warehouse, id, data);
		});
	}
}
exports.SoftLedgerAPI = SoftLedgerAPI;
