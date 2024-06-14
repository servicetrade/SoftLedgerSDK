import { OrderStatus } from './OrderStatus';
export declare type CreateSalesOrderRequest = {
	LocationId: number;
	currency: string;
	externalId?: string;
	status: OrderStatus.QUOTE | OrderStatus.ORDER;
	quoteDate?: string;
	quoteExpiration?: string;
	orderDate?: string;
	deliveryDate?: string;
	ICLocationId?: number;
	CustomerId?: number;
	ShippingAddressId?: number;
	BillingAddressId?: number;
	attachments?: string[];
	TemplateId?: number;
	reference?: string;
	externalRef?: string;
	notes?: string;
	customFields?: {
		[key: string]: string;
	};
	SOLineItems: CreateSalesOrderLineRequest[];
};
export declare type CreateSalesOrderLineRequest = {
	idx?: number;
	externalId?: string;
	description?: string;
	amount?: string;
	quantity?: string;
	taxAmount?: string;
	TaxCodeId?: number;
	TaxCode?: {
		code: string;
	};
	ItemId?: number;
	Item?: {
		number: string;
	};
	CostCenterId?: number;
	CostCenter?: {
		id: string;
	};
	JobId?: number;
	Job?: {
		id: string;
	};
	ProductId?: number;
	Product?: {
		id: string;
	};
	Custom1Id?: number;
	Custom1?: {
		id: string;
	};
	Custom2Id?: number;
	Custom2?: {
		id: string;
	};
	Custom3Id?: number;
	Custom3?: {
		id: string;
	};
};
