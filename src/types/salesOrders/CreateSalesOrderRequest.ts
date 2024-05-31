export type CreateSalesOrderRequest = {
	status: Status;
	AgentId?: number;
	LocationId: number;
	currency: string;
	SOLineItems: object[];
	externalId?: string;
	notes?: string;
	quoteDate?: string;
	quoteExpiration?: string;
	orderDate?: string;
	deliveryDate?: string;
	attachments?: string[];
	reference?: string;
	ICLocationId?: number;
	ShippingAddressId?: number;
	BillingAddressId?: number;
	TemplateId?: number;
	externalRef?: string;
};

export type CreateSalesOrderLineRequest = {
	idx?: number;
	externalId?: string;
	description?: string;
	amount?: string;
	quantity?: string;
	taxAmount?: string;
	TaxCodeId?: number;
	TaxCode?: { code: string };
	ItemId?: number;
	Item?: { number: string };
	CostCenterId?: number;
	CostCenter?: { id: string };
	JobId?: number;
	Job?: { id: string };
	ProductId?: number;
	Product?: { id: string };
	Custom1Id?: number;
	Custom1?: { id: string };
	Custom2Id?: number;
	Custom2?: { id: string };
	Custom3Id?: number;
	Custom3?: { id: string };
};

export enum Status {
	QUOTE = 'quote',
	ORDER = 'order',
}
