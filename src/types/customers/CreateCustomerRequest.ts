import {Customer} from "./Customer";

export interface CreateCustomerRequest extends Omit<Customer, 'id' | '_id'> {}
