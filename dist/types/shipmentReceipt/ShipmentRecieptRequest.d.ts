export type ShipmentReceiptLinesRequest = {
	quantityReceived: string;
	amount: string;
	POLineItemId: number;
	WarehouseId?: number;
};
export type ShipmentReceiptRequest = {
	VendorId: number;
	dateReceived: string;
	ShipmentReceiptLines: ShipmentReceiptLinesRequest[];
};
