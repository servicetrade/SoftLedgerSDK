import { NumericId } from './NumericId';
export interface SoftledgerConnectionCacheInterface {
	set: (authData: SoftledgerConnectionAuthResponse) => Promise<void>;
	get: () => Promise<string>;
}
export declare type SoftledgerConnectionAuthResponse = {
	access_token: string;
	scope?: string;
	expires_in?: number;
	token_type?: string;
};
export interface SoftledgerConnectionLoggerInterface {
	debug: (data: any) => any;
	info: (data: any) => any;
	verbose: (data: any) => any;
	warn: (data: any) => any;
	error: (data: any) => any;
}
export declare type SoftledgerConnectionOptions = {
	auth0Options?: {
		grant_type: 'client_credentials';
		tenantUUID: string;
		audience: string;
		client_id: string;
		client_secret: string;
	};
	stAuthToken?: string;
	url: string;
	authUrl: string;
	refreshAuth?: boolean;
	cache?: SoftledgerConnectionCacheInterface;
	logger?: SoftledgerConnectionLoggerInterface;
};
export interface SoftledgerPage<T> {
	hasNextPage: boolean;
	cursor: string;
	data: Array<T>;
}
export declare type SoftledgerGetFilterType = 'all' | 'any';
export declare type SoftledgerOrder = Array<[string, 'ASC' | 'DESC']>;
export interface SoftledgerGetRequestBase<T> {
	filter?: Partial<T>;
	filterType?: SoftledgerGetFilterType;
	limit?: number;
	cursor?: string;
	LocationId?: NumericId;
}
export interface SoftledgerGetRequest<T> extends SoftledgerGetRequestBase<T> {
	order?: SoftledgerOrder;
}
export interface SoftledgerGetRequestFormatted<T> extends SoftledgerGetRequestBase<T> {
	order?: string;
	limit?: number;
}
export declare type SoftLedgerSDKOptions = {
	ifExists: boolean;
};
export declare enum SoftLedgerEntityType {
	AccountingYear = 'AccountingYear',
	Address = 'Address',
	Bill = 'Bill',
	Contact = 'Contact',
	CustomField = 'CustomField',
	Item = 'Item',
	LedgerAccount = 'LedgerAccount',
	Location = 'Location',
	PartNumber = 'PartNumber',
	POLineItem = 'POLineItem',
	PurchaseOrder = 'PurchaseOrder',
	SalesOrder = 'SalesOrder',
	SalesOrderSync = 'SalesOrderSync',
	Settings = 'Settings',
	ShipmentReceipt = 'ShipmentReceipt',
	ShipmentReceiptLine = 'ShipmentReceiptLine',
	SOLineItem = 'SOLineItem',
	StockAdjustment = 'StockAdjustment',
	StockCount = 'StockCount',
	SystemJob = 'SystemJob',
	Template = 'Template',
	Transfer = 'Transfer',
	User = 'User',
	Vendor = 'Vendor',
	VendorPrice = 'VendorPrice',
	Warehouse = 'Warehouse',
	WarehouseItem = 'WarehouseItem',
}
export declare enum SoftLedgerAction {
	CREATE = 'CREATE',
	UPDATED = 'UPDATED',
	UPDATE = 'UPDATE',
	FULFILL = 'FULFILL',
	UNFULFILL = 'UNFULFILL',
	DELETED = 'DELETED',
	DELETE = 'DELETE',
	VOID = 'VOID',
}
