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
    Item: object;
    Kit: object;
    PurchaseOrder: object;
}
