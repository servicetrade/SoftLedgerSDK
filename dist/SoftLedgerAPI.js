"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftLedgerAPI = exports.AUTH_URL = void 0;
const axios_1 = require("axios");
exports.AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';
const GRAND_TYPE = 'client_credentials';
const TENANT_UUID = '300fccd3-dd05-4f68-b48b-df40adccd01c';
const AUDIENCE = 'https://sl-sb.softledger.com';
const CLIENT_ID = '6u6eM7jtGwArxYmMet767Rtq4oGuwYcu';
const CLIENT_SECRET = 'ctPIZfGxZeVgbMxS1qCXD7bzSakdFHt3meVADHI4RIgEZ5Is2KSOagDYm-9m-D-c';
const SANDBOX_URL = 'https://sb-api.softledger.com/api';
const SANDBOX_V2_URL = 'https://sb-api.softledger.com/v2';
const BASE_URL = 'https://api.softledger.com/api';
const BASE_V2_URL = 'https://api.softledger.com/v2';
class SoftLedgerAPI {
    constructor(accessToken, baseURL, baseV2URL) {
        this.baseURL = baseURL;
        this.baseV2URL = baseV2URL;
        this.instance = axios_1.default.create({ baseURL });
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instance.defaults.headers.common['Content-Type'] = 'application/json';
        this.instanceV2 = axios_1.default.create({ baseURL: baseV2URL });
        this.instanceV2.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instanceV2.defaults.headers.common['Content-Type'] = 'application/json';
    }
    static build({ grant_type = GRAND_TYPE, tenantUUID = TENANT_UUID, audience = AUDIENCE, client_id = CLIENT_ID, client_secret = CLIENT_SECRET, baseURL = BASE_URL, baseV2URL = BASE_V2_URL, authUrl = exports.AUTH_URL, }) {
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
            return new SoftLedgerAPI(access_token, baseURL, baseV2URL);
        });
    }
    getAllAddresses() {
        return this.instance.get(`/addresses`);
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
        let url = '/items';
        if (params) {
            url += `?${params}`;
        }
        return this.instance.get(url);
    }
    getSalesOrderByParams(params) {
        let url = '/salesOrders';
        if (params) {
            url += `?${params}`;
        }
        return this.instance.get(url);
    }
    getAllItems() {
        return this.instance.get('/items');
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
        return this.instance.get('/jobs');
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
        let url = '/purchaseOrders';
        if (params) {
            url += `?${params}`;
        }
        return this.instance.get(url);
    }
    createPurchaseOrder(payload) {
        return this.instance.post('/purchaseOrders', payload);
    }
    getPOAllLineItems() {
        return this.instance.get('/purchaseOrders/lineItems');
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
    deletePurchaseOrder(id) {
        return this.instance.delete(`/purchaseOrders/${id}`);
    }
    getAllWarehouses() {
        return this.instance.get('/warehouses');
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
        return this.instance.get('/locations');
    }
    createLocation(payload) {
        return this.instance.post('/locations', payload);
    }
    distinctCurrencies() {
        return this.instance.get('/locations/currencies');
    }
    getLocationAccounts(id) {
        return this.instance.get(`/locations/${id}/accounts`);
    }
    userLocationTree() {
        return this.instance.get('/locations/me');
    }
    getOneLocation(id) {
        return this.instance.get(`/locations/${id}`);
    }
    updateLocation(id, payload) {
        return this.instance.put(`/locations/${id}`);
    }
    deleteLocation(id) {
        return this.instance.delete(`/locations/${id}`);
    }
    locationDescendents(id) {
        return this.instance.get(`/locations/${id}/descendents`);
    }
    getAllSalesOrders(params) {
        let url = '/salesOrders';
        if (params) {
            url += `?${params}`;
        }
        return this.instance.get(url);
    }
    createSalesOrder(payload) {
        return this.instance.post('/salesOrders', payload);
    }
    getSOAllLineItems() {
        return this.instance.get('/salesOrders/lineItems');
    }
    fulfillLine(id, payload) {
        return this.instance.put(`/salesOrders/lineItems/${id}/fulfill`, payload);
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
        return this.instance.get('/customers');
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
        return this.instanceV2.get(`/custom-fields/${type}`);
    }
    createCustomField(type, payload) {
        return this.instanceV2.post(`/custom-fields/${type}`, payload);
    }
    getStockSummary() {
        return this.instance.get('/stock/summary');
    }
    transferStock(payload) {
        return this.instance.post('/stock/transfer', payload);
    }
    getSettings() {
        return this.instance.get('/settings');
    }
}
exports.SoftLedgerAPI = SoftLedgerAPI;
