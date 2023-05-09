export declare type ShipmentReceiptLinesRequest = {
	quantityReceived: string;
	amount: string;
	POLineItemId: number;
	WarehouseId?: number;
};
export declare type ShipmentReceiptRequest = {
	VendorId: number;
	dateReceived: string;
	ShipmentReceiptLines: ShipmentReceiptLinesRequest[];
};
