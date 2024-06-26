import { CustomFields } from '../CustomFields';
import { CreatePurchaseOrderLineItemRequest, UpdatePurchaseOrderLineItemRequest } from './PurchaseOrderLineItemRequest';

type _PurchaseOrderRequest = {
	VendorId: number;
	LocationId: number;
	currency: string;
	WarehouseId: string;
	POLineItems?: CreatePurchaseOrderLineItemRequest[];

	externalId?: string;
	description?: string;
	notes?: string;
	customFields?: CustomFields;
	issueDate?: string;
	deliveryDate?: string;
	attachments?: string[];
	TemplateId?: number;
	ICLocationId?: number;
	InventoryReceivingAccountId?: number;
	ShippingAddressId?: number;
	BillingAddressId?: number;
};

export type CreatePurchaseOrderRequest = {
	VendorId: number;
	LocationId: number;
	currency: string;
	WarehouseId: string;
	POLineItems?: CreatePurchaseOrderLineItemRequest[];
} & _PurchaseOrderRequest;

export type UpdatePurchaseOrderRequest = {
	VendorId?: number;
	LocationId?: number;
	currency?: string;
	WarehouseId?: string;
	POLineItems?: UpdatePurchaseOrderLineItemRequest[];
} & _PurchaseOrderRequest;
