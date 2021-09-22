import {LineItem} from "../../types/purchaseOrders/LineItem";
import {salesOrder} from "./salesOrder";
import {item} from "./item";
import {job} from "./job";

export const lineItem: LineItem = {
    subtotal: 'subtotal',
    total: 'total',
    _id: 1,
    idx: 1,
    description: 'description',
    amount: 1,
    quantity: 'quantity',
    quantityFulFilled: 'quantityFulFilled',
    taxAmount: 'taxAmount',
    SalesOrderId: 1,
    ItemId: 1,
    CostcenterId: 1,
    KitId: 1,
    JobId: 1,
    ProductId: 1,
    TaxCodeId: 1,
    SalesOrder: salesOrder,
    Item: item,
    Kit: {},
    CostCenter: {},
    Product: {},
    Job: job,
}