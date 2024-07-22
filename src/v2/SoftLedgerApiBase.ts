import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AuthorizationType, Entity, NULL_LOGGER, Verb } from './types';
import * as t from '../types';
import _ = require('lodash');
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const DEFAULT_CHUNK_SIZE = 1000;

// Split the 'guts' of the SDK out here so that to implementing class is just a list of the
// endpoints that are implemented.
export abstract class SoftLedgerAPIBase {
	private instance: AxiosInstance;
	private authedInstancePromise: Promise<AxiosInstance>;
	private authorizationType: AuthorizationType;
	protected logger: t.SoftledgerConnectionLoggerInterface;
	private cache: t.SoftledgerConnectionCacheInterface;
	public token: string;

	constructor(private options: t.SoftledgerConnectionOptions) {
		this.logger = options.logger || NULL_LOGGER;
		this.cache = options.cache;
		this.authorizationType = _.isUndefined(options.auth0Options) ? AuthorizationType.MIDDLEWARE : AuthorizationType.AUTH0;
		this.instance = axios.create({ baseURL: this.options.url });
		this.instance.defaults.headers.common['Content-Type'] = 'application/json';

		if (_.isUndefined(this.options.refreshAuth) || this.options.refreshAuth === true) {
			createAuthRefreshInterceptor(this.instance, this.authenticate);
		}
	}

	// Get instance should be race condition safe since it awaits a singleton auth promise.
	// This allows lazy auth (If I build a Softledger SDK but never load data, I never auth)
	// But also prevent race conditions on auth. I.E. it ensures the following is safe
	//
	//    const sl = new SoftLedgerApi(...)
	//    Promise.all(sl.Vendor_find(), sl.Warehouse_find());
	//
	protected getInstance(): Promise<AxiosInstance> {
		return this.authedInstancePromise || this.authenticate();
	}

	private authenticate(useCache: boolean = false): Promise<AxiosInstance> {
		this.authedInstancePromise = (async () => {
			this.logger.debug('Updating Auth');
			this.token = await this.getToken(useCache);
			this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
			return this.instance;
		})();
		return this.authedInstancePromise;
	}

	private async getToken(useCache: boolean = false): Promise<string> {
		if (useCache && !!this.cache) {
			const token = await this.cache.get();
			if (!!token) return token;
		}

		const authData = await this.getNewAuth();
		if (!!this.cache) await this.cache.set(authData);

		return authData.access_token;
	}

	private async getNewAuth(): Promise<t.SoftledgerConnectionAuthResponse> {
		switch (this.authorizationType) {
			case AuthorizationType.AUTH0:
				return this.getNewAuthFromAuth0();
			case AuthorizationType.MIDDLEWARE:
				return this.getNewAuthFromAuthorizeEndpoint();
		}
	}

	private async getNewAuthFromAuth0(): Promise<t.SoftledgerConnectionAuthResponse> {
		return (await axios.post(this.options.authUrl, this.options.auth0Options))?.data;
	}

	private async getNewAuthFromAuthorizeEndpoint(): Promise<t.SoftledgerConnectionAuthResponse> {
		const access_token = (await axios.post(this.options.authUrl, { sessionId: this.options.stAuthToken }))?.data;
		return { access_token };
	}

	private logResponse(resp: AxiosResponse, code: number = 200, message: string = 'OK'): void {
		const { url, method, data, params } = resp?.config || {};
		this.logger.info(`${method} ${url} ${JSON.stringify(params)}: ${code} ${message}`);
		this.logger.debug({ url, method, data, params, responseData: resp.data, code, message });
	}

	private logError(err: AxiosError): void {
		const { url, method, data, params } = err?.config || {};
		const { status, statusText } = err?.response || {};
		this.logger.info(`${method} ${url} ${JSON.stringify(params)}: ${err.code} ${err.message}`);
		this.logger.debug({ url, method, data, params, responseData: null, status, statusText });
	}

