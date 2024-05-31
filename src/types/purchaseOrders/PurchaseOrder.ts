import { Address } from '../addresses/Address';
import { Location } from '../locations/Location';
import { Warehouse } from '../warehouses/Warehouse';
import { PurchaseOrderStatus } from './PurchaseOrderStatus';
import { Item } from '../items/Item';
import { CustomFields } from '../CustomFields';

export type PurchaseOrderLineItem = {
	_id: number;
	amount: number;
	quantity: string;
	quantityReceived: string;
	description: string;
	customFields: CustomFields;
	taxAmount: string;
	CostcenterId: number;
	LedgerAccountId: number;
	ItemId: number;
	JobId: number;
	ProductId: number;
	KitId: number;
	TaxCodeId: number;
	Item?: Item;
	SalesOrderId?: number;
	PurchaseOrderId?: number;
	PurchaseOrder?: PurchaseOrder;
};

export type PurchaseOrderCompact = {
	_id: number;
	externalId: string;
	number: string;
	description: string;
	issueDate: string;
	deliveryDate: string;
	status: PurchaseOrderStatus;
	amount: string;
	currency: string;
	notes: string;
	attachments: string[];
	customFields: CustomFields;
	approved_on: string;
	approved_name: string;
	approved_email: string;
	VendorId: number;
	WarehouseId: number;
	ShippingAddressId: number;
	BillingAddressid: number;
	LocationId: number;
	ICLocationId: number;
	InventoryReceivingAccountId: number;
	TemplateId: number;
	Vendor: object;
	Location: Location;
	Warehouse: Warehouse;
	ShippingAddress: Address;
	BillingAddress: Address;
	InventoryReceivingAccount: object;
	createdAt: string;
	updatedAt: string;
};

export type PurchaseOrder = PurchaseOrderCompact & {
	POLineItems: PurchaseOrderLineItem[];
};
