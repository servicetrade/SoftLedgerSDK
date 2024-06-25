import { OrderStatus } from './OrderStatus';
import { CreateSalesOrderLineRequest } from './SalesOrderLineItemRequest';

type _SalesOrderRequest = {
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
	customFields?: { [key: string]: string };
	SOLineItems: [];
};

export type CreateSalesOrderRequest = {
	LocationId: number;
	currency: string;
	SOLineItems: CreateSalesOrderLineRequest[];
} & _SalesOrderRequest;

export type UpdateSalesOrderRequest = {
	LocationId: number;
	currency: string;
} & _SalesOrderRequest;
