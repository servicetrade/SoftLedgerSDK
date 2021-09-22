import axios, {AxiosResponse} from "axios";
import MockAdapter from "axios-mock-adapter";
import {AUTH_URL, SoftLedgerAPI} from '../SoftLedgerAPI';
import {createAddressRequestMock} from './mocks/createAddressRequest.mock';
import {authResponseMock} from "./mocks/authResponse.mock";
import {address} from "./mocks/address.mock";
import {Address} from "../types/addresses/Address";
import {ListResponse} from "../types/ListResponse";
import {Item} from "../types/items/Item";
import {CreateItemRequest} from "../types/items/CreateItemRequest";
import {item} from "./mocks/item";
import {createItemRequest} from "./mocks/createItemRequest";
import {Job} from "../types/jobs/Job";
import {job} from "./mocks/job";
import {createJobRequest} from "./mocks/createJobRequest";


const BASE_URL = '';

describe('SoftLedgerAPI', () => {
    let mock: MockAdapter;
    let softLedgerAPI: SoftLedgerAPI = null;
    beforeAll(async () => {
        mock = new MockAdapter(axios);
        mock.onPost(AUTH_URL).reply(200, authResponseMock);
        softLedgerAPI = await SoftLedgerAPI.build({baseURL: BASE_URL});

    });

    afterEach(() => {
        mock.reset();
    });
    it('create address', async () => {
        mock.onPost(`${BASE_URL}/addresses`).reply<Address>(201, address);
        const result: AxiosResponse<Address> = await softLedgerAPI.createAddress(createAddressRequestMock);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(address);
    });
    it('get all addresses', async () => {
        mock.onGet(`${BASE_URL}/addresses`).reply<ListResponse<Address>>(200, {totalItems: 1, data: [address]});
        const result = await softLedgerAPI.getAllAddresses();
        expect(result.status).toBe(200);
        expect(Array.isArray(result.data.data)).toBeTruthy();
        expect(result.data.data[0]).toEqual(address);
    });
    it('get one address', async () => {
        mock.onGet(`${BASE_URL}/addresses/${1}`).reply<Address>(200, address);
        const result = await softLedgerAPI.getOneAddress(1);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(address);
    })
    it('update address', async () => {
       mock.onPut(`${BASE_URL}/addresses/${1}`).reply<Address>(201, address);
        const result = await softLedgerAPI.updateAddress(1, createAddressRequestMock);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(address);
    });
    it('delete address', async () => {
        mock.onDelete(`${BASE_URL}/addresses/${1}`).reply<void>(204);
        const result = await softLedgerAPI.deleteAddress(1);
        expect(result.status).toBe(204);
    });
    it('get all items', async () => {
        mock.onGet(`${BASE_URL}/items`).reply<ListResponse<Item>>(200, {totalItems: 1, data: [item]});
        const result = await softLedgerAPI.getAllItems();
        expect(result.status).toBe(200);
        expect(Array.isArray(result.data.data)).toBeTruthy();
        expect(result.data.data[0]).toEqual(item);
    });
    it('create item', async () => {
        mock.onPost(`${BASE_URL}/items`).reply<Item>(201, item);
        const result = await softLedgerAPI.createItem(createItemRequest);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(item);
    });
    it('get one item', async () => {
        mock.onGet(`${BASE_URL}/items/${1}`).reply<Item>(200, item);
        const result = await softLedgerAPI.getOneItem(1);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(item);
    });
    it('update item', async () => {
        mock.onPut(`${BASE_URL}/items/${1}`).reply<Item>(201, item);
        const result = await softLedgerAPI.updateItem(1, createItemRequest);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(item);
    });
    it('delete item', async () => {
        mock.onDelete(`${BASE_URL}/items/${1}`).reply<void>(204);
        const result = await softLedgerAPI.deleteItem(1);
        expect(result.status).toBe(204);
    });
    it('get all jobs', async () => {
        mock.onGet(`${BASE_URL}/jobs`).reply<ListResponse<Job>>(200, {totalItems: 1, data: [job]});
        const result = await softLedgerAPI.getAllJobs();
        expect(result.status).toBe(200);
        expect(Array.isArray(result.data.data)).toBeTruthy();
        expect(result.data.data[0]).toEqual(job);
    });
    it('create job', async () => {
        mock.onPost(`${BASE_URL}/jobs`).reply<Job>(201, job);
        const result = await softLedgerAPI.createJob(createJobRequest);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(job);
    });
    it('get one job', async () => {
        mock.onGet(`${BASE_URL}/jobs/${1}`).reply<Job>(200, job);
        const result = await softLedgerAPI.getOneJob(1);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(job);
    });
    it('update job', async () => {
        mock.onPut(`${BASE_URL}/jobs/${1}`).reply<Job>(201, job);
        const result = await softLedgerAPI.updateJob(1, createJobRequest);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(job);
    });
    it('delete job', async () => {
        mock.onDelete(`${BASE_URL}/jobs/${1}`).reply<void>(204);
        const result = await softLedgerAPI.deleteJob(1);
        expect(result.status).toBe(204);
    });
})