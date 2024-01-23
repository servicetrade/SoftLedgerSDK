import { Location } from '../locations/Location';
import { OrderStatus } from './OrderStatus';
import { Agent } from '../Agent';
import { Item } from '../items/Item';
import { PurchaseOrderLineItem } from '../purchaseOrders/PurchaseOrder';

export type SalesOrderLineItem = {
	_id: number;
	idx: number;
	description: string;
	amount: number;
	quantity: string;
	quantityFulFilled: string;
	taxAmount: string;
	SalesOrderId: number;
	SalesOrder?: {
		number: string;
		quoteDate: string;
		orderDate: string;
		completeDate: string;
		status: OrderStatus;
		currency: string;
		reference: string;
		externalRef: string;
		createdAt: string;
		updatedAt: string;
		Agent: string;
		Location: {
			_id: number;
			id: string;
			name: string;
		};
	};
	POLineItemId?: number;
	POLineItem?: PurchaseOrderLineItem;
	ItemId?: number;
	Item?: Item;
	CostcenterId: number;
	KitId: number;
	JobId?: number;
	ProductId: number;
	TaxCodeId: number;
	externalId?: string;
};

export type SalesOrder = {
	_id: number;
	externalId: string;
	externalRef?: string;
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
