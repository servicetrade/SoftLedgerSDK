import {CreateItemRequest} from "../../types/items/CreateItemRequest";

export const createItemRequest: CreateItemRequest = {
    externalIds: 'externalIds',
    name: 'name',
    salePrice: 'salePrice',
    purchasePrice: 'purchasePrice',
    description: 'description',
    sku: 'sku',
    lowStockNotification: false,
    lowStockThreshold: 'lowStockThreshold',
    lowStockEmail: 'lowStockEmail',
    customFields: {},
    InvoiceAccountId: 1,
    BillAccountId: 1,
    InventoryAccountId: 1,
    CogsAccountId: 1,
}