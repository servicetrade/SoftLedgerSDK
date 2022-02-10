export declare type ShipmentReceiptLinesRequest = {
    quantityReceived: string;
    amount: string;
    POLineItemId: string;
    WarehouseId?: number;
};
export declare type ShipmentReceiptRequest = {
    VendorId: number;
    dateReceived: string;
    ShipmentReceiptLines: ShipmentReceiptLinesRequest[];
};
