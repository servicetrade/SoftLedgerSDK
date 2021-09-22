"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftLedgerAPI = void 0;
const axios_1 = require("axios");
const AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';
const GRAND_TYPE = 'client_credentials';
const TENANT_UUID = '300fccd3-dd05-4f68-b48b-df40adccd01c';
const AUDIENCE = 'https://sl-sb.softledger.com';
const CLIENT_ID = '6u6eM7jtGwArxYmMet767Rtq4oGuwYcu';
const CLIENT_SECRET = 'ctPIZfGxZeVgbMxS1qCXD7bzSakdFHt3meVADHI4RIgEZ5Is2KSOagDYm-9m-D-c';
const SANDBOX_URL = 'https://sb-api.softledger.com/api';
const BASE_URL = 'https://api.softledger.com/api';
class SoftLedgerAPI {
    constructor(accessToken, baseURL) {
        this.baseURL = baseURL;
        this.instance = axios_1.default.create({ baseURL });
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instance.defaults.headers.common['Content-Type'] = 'application/json';
    }
    static build(grant_type = GRAND_TYPE, tenantUUID = TENANT_UUID, audience = AUDIENCE, client_id = CLIENT_ID, client_secret = CLIENT_SECRET, baseURL = SANDBOX_URL) {
        return axios_1.default.post(AUTH_URL, {
            grant_type,
            tenantUUID,
            audience,
            client_id,
            client_secret,
        }).then((response) => {
            const { access_token } = response.data;
            return new SoftLedgerAPI(access_token, baseURL);
        });
    }
    getAllAddresses() {
        return this.instance.get(`/addresses`);
    }
    createAddress(payload) {
        return axios_1.default.post('/addresses', payload);
    }
    getOneAddress(id) {
        return axios_1.default.get(`/addresses/${id}`);
    }
    updateAddress(id, payload) {
        return axios_1.default.put(`/addresses/${id}`, payload);
    }
    deleteAddress(id) {
        return axios_1.default.delete(`/addresses/${id}`);
    }
    getAllItems() {
        return this.instance.get('/items');
    }
    createItem(payload) {
        return this.instance.post('/items');
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
    getAlllJobs() {
        return this.instance.get('/jobs');
    }
    createJob(payload) {
        return this.instance.post('/jobs');
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
    getAllPurchaseOrders() {
        return this.instance.get('/purchaseOrders');
    }
    createPurchaseOrder(payload) {
        return this.instance.post('/purchaseOrders');
    }
    getPOAllLineItems() {
        return this.instance.get('/purchaseOrders/lineItems');
    }
    getPOLineItems(id, payload) {
        return this.instance.put(`/purchaseOrders/${id}/lineItems`, payload);
    }
    receiveLine(id) {
        return this.instance.put(`purchaseOrders/lineItems/${id}/receive`);
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
        return this.instance.get('/locations/');
    }
    createLocationn(payload) {
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
    getAllSalesOrders() {
        return this.instance.get('/salesOrders');
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
}
exports.SoftLedgerAPI = SoftLedgerAPI;