import { CustomFields } from '../CustomFields';

export enum ItemType {
	DIRECT = 'direct',
	CONSUMABLE = 'consumable',
	INVENTORY = 'inventory',
}

export type Item = {
	_id: number;
	externalIds?: string;
	number: number;
	name: string;
	salePrice: string;
	purchasePrice?: string;
	description?: string;
	sku?: string;
	lowStockNotification?: boolean;
	lowStockThreshold?: string;
	lowStockEmail?: string;
	customFields: CustomFields;
	InvoiceAccountId?: number;
	BillAccountId?: number;
	InventoryAccountId?: number;
	CogsAccountId?: number;
	inactive?: boolean;
	type: ItemType;
};
