import { Address } from '../addresses/Address';

export type Warehouse = {
    _id: number;
    name: string;
    description: string;
    AddressId: number;
    LocationId: number;
    Location: object;
    Address: Address; 
}