import { Location } from "../locations/Location";
import { OrderStatus } from "./OrderStatus";
import {Agent} from "../Agent";

export type SalesOrder = {
    _id: number;
    externalId: string;
    number: string;
    status: OrderStatus;
    notes: string;
    amount: string; 
    quoteDate: string; 
    quoteExpiration: string; 
    orderDate: string; 
    deliveryDate: string; 
    currency: string;
    attachments: string[];
    approved_on: string; 
    approved_name: string;
    approved_email: string; 
    reference: string;
    LocationId: number;
    ICLocationId: number;
    AgentId: number;
    ShippingAddressId: number;
    BillingAddressId: number;
    TemplateId: number;
    Agent: Agent;
    Location: Location;
}