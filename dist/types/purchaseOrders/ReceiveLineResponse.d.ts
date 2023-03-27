import { Item } from '../items/Item';
import { PurchaseOrder } from './PurchaseOrder';
export type ReceiveLineResponse = {
	_id: number;
	ItemId: number;
	KitId: number;
	amount: string;
	quantity: string;
	quantityReceived: string;
	PurchaseOrderId: number;
	CostCenterId: number;
	ProductId: number;
	Item: Item;
	Kit: object;
	PurchaseOrder: PurchaseOrder;
};
