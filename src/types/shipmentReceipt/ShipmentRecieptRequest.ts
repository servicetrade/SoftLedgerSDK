import { ShipmentReceiptLine } from './ShipmentReceipt';

export type ShipmentReceiptLinesRequest = {
	quantityReceived: string;
	amount: string;
	POLineItemId: string;
	WarehouseId?: number;
};

export type ShipmentReceiptRequest = {
	VendorId: number;
	dateReceived: string;
	ShipmentReceiptLines: ShipmentReceiptLinesRequest[];
};
