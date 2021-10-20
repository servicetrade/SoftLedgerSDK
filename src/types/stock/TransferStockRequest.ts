export type TransferStockRequest = {
    date: string;
    quantity: string;
    currency: string;
    ItemId: number;
    FromWarehouseId: number;
    ToWarehouseId: number;
}