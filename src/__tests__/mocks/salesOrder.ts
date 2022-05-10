import {SalesOrder} from "../../types/salesOrders/SalesOrder";
import {OrderStatus} from "../../types/salesOrders/OrderStatus";
import {agent} from "./agent";
import {location} from "./location";

export const salesOrder: SalesOrder = {
    _id: 1,
    externalId: 'externalId',
    number: 'number',
    status: OrderStatus.ORDER,
    notes: 'notes',
    amount: 'amount',
    quoteDate: 'quoteDate',
    quoteExpiration: 'quoteExpiration',
    orderDate: 'orderDate',
    deliveryDate: 'deliveryDate',
    currency: 'currency',
    attachments: [],
    approved_on: 'approved_on',
    approved_name: 'approved_name',
    approved_email: 'approved_email',
    reference: 'reference',
    LocationId: 1,
    ICLocationId: 1,
    AgentId: 1,
    ShippingAddressId: 1,
    BillingAddressId: 1,
    TemplateId: 1,
    Agent: agent,
    Location: location,
    SOLineItems: []
}