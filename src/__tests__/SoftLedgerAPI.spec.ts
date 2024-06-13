import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AUTH_URL, DEFAULT_GET_LIMIT, SoftLedgerAPI } from '../SoftLedgerAPI';
import { createAddressRequestMock } from './mocks/createAddressRequest.mock';
import { authResponseMock } from './mocks/authResponse.mock';
import { address } from './mocks/address.mock';
import { Address } from '../types/addresses/Address';
import { ListResponse } from '../types/ListResponse';
import { Item } from '../types/items/Item';
import { item } from './mocks/item';
import { createItemRequest } from './mocks/createItemRequest';
import { Job } from '../types/jobs/Job';
import { job } from './mocks/job';
import { createJobRequest } from './mocks/createJobRequest';
import { PurchaseOrder } from '../types/purchaseOrders/PurchaseOrder';
import { LineItem } from '../types/purchaseOrders/LineItem';
import { ReceiveLineResponse } from '../types/purchaseOrders/ReceiveLineResponse';
import { purchaseOrder } from './mocks/purchaseOrder';
import { createPurchaseOrderRequest } from './mocks/createPurchaseOrderRequest';
import { lineItem } from './mocks/lineItem';
import { receiveLineRequest } from './mocks/receiveLineRequest';
import { receiveLineResponse } from './mocks/receiveLineResponse';
import { Warehouse } from '../types/warehouses/Warehouse';
import { warehouse } from './mocks/warehouse';
import { createWarehouseRequest } from './mocks/createWarehouseRequest';
import { LocationAccount } from '../types/locations/LocationAccount';
import { Location } from '../types/locations/Location';
import { location } from './mocks/location';
import { createLocationRequest } from './mocks/createLocationRequest';
import { locationAccount } from './mocks/locationAccount';
import { SalesOrder } from '../types/salesOrders/SalesOrder';
import { salesOrder } from './mocks/salesOrder';
import { createSalesOrderRequest } from './mocks/createSalesOrderRequest';
import { fulFillLineRequest } from './mocks/fulFillLineRequest';
import { Vendor } from '../types/vendors/Vendor';
import { vendor } from './mocks/vendor';
import { createVendorRequest } from './mocks/createVendorRequest';
import { createCustomer } from './mocks/createCustomer';
import { startingPoNumber } from './mocks/startingPoNumber';
import { updateSalesOrderRequest } from './mocks/updateSalesOrderRequest';

const BASE_URL = '';

// Generate a mock paged result list with an arbitrary number of elements. Uses
// the page size set at the library level.
function mockChunks(mock: MockAdapter, endpoint: string, numberOfElements: number, itemGenerator: (index: number) => any, params: object = {}) {
	let numberOfChunks = Math.ceil(numberOfElements / DEFAULT_GET_LIMIT);

	for (let i = 0; i < numberOfChunks; i++) {
		let itemsRemaining = numberOfElements - i * DEFAULT_GET_LIMIT;
		let currentChunkSize = Math.min(itemsRemaining, DEFAULT_GET_LIMIT);

		let data = Array.from(new Array(currentChunkSize), (_, j) => {
			return itemGenerator(j + i * DEFAULT_GET_LIMIT);
		});

		mock.onGet(endpoint, {
			params: {
				...params,
				limit: DEFAULT_GET_LIMIT,
				offset: i * DEFAULT_GET_LIMIT,
			},
		}).reply<ListResponse<any>>(200, {
			totalItems: numberOfElements,
			data: data,
		});
	}
}

