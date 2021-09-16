import {Job} from '../jobs/Job';
import {Item} from '../items/Item';

export type LineItem = {
    subtotal: string;
    total: string;
    _id: number;
    idx: number;
    description: string;
    amount: number;
    quantity: string;
    quantityFulFilled: string;
    taxAmount: string;
    SalesOrderId: number;
    ItemId: number;
    CostcenterId: number;
    KitId: number;
    JobId: number;
    ProductId: number;
    TaxCodeId: number;
    SalesOrder: object;
    Item: Item;
    Kit: object;
    CostCenter: object;
    Product: object;
    Job: Job;
}
