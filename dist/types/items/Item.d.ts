export declare type Item = {
    _id: number;
    externalIds: string;
    number: number;
    name: string;
    salePrice: string;
    purchasePrice: string;
    description: string;
    sku: string;
    lowStockNotification: boolean;
    lowStockThreshold: string;
    lowStockEmail: string;
    customFields: {
        [key: string]: any;
    } | string;
    InvoiceAccountId: number;
    BillAccountId: number;
    InventoryAccountId: number;
    CogsAccountId: number;
    inactive: boolean;
};
