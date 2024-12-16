import { OrderStatus } from './OrderStatus';
import { CreateSalesOrderLineRequest } from './SalesOrderLineItemRequest';
export interface UpdateSalesOrderRequest {
	LocationId?: number;
	currency?: string;
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
	customFields?: Record<string, string>;
	stOffice?: string;
	stCustomer?: string;
	stCustomerAddress?: string;
}
export interface CreateSalesOrderRequest extends UpdateSalesOrderRequest {
	LocationId: number;
	currency: string;
	SOLineItems: CreateSalesOrderLineRequest[];
}
