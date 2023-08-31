import { CustomFields } from '../CustomFields';

export type Item = {
	_id: string;
	externalIds: string;
	number: number;
	name: string;
	salePrice: string;
	purchasePrice: string;
	description: string;
	sku: string;
	lowStockNotification: boolean;
	lowStockThreshold: string;
	lowStockEmail: string;
	customFields: CustomFields;
	InvoiceAccountId: string;
	BillAccountId: string;
	InventoryAccountId: string;
	CogsAccountId: string;
	inactive: boolean;
};
