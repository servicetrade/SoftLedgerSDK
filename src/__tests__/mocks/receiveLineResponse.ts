import { ReceiveLineResponse } from '../../types/purchaseOrders/ReceiveLineResponse';
import { item } from './item';
import { purchaseOrder } from './purchaseOrder';

export const receiveLineResponse: ReceiveLineResponse = {
	_id: 1,
	ItemId: 1,
	KitId: 1,
	amount: 'amount',
	quantity: 'quantity',
	quantityReceived: 'quantityReceived',
	PurchaseOrderId: 1,
	CostCenterId: 1,
	ProductId: 1,
	Item: item,
	Kit: {},
	PurchaseOrder: purchaseOrder,
};
