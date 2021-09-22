import {PurchaseOrder} from "../../types/purchaseOrders/PurchaseOrder";
import {PurchaseOrderStatus} from "../../types/purchaseOrders/PurchaseOrderStatus";
import {location} from "./location";
import {warehouse} from "./warehouse";
import {address} from "./address.mock";

export const purchaseOrder: PurchaseOrder = {
    _id: 1,
    externalId: 'externalId',
    number: 'number',
    description: 'description',
    issueDate: 'issueDate',
    deliveryDate: 'deliveryDate',
    status: PurchaseOrderStatus.FULFILLED,
    amount: 'amount',
    currency: 'currency',
    notes: 'notes',
    attachments: [],
    customFields: {},
    approved_on: 'approved_on',
    approved_name: 'approved_name',
    approved_email: 'approved_email',
    VendorId: 1,
    WarehouseId: 1,
    ShippingAddressId: 1,
    BillingAddressid: 1,
    LocationId: 1,
    ICLocationId: 1,
    InventoryReceivingAccountId: 1,
    TemplateId: 1,
    Vendor: {},
    Location: location,
    Warehouse: warehouse,
    ShippingAddress: address,
    BillingAddress: address,
    InventoryReceivingAccount: {},
}