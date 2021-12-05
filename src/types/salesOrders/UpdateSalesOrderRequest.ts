import {OrderStatus} from "./OrderStatus";

export type UpdateSalesOrderRequest = {
    status?: OrderStatus;
    AgentId?: number;
    LocationId: number;
    currency?: string;
    SOLineItems?: UpdateSOLineItem[];
    externalId?: string;
    notes?: string;
    quoteDate?: string;
    quoteExpiration?: string;
    orderDate?: string;
    deliveryDate?: string;
    attachments?: string[];
    reference?: string;
    ICLocationId?: number;
    ShippingAddressId?: number;
    BillingAddressId?: number;
    TemplateId?: number;
}

type BaseUpdateSOLineItem = {
    amount: number,
    quantity: string,
    taxAmount?: string,
    CostcenterId?: number,
    JobId?: number,
    ProductId?: number,
    TaxCodeId?: number
    externalId?: string
};

export type UpdateSOLineItem = BaseUpdateSOLineItem & {
    description: string,
    ItemId?: number,
    KitId?: number,
} | BaseUpdateSOLineItem & {
    description?: string,
    ItemId: number,
    KitId?: number,
} | BaseUpdateSOLineItem & {
    description?: string,
    ItemId?: number,
    KitId: number,
}