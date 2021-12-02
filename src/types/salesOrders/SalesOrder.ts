import { Location } from '../locations/Location';
import { OrderStatus } from './OrderStatus';
import { Agent } from '../Agent';

export type SalesOrderLineItem = {
	_id: number;
	idx: number;
	description: string;
	amount: number;
	quantity: string;
	quantityFulFilled: number;
	taxAmount: number;
	SalesOrderId: number;
	ItemId?: number;
	CostcenterId: number;
	KitId: number;
	JobId?: number;
	ProductId: number;
	TaxCodeId: number;
};

export type SalesOrder = {
	_id: number;
	externalId: string;
	number: string;
	status: OrderStatus;
	notes: string;
	amount: string;
	quoteDate: string;
	quoteExpiration: string;
	orderDate: string;
	deliveryDate: string;
	currency: string;
	attachments: string[];
	approved_on: string;
	approved_name: string;
	approved_email: string;
	reference: string;
	LocationId: number;
	ICLocationId: number;
	AgentId: number;
	ShippingAddressId: number;
	BillingAddressId: number;
	TemplateId: number;
	Agent: Agent;
	Location: Location;
	SOLineItems: SalesOrderLineItem[];
};
