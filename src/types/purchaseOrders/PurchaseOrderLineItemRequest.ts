import { CustomFields } from '../CustomFields';

type _PurchaseOrderLineItemRequest = {
	idx?: number;
	externalId?: string;
	description?: string;
	customFields?: CustomFields;
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

export type CreatePurchaseOrderLineItemRequest = {
	amount: number;
	quantity: string;
} & _PurchaseOrderLineItemRequest;

export type UpdatePurchaseOrderLineItemRequest = {
	amount?: number;
	quantity?: string;
} & _PurchaseOrderLineItemRequest;