describe('SoftLedgerAPI', () => {
	let mock: MockAdapter;
	let softLedgerAPI: SoftLedgerAPI = null;
	beforeAll(async () => {
		mock = new MockAdapter(axios);
		mock.onPost(AUTH_URL).reply(200, authResponseMock);
		softLedgerAPI = await SoftLedgerAPI.build({ baseURL: BASE_URL });
	});

	afterEach(() => {
		mock.reset();
	});

	describe('Paging Tests', () => {
		function createAddressAtIndex(index: number) {
			return { ...address, label: `${index}` };
		}

		it('Get All', async () => {
			mockChunks(mock, `${BASE_URL}/addresses`, 2000, createAddressAtIndex);

			const result = await softLedgerAPI.getAllAddresses();

			expect(result.status).toBe(200);
			expect(mock.history.get.length).toBe(4);
			expect(result.data.data.length).toBe(2000);
		});

		it('Sanity Check - fewer items then expected', async () => {
			mock.onGet(`${BASE_URL}/addresses`, {
				params: { limit: DEFAULT_GET_LIMIT, offset: 0 },
			}).reply<ListResponse<any>>(200, {
				totalItems: 1500,
				data: new Array(250).fill(address),
			});

			expect.assertions(1);
			return softLedgerAPI.getAllAddresses().catch((e) => {
				expect(e).toEqual('Unexpectedly received too little data in chunk');
			});
		});

		it('Sanity Check - mid-load error is propagated out', async () => {
			mock.onGet(`${BASE_URL}/addresses`, {
				params: { limit: DEFAULT_GET_LIMIT, offset: 0 },
			}).reply<ListResponse<any>>(200, {
				totalItems: 1500,
				data: new Array(500).fill(address),
			});

			mock.onGet(`${BASE_URL}/addresses`, {
				params: { limit: DEFAULT_GET_LIMIT, offset: 500 },
			}).reply<ListResponse<any>>(500);

			expect.assertions(1);
			return softLedgerAPI.getAllAddresses().catch((e) => {
				expect(e.response.status).toEqual(500);
			});
		});
	});

	describe('Addresses', () => {
		it('create address', async () => {
			mock.onPost(`${BASE_URL}/addresses`).reply<Address>(201, address);
			const result: AxiosResponse<Address> = await softLedgerAPI.createAddress(createAddressRequestMock);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(address);
		});
		it('get all addresses', async () => {
			mock.onGet(`${BASE_URL}/addresses`, {}).reply<ListResponse<Address>>(200, {
				totalItems: 50,
				data: new Array(50).fill(address),
			});

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
		});
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
	});

	describe('Items', () => {
		it('get all items', async () => {
			mock.onGet(`${BASE_URL}/items`).reply<ListResponse<Item>>(200, {
				totalItems: 1,
				data: [item],
			});
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
	});

	describe('Jobs', () => {
		it('get all jobs', async () => {
			mock.onGet(`${BASE_URL}/jobs`).reply<ListResponse<Job>>(200, {
				totalItems: 1,
				data: [job],
			});
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
	});

	describe('POs', () => {
		it('get all PO', async () => {
			mock.onGet(`${BASE_URL}/purchaseOrders`).reply<ListResponse<PurchaseOrder>>(200, {
				totalItems: 1,
				data: [purchaseOrder],
			});
			const result = await softLedgerAPI.getAllPurchaseOrders();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(purchaseOrder);
		});
		it('create PO', async () => {
			mock.onPost(`${BASE_URL}/purchaseOrders`).reply<PurchaseOrder>(201, purchaseOrder);
			const result = await softLedgerAPI.createPurchaseOrder(createPurchaseOrderRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(purchaseOrder);
		});
		it('get all line items', async () => {
			mock.onGet(`${BASE_URL}/purchaseOrders/lineItems`).reply<ListResponse<LineItem>>(200, {
				totalItems: 1,
				data: [lineItem],
			});
			const result = await softLedgerAPI.getPOAllLineItems();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(lineItem);
		});
		it('get po line items', async () => {
			mock.onGet(`${BASE_URL}/purchaseOrders/${1}/lineItems`).reply<LineItem[]>(200, [lineItem]);
			const result = await softLedgerAPI.getPOLineItems(1);
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data)).toBeTruthy();
			expect(result.data[0]).toEqual(lineItem);
		});
		it('receive line', async () => {
			mock.onPut(`${BASE_URL}/purchaseOrders/lineItems/${1}/receive`).reply<ReceiveLineResponse>(200, receiveLineResponse);
			const result = await softLedgerAPI.receiveLine(1, receiveLineRequest);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(receiveLineResponse);
		});
		it('get one PO', async () => {
			mock.onGet(`${BASE_URL}/purchaseOrders/${1}`).reply<PurchaseOrder>(200, purchaseOrder);
			const result = await softLedgerAPI.getOnePurchaseOrder(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(purchaseOrder);
		});
		it('update PO', async () => {
			mock.onPut(`${BASE_URL}/purchaseOrders/${1}`).reply<PurchaseOrder>(200, purchaseOrder);
			const result = await softLedgerAPI.updatePurchaseOrder(1, createPurchaseOrderRequest);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(purchaseOrder);
		});
		it('issue PO', async () => {
			mock.onPut(`${BASE_URL}/purchaseOrders/${1}/issue`).reply<{ status: 'issued' }>(200, {
				status: 'issued',
			});
			const result = await softLedgerAPI.issuePurchaseOrder(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual({ status: 'issued' });
		});
		it('email PO', async () => {
			mock.onPut(`${BASE_URL}/purchaseOrders/${1}/email`).reply<void>(200);
			const result = await softLedgerAPI.emailPurchaseOrder(1);
			expect(result.status).toBe(200);
		});
		it('unissue PO', async () => {
			mock.onPut(`${BASE_URL}/purchaseOrders/${1}/unissue`).reply<{ status: 'created' }>(200, {
				status: 'created',
			});
			const result = await softLedgerAPI.unissuePurchaseOrder(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual({ status: 'created' });
		});
		it('delete PO', async () => {
			mock.onDelete(`${BASE_URL}/purchaseOrders/${1}`).reply<void>(204);
			const result = await softLedgerAPI.deletePurchaseOrder(1);
			expect(result.status).toBe(204);
		});
	});

	describe('Warehouses', () => {
		it('get all warehouses', async () => {
			mock.onGet(`${BASE_URL}/warehouses`).reply<ListResponse<Warehouse>>(200, {
				totalItems: 1,
				data: [warehouse],
			});
			const result = await softLedgerAPI.getAllWarehouses();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(warehouse);
		});
		it('create warehouse', async () => {
			mock.onPost(`${BASE_URL}/warehouses`).reply<Warehouse>(201, warehouse);
			const result = await softLedgerAPI.createWarehouse(createWarehouseRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(warehouse);
		});
		it('get one warehouse', async () => {
			mock.onGet(`${BASE_URL}/warehouses/${1}`).reply<Warehouse>(200, warehouse);
			const result = await softLedgerAPI.getOneWarehouse(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(warehouse);
		});
		it('update Warehouse', async () => {
			mock.onPut(`${BASE_URL}/warehouses/${1}`).reply<Warehouse>(201, warehouse);
			const result = await softLedgerAPI.updateWarehouse(1, createWarehouseRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(warehouse);
		});
		it('get one warehouse', async () => {
			mock.onDelete(`${BASE_URL}/warehouses/${1}`).reply<void>(204);
			const result = await softLedgerAPI.deleteWarehouse(1);
			expect(result.status).toBe(204);
		});
	});

	describe('Locations', () => {
		it('get all locations', async () => {
			mock.onGet(`${BASE_URL}/locations`).reply<ListResponse<Location>>(200, {
				totalItems: 1,
				data: [location],
			});
			const result = await softLedgerAPI.getAllLocations();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(location);
		});
		it('create location', async () => {
			mock.onPost(`${BASE_URL}/locations`).reply<Location>(201, location);
			const result = await softLedgerAPI.createLocation(createLocationRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(location);
		});
		it('distinct currencies', async () => {
			mock.onGet(`${BASE_URL}/locations/currencies`).reply<string[]>(200, ['currency']);
			const result = await softLedgerAPI.distinctCurrencies();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data)).toBeTruthy();
			expect(result.data[0]).toEqual('currency');
		});
		it('get location accounts', async () => {
			mock.onGet(`${BASE_URL}/locations/${1}/accounts`).reply<ListResponse<LocationAccount>>(200, {
				totalItems: 1,
				data: [locationAccount],
			});
			const result = await softLedgerAPI.getLocationAccounts(1);
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(locationAccount);
		});
		it('user location tree', async () => {
			mock.onGet(`${BASE_URL}/locations/me`).reply<Location>(200, location);
			const result = await softLedgerAPI.userLocationTree();
			expect(result.status).toBe(200);
			expect(result.data).toEqual(location);
		});
		it('get one location', async () => {
			mock.onGet(`${BASE_URL}/locations/${1}`).reply<Location>(200, location);
			const result = await softLedgerAPI.getOneLocation(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(location);
		});
		it('update location', async () => {
			mock.onPut(`${BASE_URL}/locations/${1}`).reply<Location>(201, location);
			const result = await softLedgerAPI.updateLocation(1, createLocationRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(location);
		});
		it('delete location', async () => {
			mock.onDelete(`${BASE_URL}/locations/${1}`).reply<Location>(204);
			const result = await softLedgerAPI.deleteLocation(1);
			expect(result.status).toBe(204);
		});
		it('location descendents', async () => {
			mock.onGet(`${BASE_URL}/locations/${1}/descendents`).reply<Location[]>(200, [location]);
			const result = await softLedgerAPI.locationDescendents(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual([location]);
		});
	});

	describe('Sales Orders', () => {
		it('get all sales orders', async () => {
			mock.onGet(`${BASE_URL}/salesOrders`).reply<ListResponse<SalesOrder>>(200, {
				totalItems: 1,
				data: [salesOrder],
			});
			const result = await softLedgerAPI.getAllSalesOrders();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(salesOrder);
		});
		it('create sales order', async () => {
			mock.onPost(`${BASE_URL}/salesOrders`).reply<SalesOrder>(201, salesOrder);
			const result = await softLedgerAPI.createSalesOrder(createSalesOrderRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(salesOrder);
		});
		it('get SO all line items', async () => {
			mock.onGet(`${BASE_URL}/salesOrders/lineItems`).reply<ListResponse<LineItem>>(200, {
				totalItems: 1,
				data: [lineItem],
			});
			const result = await softLedgerAPI.getSOAllLineItems();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(lineItem);
		});
		it('fulfill line', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/lineItems/${1}/fulfill`).reply<void>(200);
			const result = await softLedgerAPI.fulfillLine(1, fulFillLineRequest);
			expect(result.status).toBe(200);
		});
		it('get one sales order', async () => {
			mock.onGet(`${BASE_URL}/salesOrders/${1}`).reply<SalesOrder>(200, salesOrder);
			const result = await softLedgerAPI.getOneSalesOrder(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(salesOrder);
		});
		it('update sales order', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/${1}`).reply<SalesOrder>(200, salesOrder);
			const result = await softLedgerAPI.updateSalesOrder(1, updateSalesOrderRequest);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(salesOrder);
		});
		it('delete sales order', async () => {
			mock.onDelete(`${BASE_URL}/salesOrders/${1}`).reply<void>(204);
			const result = await softLedgerAPI.deleteSalesOrder(1);
			expect(result.status).toBe(204);
		});
		it('issue sales order', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/${1}/issueQuote`).reply<void>(200);
			const result = await softLedgerAPI.issueSalesOrder(1);
			expect(result.status).toBe(200);
		});
		it('email sales order', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/${1}/email`).reply<void>(200);
			const result = await softLedgerAPI.emailSalesOrder(1);
			expect(result.status).toBe(200);
		});
		it('accept sales order', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/${1}/acceptQuote`).reply<void>(200);
			const result = await softLedgerAPI.acceptSalesOrder(1);
			expect(result.status).toBe(200);
		});
		it('reject sales order', async () => {
			mock.onPut(`${BASE_URL}/salesOrders/${1}/rejectQuote`).reply<void>(200);
			const result = await softLedgerAPI.rejectSalesOrder(1);
			expect(result.status).toBe(200);
		});
	});

	describe('Vendors', () => {
		it('get all vendors', async () => {
			mock.onGet(`${BASE_URL}/vendors`).reply<ListResponse<Vendor>>(200, {
				totalItems: 1,
				data: [vendor],
			});
			const result = await softLedgerAPI.getAllVendors();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(vendor);
		});
		it('create vendor', async () => {
			mock.onPost(`${BASE_URL}/vendors`).reply<Vendor>(201, vendor);
			const result = await softLedgerAPI.createVendor(createVendorRequest);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(vendor);
		});
	});

	describe('Customers', () => {
		it('get all customers', async () => {
			mock.onGet(`${BASE_URL}/customers`).reply<ListResponse<Location>>(200, {
				totalItems: 1,
				data: [location],
			});
			const result = await softLedgerAPI.getAllCustomers();
			expect(result.status).toBe(200);
			expect(Array.isArray(result.data.data)).toBeTruthy();
			expect(result.data.data[0]).toEqual(location);
		});
		it('get customer 1', async () => {
			mock.onGet(`${BASE_URL}/customers/${1}`).reply<Location>(200, location);
			const result = await softLedgerAPI.getCustomer(1);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(location);
		});
		it('create customer', async () => {
			mock.onPost(`${BASE_URL}/customers`).reply<Location>(201, location);
			const result = await softLedgerAPI.createCustomer(createCustomer);
			expect(result.status).toBe(201);
			expect(result.data).toEqual(location);
		});
		// it('update customer 1', async () => {
		//     mock.onPut(`${BASE_URL}/customers/${1}`).reply<Location>(201, location);
		//     const result = await softLedgerAPI.updateCustomer(Х);
		//     expect(result.status).toBe(201);
		//     expect(result.data).toEqual(location);
		// });
	});

	describe('System', () => {
		it('sets starting po number', async () => {
			mock.onPut(`${BASE_URL}/settings/sequence`).reply(200);
			const result = await softLedgerAPI.setStartingDocumentNumber(startingPoNumber);
			expect(result.status).toBe(200);
		});
	});
});
