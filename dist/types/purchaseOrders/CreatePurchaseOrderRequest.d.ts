import { CreatePurchaseOrderLineItemRequest } from './CreatePurchaseOrderLineItemRequest';
export declare type CreatePurchaseOrderRequest = {
	VendorId: number;
	LocationId: number;
	currency: string;
	externalId?: string;
	description?: string;
	issueDate?: string;
	directPurchaseToSO: boolean;
	deliveryDate?: string;
	notes?: string;
	attachments?: string[];
	customFields?: Record<string, string>;
	WarehouseId?: string;
	ShippingAddressId?: number;
	BillingAddressid?: number;
	ICLocationId?: number;
	InventoryReceivingAccountId?: number;
	TemplateId?: number;
	POLineItems?: CreatePurchaseOrderLineItemRequest[];
};
