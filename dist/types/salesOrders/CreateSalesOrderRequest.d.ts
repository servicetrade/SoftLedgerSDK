export declare type CreateSalesOrderRequest = {
    status: Status;
    AgentI: number;
    LocationI: number;
    currenc: string;
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
declare enum Status {
    QUOTE = "quote",
    ORDER = "order"
}
export {};
