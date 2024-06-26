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
exports.SoftLedgerAPI = exports.DEFAULT_CHUNK_SIZE = void 0;
const axios_1 = require('axios');
const axios_auth_refresh_1 = require('axios-auth-refresh');
exports.DEFAULT_CHUNK_SIZE = 1000;
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
})(Entity || (Entity = {}));
var Verb;
(function (Verb) {
	Verb['Accept'] = 'accept';
	Verb['Complete'] = 'complete';
	Verb['Email'] = 'email';
	Verb['Fulfill'] = 'fulfill';
	Verb['Issue'] = 'issue';
	Verb['Line'] = 'line';
	Verb['Receive'] = 'receive';
	Verb['Reject'] = 'reject';
	Verb['UnComplete'] = 'uncomplete';
	Verb['UnFulfill'] = 'unfulfill';
	Verb['UnIssue'] = 'unissue';
	Verb['Void'] = 'void';
})(Verb || (Verb = {}));
const NULL_LOGGER = {
	debug: () => {},
	info: () => {},
	verbose: () => {},
	warn: () => {},
	error: () => {},
};
class SoftLedgerAPI {
	constructor(options) {
		this.options = options;
		this.logger = options.logger || NULL_LOGGER;
		this.cache = options.cache;
	}
	getNewAuth() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			return (_a = yield axios_1.default.post(this.options.authUrl, this.options.auth0Options)) === null || _a === void 0 ? void 0 : _a.data;
		});
	}
	buildInstance() {
		return __awaiter(this, void 0, void 0, function* () {
			this.logger.info(this.options);
			this.instance = axios_1.default.create({ baseURL: this.options.url });
			this.instance.defaults.headers.common['Content-Type'] = 'application/json';
			yield this.setAuth();
			if (this.options.refreshAuth === true) {
				(0, axios_auth_refresh_1.default)(this.instance, () =>
					__awaiter(this, void 0, void 0, function* () {
						return yield this.setAuth(true);
					})
				);
			}
		});
	}
	getToken(ignoreCache = false) {
		return __awaiter(this, void 0, void 0, function* () {
			if (!ignoreCache && !!this.cache) {
				const token = yield this.cache.get();
				if (!!token) return token;
			}
			const authData = yield this.getNewAuth();
			if (!!this.cache) yield this.cache.set(authData);
			return authData.access_token;
		});
	}
	setAuth(ignoreCache = false) {
		return __awaiter(this, void 0, void 0, function* () {
			this.logger.debug('Updating Auth');
			this.token = yield this.getToken(ignoreCache);
			this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
		});
	}
	logResponse(resp, code = 200, message = 'OK') {
		const { url, method, data, params } = (resp === null || resp === void 0 ? void 0 : resp.config) || {};
		this.logger.info(`${method} ${url} ${params} ${data}: ${code} ${message}`);
		this.logger.verbose({ url, method, data, params, responseData: resp.data, code, message });
	}
	logError(err) {
		var _a;
		const { url, method, data, params } = ((_a = err.response) === null || _a === void 0 ? void 0 : _a.config) || {};
		const { code, message } = err;
		this.logger.info(`${method} ${url} ${params} ${data}: ${err.code} ${err.message}`);
		this.logger.verbose({ url, method, data, params, responseData: null, code, message });
	}
	query(cb, options) {
		var _a, _b, _c, _d, _e, _f;
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const inst = yield this.getInstance();
				const resp = yield cb(inst);
				(_b = (_a = resp === null || resp === void 0 ? void 0 : resp.config) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? true : delete _b.Authorization;
				this.logResponse(resp);
				return resp.data;
			} catch (e) {
				if (
					(options === null || options === void 0 ? void 0 : options.ifExists) === true &&
					((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.status) === 404
				) {
					this.logResponse(e.resp, 404, 'Not Found (ifExists = TRUE)');
					return null;
				}
				(_f = (_e = (_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.config) === null || _e === void 0 ? void 0 : _e.headers) === null ||
				_f === void 0
					? true
					: delete _f.Authorization;
				this.logError(e);
				throw e.toJSON();
			}
		});
	}
	getOne(entity, id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.get(`/${entity}/${id}`), options);
		});
	}
	getOneWithCustomType(entity, id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.get(`/${entity}/${id}`), options);
		});
	}
	_getAll(path, options = {}) {
		return __awaiter(this, void 0, void 0, function* () {
			let limit = options.limit || 1000;
			const data = [];
			while (true) {
				options.limit = Math.min(exports.DEFAULT_CHUNK_SIZE, limit);
				limit = limit - options.limit;
				const page = yield this.query((i) => i.get(path, { params: SoftLedgerAPI.formatSearchOptions(options) }));
				data.push(...page.data);
				if (page.hasNextPage && limit > 0) {
					options.cursor = page.cursor;
				} else {
					return data;
				}
			}
		});
	}
	getAll(entity, options) {
		return this._getAll(`/${entity}`, options);
	}
	getAllSubEntity(entity, subEntity, id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this._getAll(`/${entity}/${id}/${subEntity}`, options);
		});
	}
	delete(entity, id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.delete(`/${entity}/${id}`));
		});
	}
	create(entity, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.post(`/${entity}`, { data }));
		});
	}
	createSubEntity(entity, verb, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.post(`/${entity}/${id}/${verb}`));
		});
	}
	update(entity, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}`, { data }));
		});
	}
	do(entity, verb, id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}/${verb}`));
		});
	}
	doWithData(entity, verb, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}/${verb}`, { data }));
		});
	}
	static formatSearchOptions(options) {
		return Object.assign(Object.assign({}, options), {
			order: (options === null || options === void 0 ? void 0 : options.order) ? options.order.map((x) => `${x[0]}:${x[1]}`).join(',') : undefined,
		});
	}
	getInstance() {
		return __awaiter(this, void 0, void 0, function* () {
			if (!this.instance) {
				yield this.buildInstance();
			}
			return this.instance;
		});
	}
	Audit_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.AuditLogs, options);
		});
	}
	Address_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Address, id, options);
		});
	}
	Address_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Address, options);
		});
	}
	Address_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Address, id);
		});
	}
	Address_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Address, data);
		});
	}
	Address_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Address, id, data);
		});
	}
	Customer_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Customer, id, options);
		});
	}
	Customer_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Customer, options);
		});
	}
	Customer_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Customer, id);
		});
	}
	Customer_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Customer, data);
		});
	}
	Customer_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Customer, id, data);
		});
	}
	Item_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Item, id, options);
		});
	}
	Item_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Item, options);
		});
	}
	Item_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Item, id);
		});
	}
	Item_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Item, data);
		});
	}
	Item_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Item, id, data);
		});
	}
	Item_stockSummary(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAllSubEntity(Entity.Item, Entity.StockSummary, id);
		});
	}
	Inventory_runCostbasis() {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.InventoryCostbasis, null);
		});
	}
	Job_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Job, id, options);
		});
	}
	Job_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Job, options);
		});
	}
	Job_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Job, id);
		});
	}
	Job_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Job, data);
		});
	}
	Job_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Job, id, data);
		});
	}
	Location_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Location, id, options);
		});
	}
	Location_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Location, options);
		});
	}
	Location_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Location, id);
		});
	}
	Location_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Location, data);
		});
	}
	Location_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Location, id, data);
		});
	}
	PurchaseOrder_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.PurchaseOrder, id, options);
		});
	}
	PurchaseOrder_getLineItem(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAllSubEntity(Entity.PurchaseOrder, Entity.LineItem, id, options);
		});
	}
	PurchaseOrder_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.PurchaseOrder, options);
		});
	}
	PurchaseOrder_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.PurchaseOrder, id);
		});
	}
	PurchaseOrder_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.PurchaseOrder, data);
		});
	}
	PurchaseOrder_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.PurchaseOrder, id, data);
		});
	}
	PurchaseOrder_issue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.PurchaseOrder, Verb.Issue, id);
		});
	}
	PurchaseOrder_unIssue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.PurchaseOrder, Verb.UnIssue, id);
		});
	}
	PurchaseOrder_email(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.PurchaseOrder, Verb.Email, id);
		});
	}
	PurchaseOrderLineItem_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.PurchaseOrderLineItems, id, options);
		});
	}
	PurchaseOrderLineItem_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.PurchaseOrderLineItems, options);
		});
	}
	PurchaseOrderLineItem_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.PurchaseOrderLineItem, id, data);
		});
	}
	SalesOrder_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.SalesOrder, id, options);
		});
	}
	SalesOrder_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.SalesOrder, options);
		});
	}
	SalesOrder_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.SalesOrder, id);
		});
	}
	SalesOrder_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.SalesOrder, data);
		});
	}
	SalesOrder_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.SalesOrder, id, data);
		});
	}
	SalesOrder_complete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.Complete, id);
		});
	}
	SalesOrder_unComplete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.UnComplete, id);
		});
	}
	SalesOrder_email(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.Email, id);
		});
	}
	SalesOrder_issue(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.Issue, id);
		});
	}
	SalesOrder_reject(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.Reject, id);
		});
	}
	SalesOrder_void(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.do(Entity.SalesOrder, Verb.Void, id);
		});
	}
	SalesOrder_lines(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAllSubEntity(Entity.SalesOrder, Entity.LineItem, id, options);
		});
	}
	SalesOrderLineItem_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.SalesOrderLineItems, options);
		});
	}
	SalesOrderLineItem_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.SalesOrderLineItems, id);
		});
	}
	SalesOrderLineItem_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.SalesOrderLineItem, id, data);
		});
	}
	SalesOrderLineItem_create(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.createSubEntity(Entity.SalesOrder, Verb.Line, id, data);
		});
	}
	SalesOrderLineItem_fulfill(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithData(Entity.SalesOrderLineItems, Verb.Fulfill, id, data);
		});
	}
	SalesOrderLineItem_unfulfill(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.doWithData(Entity.SalesOrderLineItems, Verb.UnFulfill, id, data);
		});
	}
	Status_get(type, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOneWithCustomType(Entity.Status, type, options);
		});
	}
	ShipmentReceipt_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.ShipmentReceipt, id, options);
		});
	}
	ShipmentReceipt_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.ShipmentReceipt, options);
		});
	}
	ShipmentReceiptLine_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.ShipmentReceiptLine, options);
		});
	}
	StockAdjustment_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.StockAdjustment, id, options);
		});
	}
	StockAdjustment_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.StockAdjustment, options);
		});
	}
	StockAdjustment_summary(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.StockAdjustmentSummary, options);
		});
	}
	Transfer_create(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Transfer, options);
		});
	}
	Template_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Template, id, options);
		});
	}
	Template_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Template, options);
		});
	}
	Vendor_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Vendor, id, options);
		});
	}
	Vendor_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Vendor, options);
		});
	}
	Vendor_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Vendor, id);
		});
	}
	Vendor_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Vendor, data);
		});
	}
	Vendor_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Vendor, id, data);
		});
	}
	Warehouse_get(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getOne(Entity.Warehouse, id, options);
		});
	}
	Warehouse_find(options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.getAll(Entity.Warehouse, options);
		});
	}
	Warehouse_delete(id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.delete(Entity.Warehouse, id);
		});
	}
	Warehouse_create(data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.create(Entity.Warehouse, data);
		});
	}
	Warehouse_update(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.update(Entity.Warehouse, id, data);
		});
	}
}
exports.SoftLedgerAPI = SoftLedgerAPI;
