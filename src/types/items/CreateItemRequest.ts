export type CreateItemRequest = {
    name: string;
    salePrice: string;
    InvoiceAccountId: number;
    InventoryAccountId: number;
    BillAccountId: number;
    CogsAccountId: number;
    externalIds?: string;
    purchasePrice?: string;
    description?: string;
    sku?: string;
    lowStockNotification?: boolean;
    lowStockThreshold?: string;
    lowStockEmail?: string;
    customFields?: object;
}