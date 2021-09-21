import axios, {AxiosResponse} from "axios";
import MockAdapter from "axios-mock-adapter";
import {AUTH_URL, SoftLedgerAPI} from '../SoftLedgerAPI';
import {createAddressRequestMock} from './mocks/createAddressRequest.mock';
import {authResponseMock} from "./mocks/authResponse.mock";
import {address} from "./mocks/address.mock";
import {Address} from "../types/addresses/Address";


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
        mock.onPost(`${BASE_URL}/addresses`).reply(201, address);
        const result: AxiosResponse<Address> = await softLedgerAPI.createAddress(createAddressRequestMock);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(address);
    });
    it('get all addresses', async () => {
        mock.onGet(`${BASE_URL}/addresses`).reply(200, [address]);
        const result = await softLedgerAPI.getAllAddresses();
        expect.result.s
    });
})