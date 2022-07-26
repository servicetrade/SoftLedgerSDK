"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftLedgerAPI = exports.DEFAULT_GET_LIMIT = exports.AUTH_URL = void 0;
const axios_1 = require("axios");
exports.AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';
exports.DEFAULT_GET_LIMIT = 500;
const GRAND_TYPE = '';
const TENANT_UUID = '';
const AUDIENCE = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const BASE_URL = 'https://api.softledger.com/api';
const BASE_V2_URL = 'https://api.softledger.com/v2';
class SoftLedgerAPI {
    constructor(accessToken, baseURL, baseV2URL, authData) {
        this.baseURL = baseURL;
        this.baseV2URL = baseV2URL;
        this.authData = authData;
        this.instance = axios_1.default.create({ baseURL });
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instance.defaults.headers.common['Content-Type'] = 'application/json';
        this.instanceV2 = axios_1.default.create({ baseURL: baseV2URL });
        this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instanceV2.defaults.headers.common['Content-Type'] = 'application/json';
    }
    _getAll(instance, url, params = {}) {
        return new Promise((resolve, reject) => {
            let headerResp = null;
            let totalItems = null;
            let currentItems = 0;
            function _loadNextChunk() {
                const mergedParams = Object.assign(Object.assign({}, params), { limit: exports.DEFAULT_GET_LIMIT, offset: currentItems });
                return instance.get(url, { params: mergedParams }).then(_processChunk, reject);
            }
            function _processChunk(resp) {
                if (headerResp === null) {
                    headerResp = resp;
                    totalItems = headerResp.data.totalItems;
                }
                else {
                    headerResp.data.data.push(...resp.data.data);
                }
                currentItems = headerResp.data.data.length;
                if (currentItems > totalItems) {
                    return reject('Unexpectedly received too much data');
                }
                else if (currentItems === totalItems) {
                    return resolve(headerResp);
                }
                else if (resp.data.data.length < exports.DEFAULT_GET_LIMIT) {
                    return reject('Unexpectedly received too little data in chunk');
                }
                else {
                    return _loadNextChunk();
                }
            }
            return _loadNextChunk();
        });
    }
    static build({ grant_type = GRAND_TYPE, tenantUUID = TENANT_UUID, audience = AUDIENCE, client_id = CLIENT_ID, client_secret = CLIENT_SECRET, baseURL = BASE_URL, baseV2URL = BASE_V2_URL, authUrl = exports.AUTH_URL, token = '', }) {
        if (token) {
            return new SoftLedgerAPI(token, baseURL, baseV2URL);
        }
        return axios_1.default
            .post(authUrl, {
            grant_type,
            tenantUUID,
            audience,
            client_id,
            client_secret,
        })
            .then((response) => {
            const { access_token } = response.data;
            return new SoftLedgerAPI(access_token, baseURL, baseV2URL, response.data);
        });
    }
    setToken(token) {
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    getAllAddresses() {
        return this._getAll(this.instance, `/addresses`);
    }
    createAddress(payload) {
        return this.instance.post('/addresses', payload);
    }
    getOneAddress(id) {
        return this.instance.get(`/addresses/${id}`);
    }
    updateAddress(id, payload) {
        return this.instance.put(`/addresses/${id}`, payload);
    }
    deleteAddress(id) {
        return this.instance.delete(`/addresses/${id}`);
    }
    getItemsByParams(params) {
        return this._getAll(this.instance, '/items', params);
    }
    getAllItems() {
        return this._getAll(this.instance, '/items');
    }
    createItem(payload) {
        return this.instance.post('/items', payload);
    }
    getOneItem(id) {
        return this.instance.get(`/items/${id}`);
    }
    updateItem(id, payload) {
        return this.instance.put(`/items/${id}`, payload);
    }
    deleteItem(id) {
        return this.instance.delete(`/items/${id}`);
    }
    getAllJobs() {
        return this._getAll(this.instance, '/jobs');
    }
    createJob(payload) {
        return this.instance.post('/jobs', payload);
    }
    getOneJob(id) {
        return this.instance.get(`/jobs/${id}`);
    }
    updateJob(id, payload) {
        return this.instance.put(`/jobs/${id}`, payload);
    }
    deleteJob(id) {
        return this.instance.delete(`/jobs/${id}`);
    }
    getAllPurchaseOrders(params) {
        return this._getAll(this.instance, '/purchaseOrders', params);
    }
    createPurchaseOrder(payload) {
        return this.instance.post('/purchaseOrders', payload);
    }
    getPurchaseOrderByParams(params) {
        return this._getAll(this.instance, '/purchaseOrders', params);
    }
    getPOAllLineItems() {
        return this._getAll(this.instance, '/purchaseOrders/lineItems');
    }
    getPOLineItemsByParams(params) {
        return this._getAll(this.instance, '/purchaseOrders/lineItems', params);
    }
    getPOLineItems(id) {
        return this.instance.get(`/purchaseOrders/${id}/lineItems`);
    }
    receiveLine(id, payload) {
        return this.instance.put(`purchaseOrders/lineItems/${id}/receive`, payload);
    }
    getOnePurchaseOrder(id) {
        return this.instance.get(`/purchaseOrders/${id}`);
    }
    updatePurchaseOrder(id, payload) {
        return this.instance.put(`/purchaseOrders/${id}`, payload);
    }
    issuePurchaseOrder(id) {
        return this.instance.put(`/purchaseOrders/${id}/issue`);
    }
    emailPurchaseOrder(id) {
        return this.instance.put(`/purchaseOrders/${id}/email`);
    }
    unissuePurchaseOrder(id) {
        return this.instance.put(`/purchaseOrders/${id}/unissue`);
    }
    voidPurchaseOrder(id) {
        return this.instance.put(`/purchaseOrders/${id}/void`);
    }
    deletePurchaseOrder(id) {
        return this.instance.delete(`/purchaseOrders/${id}`);
    }
    getAllWarehouses() {
        return this._getAll(this.instance, '/warehouses');
    }
    createWarehouse(payload) {
        return this.instance.post('/warehouses', payload);
    }
    getOneWarehouse(id) {
        return this.instance.get(`/warehouses/${id}`);
    }
    updateWarehouse(id, payload) {
        return this.instance.put(`/warehouses/${id}`);
    }
    deleteWarehouse(id) {
        return this.instance.delete(`/warehouses/${id}`);
    }
    getAllLocations() {
        return this._getAll(this.instance, '/locations');
    }
    createLocation(payload) {
        return this.instance.post('/locations', payload);
    }
    distinctCurrencies() {
        return this.instance.get('/locations/currencies');
    }
    getLocationAccounts(id) {
        return this._getAll(this.instance, `/locations/${id}/accounts`);
    }
    userLocationTree() {
        return this.instance.get('/locations/me');
    }
    getOneLocation(id) {
        return this.instance.get(`/locations/${id}`);
    }
    updateLocation(id, payload) {
        return this.instance.put(`/locations/${id}`, payload);
    }
    deleteLocation(id) {
        return this.instance.delete(`/locations/${id}`);
    }
    locationDescendents(id) {
        return this.instance.get(`/locations/${id}/descendents`);
    }
    getAllSalesOrders(params) {
        return this._getAll(this.instance, '/salesOrders', params);
    }
    getSalesOrderByParams(params) {
        return this._getAll(this.instance, '/salesOrders', params);
    }
    createSalesOrder(payload) {
        return this.instance.post('/salesOrders', payload);
    }
    completeSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/complete`);
    }
    uncompleteSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/uncomplete`);
    }
    getSOAllLineItems() {
        return this._getAll(this.instance, '/salesOrders/lineItems');
    }
    getSOLineItemsByParams(params) {
        return this._getAll(this.instance, '/salesOrders/lineItems', params);
    }
    fulfillLine(id, payload) {
        return this.instance.put(`/salesOrders/lineItems/${id}/fulfill`, payload);
    }
    unFulfillLine(id, payload) {
        return this.instance.put(`/salesOrders/lineItems/${id}/unfulfill`, payload);
    }
    getOneSalesOrder(id) {
        return this.instance.get(`/salesOrders/${id}`);
    }
    updateSalesOrder(id, payload) {
        return this.instance.put(`/salesOrders/${id}`, payload);
    }
    deleteSalesOrder(id) {
        return this.instance.delete(`/salesOrders/${id}`);
    }
    issueSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/issueQuote`);
    }
    emailSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/email`);
    }
    acceptSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/acceptQuote`);
    }
    rejectSalesOrder(id) {
        return this.instance.put(`/salesOrders/${id}/rejectQuote`);
    }
    getVendor(id) {
        return this.instance.get(`/vendors/${id}`);
    }
    getAllVendors() {
        return this.instance.get('/vendors');
    }
    createVendor(payload) {
        return this.instance.post('/vendors', payload);
    }
    deleteVendor(id) {
        return this.instance.delete(`/vendors/${id}`);
    }
    getAllCustomers() {
        return this._getAll(this.instance, '/customers');
    }
    getCustomer(id) {
        return this.instance.get(`/customers/${id}`);
    }
    createCustomer(payload) {
        return this.instance.post('/customers', payload);
    }
    updateCustomer(payload) {
        return this.instance.put(`/customers/${payload._id}`, payload);
    }
    deleteCustomer(id) {
        return this.instance.delete(`/customers/${id}`);
    }
    getCustomFields(type) {
        return this._getAll(this.instanceV2, `/custom-fields/${type}`);
    }
    createCustomField(type, payload) {
        return this.instanceV2.post(`/custom-fields/${type}`, payload);
    }
    getStockSummary(params) {
        return this._getAll(this.instance, '/stock/summary', params);
    }
    getStockAdjustments(params) {
        return this._getAll(this.instance, '/stock', params);
    }
    transferStock(payload) {
        return this.instance.post('/stock/transfer', payload);
    }
    getSettings() {
        return this.instance.get('/settings');
    }
    getShipmentReceipt(id) {
        return this.instance.get(`/shipmentReceipts/${id}`);
    }
    getShipmentReceiptLineItems(id) {
        return this.instance.get(`/shipmentReceipts/${id}/lineItems`);
    }
    getShipmentReceiptAllLineItems(params) {
        return this.instance.get(`/shipmentReceipts/lineItems`, params);
    }
    createShipmentReceipt(payload) {
        return this.instance.post('/shipmentReceipts', payload);
    }
    getTemplates(params) {
        return this._getAll(this.instance, '/system/templates', params);
    }
    setStartingDocumentNumber(payload) {
        return this.instance.put('/settings/sequence', payload);
    }
}
exports.SoftLedgerAPI = SoftLedgerAPI;
