export interface UpdateSalesOrderLineRequest {
	amount?: string;
	quantity?: string;
	idx?: number;
	externalId?: string;
	description?: string;
	taxAmount?: string;
	TaxCodeId?: number;
	TaxCode?: {
		code: string;
	};
	ItemId?: number;
	Item?: {
		number: string;
	};
	CostCenterId?: number;
	CostCenter?: {
		id: string;
	};
	JobId?: number;
	Job?: {
		id: string;
	};
	ProductId?: number;
	Product?: {
		id: string;
	};
	Custom1Id?: number;
	Custom1?: {
		id: string;
	};
	Custom2Id?: number;
	Custom2?: {
		id: string;
	};
	Custom3Id?: number;
	Custom3?: {
		id: string;
	};
}
export interface CreateSalesOrderLineRequest extends UpdateSalesOrderLineRequest {
	amount: string;
	quantity: string;
}
