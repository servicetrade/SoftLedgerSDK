import axios, {AxiosInstance} from 'axios';
import {Address} from './types/addresses/Address';
import {Item} from './types/items/Item';
import {CreateItemRequest} from './types/items/CreateItemRequest';
import {ListResponse} from './types/ListResponse';
import {Job} from './types/jobs/Job';
import {CreateJobRequest} from './types/jobs/CreateJobRequest';

const AUTH_URL = 'https://auth.accounting-auth.com/oauth/token';

const GRAND_TYPE = 'client_credentials';
const TENANT_UUID = '300fccd3-dd05-4f68-b48b-df40adccd01c';
const AUDIENCE = 'https://sl-sb.softledger.com';
const CLIENT_ID = '6u6eM7jtGwArxYmMet767Rtq4oGuwYcu';
const CLIENT_SECRET = 'ctPIZfGxZeVgbMxS1qCXD7bzSakdFHt3meVADHI4RIgEZ5Is2KSOagDYm-9m-D-c';

const SANDBOX_URL = 'https://sb-api.softledger.com/api';
const BASE_URL = 'https://api.softledger.com/api';

type Config = {
    grant_type: string;
    tenantUUID: string;
    audience: string;
    client_id: string;
    client_secret: string;
    baseURL: string;
}

type AUTH_Response = {
    "access_token": string;
    "scope": string;
    "expires_in": number;
    "token_type": string;
}
export class SoftLedgerAPI {
    private instance: AxiosInstance;
    private constructor(accessToken: string, private baseURL: string) {
        this.instance = axios.create({baseURL});
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        this.instance.defaults.headers.common['Content-Type'] = 'application/json';
    }

    public static build(
                 grant_type = GRAND_TYPE,
                 tenantUUID = TENANT_UUID,
                 audience = AUDIENCE,
                 client_id = CLIENT_ID,
                 client_secret = CLIENT_SECRET,
                 baseURL = SANDBOX_URL,
                 ) {
        return axios.post<AUTH_Response>(AUTH_URL, {
            grant_type,
            tenantUUID,
            audience,
            client_id,
            client_secret,
        }).then((response) => {
            const {access_token} = response.data;

            return new SoftLedgerAPI(access_token, baseURL);
        })
    }

    getAddresses(): Promise<ListResponse<Address>> {
        return this.instance.get(`/addresses`);
    }

    // createAddress(payload: CreateAddressRequest): Promise<Address> {
    //     return axios.post('/addresses');
    // }
    //
    // getAddress(id: number): Promise<Address> {
    //     return axios.get(`/addresses/${id}`);
    // }
    //
    // updateAddress(id: number, payload: Address): Promise<Address> {
    //     return axios.put(`/addresses/${id}`, payload);
    // }
    //
    // deleteAddress(id: number): Promise<void> {
    //     return axios.delete(`/addresses/${id}`);
    // }

    getItems(): Promise<ListResponse<Item>> {
        return this.instance.get('/items');
    }

    createItem(payload: CreateItemRequest): Promise<Item> {
        return this.instance.post('/items');
    }

    getItem(id: number): Promise<Item> {
        return this.instance.get(`/items${id}`);
    }

    updateItem(id: number, payload: CreateItemRequest): Promise<Item> {
        return this.instance.put(`/items${id}`, payload);
    }

    deleteItem(id: number): Promise<void> {
        return this.instance.delete(`/items${id}`);
    }

    getJobs(): Promise<ListResponse<Job>> {
        return this.instance.get('/jobs');
    }

    createJob(payload: CreateJobRequest): Promise<Job> {
        return this.instance.post('/jobs');
    }

    getJob(id: number): Promise<Job> {
        return this.instance.get(`/jobs${id}`);
    }

    updateJob(id: number, payload: CreateJobRequest): Promise<Job> {
        return this.instance.put(`/jobs${id}`, payload);
    }

    deleteJob(id: number): Promise<void> {
        return this.instance.delete(`/jobs${id}`);
    }
}