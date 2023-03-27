import { Vendor } from '../vendors/Vendor';
import { Warehouse } from '../warehouses/Warehouse';
import { Item } from '../items/Item';
import { PurchaseOrderLineItem } from '../purchaseOrders/PurchaseOrder';
import { SalesOrderLineItem } from '../salesOrders/SalesOrder';
export type ShipmentReceiptLine = {
	_id: number;
	quantityReceived: string;
	amount: string;
	ShipmentReceiptId: number;
	WarehouseId: number;
	POLineItemId: number;
	SOLineItemId: number;
	ItemId: number;
	Warehouse: Warehouse;
	Item: Item;
	POLineItem: PurchaseOrderLineItem;
	SOLineItem: SalesOrderLineItem;
};
export type ShipmentReceipt = {
	_id: number;
	dateReceived: string;
	VendorId: number;
	Vendor: Vendor;
	ShipmentReceiptLines: ShipmentReceiptLine[];
};