	private async query<ReturnType>(cb: (ax: AxiosInstance) => Promise<AxiosResponse<ReturnType>>, options?: t.SoftLedgerSDKOptions): Promise<ReturnType> {
		try {
			const inst = await this.getInstance();
			const resp = await cb(inst);
			delete resp?.config?.headers?.Authorization;
			this.logResponse(resp);
			return resp.data;
		} catch (e) {
			if (!e.isAxiosError) throw e;

			if (options?.ifExists === true && e?.response?.status === 404) {
				this.logResponse(e.resp, 404, 'Not Found (ifExists = TRUE)');
				return null;
			}
			delete e?.response?.config?.headers?.Authorization;
			this.logError(e);
			throw _.pick(e.response, ['config.url', 'config.method', 'config.baseURL', 'config.data', 'status', 'statusText', 'data']);
		}
	}

	protected async getNoArgs<T>(entity: Entity, options: t.SoftLedgerSDKOptions): Promise<T> {
		return this.query<T>((i) => i.get(`/${entity}`), options);
	}

	protected async getOne<T>(entity: Entity, id: t.NumericId, options: t.SoftLedgerSDKOptions): Promise<T> {
		return this.query<T>((i) => i.get(`/${entity}/${id}`), options);
	}

	protected async getOneWithCustomType<T, U>(entity: Entity, id: U, options: t.SoftLedgerSDKOptions): Promise<T> {
		return this.query<T>((i) => i.get(`/${entity}/${id}`), options);
	}

	private async _getAll<T>(path: string, options: t.SoftledgerGetRequest<any> = { limit: 1000 }): Promise<Array<T>> {
		const data: Array<T> = [];
		while (true) {
			const page = await this.query<t.SoftledgerPage<T>>((i) => i.get(path, { params: SoftLedgerAPIBase.formatSearchOptions(options) }));
			data.push(...page.data);
			if (page.hasNextPage) {
				options.cursor = page.cursor;
			} else {
				return data;
			}
		}
	}

	protected getAll<T>(entity: Entity, options?: t.SoftledgerGetRequest<any>): Promise<Array<T>> {
		return this._getAll<T>(`/${entity}`, options);
	}

	protected async getAllSubEntity<T>(entity: Entity, subEntity: Entity, id: t.NumericId, options?: t.SoftledgerGetRequest<any>): Promise<Array<T>> {
		return this._getAll<T>(`/${entity}/${id}/${subEntity}`, options);
	}

	protected async delete<T>(entity: Entity, id: t.NumericId): Promise<void> {
		return this.query<void>((i) => i.delete(`/${entity}/${id}`));
	}

	protected async create<T, U>(entity: Entity, data: U): Promise<T> {
		return this.query<T>((i) => i.post(`/${entity}`, data));
	}

	protected async createSubEntity<T, U>(entity: Entity, verb: Verb, id: t.NumericId, data: U): Promise<T> {
		return this.query<T>((i) => i.post(`/${entity}/${id}/${verb}`, data));
	}

	protected async update<T, U>(entity: Entity, id: t.NumericId, data: U): Promise<T> {
		return this.query<T>((i) => i.put(`/${entity}/${id}`, data));
	}

	protected async do(entity: Entity, verb: Verb, id: t.NumericId): Promise<void> {
		return this.query<void>((i) => i.put(`/${entity}/${id}/${verb}`, {}));
	}

	protected async doWithData<T>(entity: Entity, verb: Verb, id: t.NumericId, data: T): Promise<void> {
		return this.query<void>((i) => i.put(`/${entity}/${id}/${verb}`, data));
	}

	protected async doWithId(entity: Entity, verb: Verb, id: t.NumericId, subId: t.NumericId): Promise<void> {
		return this.query<void>((i) => i.put(`/${entity}/${id}/${verb}/${subId}`, {}));
	}

	private static formatSearchOptions<T>(options?: t.SoftledgerGetRequest<T>): t.SoftledgerGetRequestFormatted<T> {
		return {
			...options,
			order: options?.order ? options.order.map((x) => `${x[0]}:${x[1]}`).join(',') : undefined,
		};
	}
}
