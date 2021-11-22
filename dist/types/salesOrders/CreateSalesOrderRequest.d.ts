export declare type CreateSalesOrderRequest = {
    status: Status;
    AgentId?: number;
    LocationId: number;
    currency: string;
    SOLineItem: object[];
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
};
export declare enum Status {
    QUOTE = "quote",
    ORDER = "order"
}
