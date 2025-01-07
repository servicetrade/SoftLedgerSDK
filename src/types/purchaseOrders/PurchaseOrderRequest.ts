import { CustomFields } from '../CustomFields';
import { CreatePurchaseOrderLineItemRequest, UpdatePurchaseOrderLineItemRequest } from './PurchaseOrderLineItemRequest';

export interface UpdatePurchaseOrderRequest {
	VendorId?: number;
	LocationId?: number;
	currency?: string;
	WarehouseId?: number;
	POLineItems?: UpdatePurchaseOrderLineItemRequest[];

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
}

export interface CreatePurchaseOrderRequest extends UpdatePurchaseOrderRequest {
	VendorId: number;
	LocationId: number;
	currency: string;
	WarehouseId: number;
	POLineItems?: CreatePurchaseOrderLineItemRequest[];
}
