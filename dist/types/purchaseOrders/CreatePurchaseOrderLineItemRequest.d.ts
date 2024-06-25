export declare type CreatePurchaseOrderLineItemRequest = {
	amount: number;
	quantity: string;
	idx?: number;
	externalId?: string;
	description?: string;
	customFields?: {
		[key: string]: string | number;
	};
	taxAmount?: string;
	TaxCodeId?: number;
	ItemId?: number;
	SalesOrderId?: number;
	SOLineItemId?: string;
	CostCenterId?: number;
	JobId?: number;
	ProductId?: number;
	Custom1Id?: number;
	Custom2Id?: number;
	Custom3Id?: number;
};
