import { CustomFields } from '../CustomFields';
export interface UpdatePurchaseOrderLineItemRequest {
	amount?: string;
	quantity?: string;
	idx?: number;
	externalId?: string;
	description?: string;
	customFields?: CustomFields;
	taxAmount?: string;
	TaxCodeId?: number;
	ItemId?: number;
	SalesOrderId?: number;
	SOLineItemId?: number;
	CostCenterId?: number;
	JobId?: number;
	ProductId?: number;
	Custom1Id?: number;
	Custom2Id?: number;
	Custom3Id?: number;
}
export interface CreatePurchaseOrderLineItemRequest extends UpdatePurchaseOrderLineItemRequest {
	amount: string;
	quantity: string;
}
