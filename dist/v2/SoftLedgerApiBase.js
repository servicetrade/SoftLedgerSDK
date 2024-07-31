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
exports.SoftLedgerAPIBase = exports.DEFAULT_CHUNK_SIZE = void 0;
const axios_1 = require('axios');
const types_1 = require('./types');
const _ = require('lodash');
const axios_auth_refresh_1 = require('axios-auth-refresh');
exports.DEFAULT_CHUNK_SIZE = 1000;
class SoftLedgerAPIBase {
	constructor(options) {
		this.options = options;
		this.logger = options.logger || types_1.NULL_LOGGER;
		this.cache = options.cache;
		this.authorizationType = _.isUndefined(options.auth0Options) ? types_1.AuthorizationType.MIDDLEWARE : types_1.AuthorizationType.AUTH0;
		this.instance = axios_1.default.create({ baseURL: this.options.url });
		this.instance.defaults.headers.common['Content-Type'] = 'application/json';
		if (_.isUndefined(this.options.refreshAuth) || this.options.refreshAuth === true) {
			(0, axios_auth_refresh_1.default)(this.instance, (failedRequest) =>
				__awaiter(this, void 0, void 0, function* () {
					return yield this.refreshAuth(failedRequest);
				})
			);
		}
	}
	getInstance() {
		if (!this.authedInstancePromise) {
			this.authedInstancePromise = this.buildPromise();
		}
		return this.authedInstancePromise;
	}
	refreshAuth(failedRequest) {
		return __awaiter(this, void 0, void 0, function* () {
			this.logger.debug('Refreshing Auth');
			this.token = yield this.getToken(false);
			this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
			failedRequest.response.config.headers['Authorization'] = `Bearer ${this.token}`;
		});
	}
	buildPromise() {
		return (() =>
			__awaiter(this, void 0, void 0, function* () {
				this.logger.debug('Initializing Auth');
				this.token = yield this.getToken(true);
				this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
				return this.instance;
			}))();
	}
	getToken(useCache) {
		return __awaiter(this, void 0, void 0, function* () {
			if (useCache && !!this.cache) {
				const token = yield this.cache.get();
				if (!!token) return token;
			}
			const authData = yield this.getNewAuth();
			if (!!this.cache) yield this.cache.set(authData);
			return authData.access_token;
		});
	}
	getNewAuth() {
		return __awaiter(this, void 0, void 0, function* () {
			switch (this.authorizationType) {
				case types_1.AuthorizationType.AUTH0:
					return this.getNewAuthFromAuth0();
				case types_1.AuthorizationType.MIDDLEWARE:
					return this.getNewAuthFromAuthorizeEndpoint();
			}
		});
	}
	getNewAuthFromAuth0() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			return (_a = yield axios_1.default.post(this.options.authUrl, this.options.auth0Options)) === null || _a === void 0 ? void 0 : _a.data;
		});
	}
	getNewAuthFromAuthorizeEndpoint() {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			const access_token = (_a = yield axios_1.default.post(this.options.authUrl, { sessionId: this.options.stAuthToken })) === null || _a === void 0 ? void 0 : _a.data;
			return { access_token };
		});
	}
	logResponse(resp, code = 200, message = 'OK') {
		const { url, method, data, params } = (resp === null || resp === void 0 ? void 0 : resp.config) || {};
		this.logger.info(`${method} ${url} ${JSON.stringify(params)}: ${code} ${message}`);
		this.logger.debug({ url, method, data, params, responseData: resp === null || resp === void 0 ? void 0 : resp.data, code, message });
	}
	logError(err) {
		const { url, method, data, params } = (err === null || err === void 0 ? void 0 : err.config) || {};
		const { status, statusText } = (err === null || err === void 0 ? void 0 : err.response) || {};
		this.logger.info(`${method} ${url} ${JSON.stringify(params)}: ${err.code} ${err.message}`);
		this.logger.debug({ url, method, data, params, responseData: null, status, statusText });
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
				if (!e.isAxiosError) throw e;
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
				throw _.pick(e.response, ['config.url', 'config.method', 'config.baseURL', 'config.data', 'status', 'statusText', 'data']);
			}
		});
	}
	getNoArgs(entity, options) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.get(`/${entity}`), options);
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
			const data = [];
			while (true) {
				const page = yield this.query((i) => i.get(path, { params: SoftLedgerAPIBase.formatSearchOptions(options) }));
				data.push(...page.data);
				if (page.hasNextPage) {
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
			return this.query((i) => i.post(`/${entity}`, data));
		});
	}
	createSubEntity(entity, verb, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.post(`/${entity}/${id}/${verb}`, data));
		});
	}
	update(entity, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}`, data));
		});
	}
	do(entity, verb, id) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}/${verb}`, {}));
		});
	}
	doWithData(entity, verb, id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}/${verb}`, data));
		});
	}
	doWithId(entity, verb, id, subId) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.query((i) => i.put(`/${entity}/${id}/${verb}/${subId}`, {}));
		});
	}
	static formatSearchOptions(options) {
		return Object.assign(Object.assign({}, options), {
			limit: 1000,
			order: (options === null || options === void 0 ? void 0 : options.order) ? options.order.map((x) => `${x[0]}:${x[1]}`).join(',') : undefined,
		});
	}
}
exports.SoftLedgerAPIBase = SoftLedgerAPIBase;
