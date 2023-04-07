import { Customer } from './Customer';
export interface UpdateCustomerRequest extends Omit<Customer, 'Addresses' | 'Contacts'> {
}
