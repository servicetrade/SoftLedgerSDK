import { OrderStatus } from './OrderStatus';
export declare type UpdateSalesOrderRequest = {
    status?: OrderStatus;
    AgentId?: number;
    LocationId?: number;
    supressWebhook?: boolean;
    currency?: string;
    SOLineItems?: UpdateSOLineItem[];
    externalId?: string;
    notes?: string;
    quoteDate?: string;
    quoteExpiration?: string;
    upsertOnly?: boolean;
    orderDate?: string;
    deliveryDate?: string;
    attachments?: string[];
    reference?: string;
    ICLocationId?: number;
    ShippingAddressId?: number;
    BillingAddressId?: number;
    TemplateId?: number;
};
declare type BaseUpdateSOLineItem = {
    amount: number;
    quantity: string;
    taxAmount?: string;
    CostcenterId?: number;
    JobId?: number;
    ProductId?: number;
    TaxCodeId?: number;
    externalId?: string;
};
export declare type UpdateSOLineItem = (BaseUpdateSOLineItem & {
    description: string;
    ItemId?: number;
    KitId?: number;
}) | (BaseUpdateSOLineItem & {
    description?: string;
    ItemId: number;
    KitId?: number;
}) | (BaseUpdateSOLineItem & {
    description?: string;
    ItemId?: number;
    KitId: number;
});
export {};
