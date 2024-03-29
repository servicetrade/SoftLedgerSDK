export type CreatePurchaseOrderRequest = {
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
	POLineItems?: CreatePurchaseOrderRequestPOLineItem[];
};

export type CreatePurchaseOrderRequestPOLineItem = {
	amount: number;
	quantity: string;
	description?: string;
	customFields?: object;
	taxAmount?: string;
	CostcenterId?: number;
	LedgerAccountId?: number;
	ItemId?: number;
	JobId?: number;
	ProductId?: number;
	KitId?: number;
	TaxCodeId?: number;
	SalesOrderId?: number;
	SOLineItemId?: string;
};
