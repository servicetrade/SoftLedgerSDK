export type CreatePurchaseOrderRequest = {
    VendorId: number;
    LocationId: number;
    currency: string;
    externalId?: string;
    description?: string;
    issueDate?: string;
    deliveryDate?: string;
    notes?: string;
    attachments?: string[];
    customFields?: Record<string, string>;
    WarehouseId?: number;
    ShippingAddressId?: number;
    BillingAddressid?: number;
    ICLocationId?: number;
    InventoryReceivingAccountId?: number;
    TemplateId?: number;
    POLineItems?: POLineItem[];
}

type POLineItem = {
    amount: number;
    quantity: string;
    description?: string;
    customFields?: object;
    taxAmount?: string;
    CostcenterId?: number;
    LedgerAccountId?: number;
    ItemId?: number;
    JobId?: number;
    ProductId?: number;
    KitId?: number;
    TaxCodeId?: number;
}