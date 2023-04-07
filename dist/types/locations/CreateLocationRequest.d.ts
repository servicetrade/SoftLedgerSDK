import { Address } from '../addresses/Address';
export declare type CreateLocationRequest = {
    id: string;
    parent_id: number;
    name: string;
    currency: string;
    description?: string;
    imageURL?: string;
    entityname?: string;
    entityEmail?: string;
    entityPhone?: string;
    entityEIN?: string;
    paymentDetails?: string;
    FXGLAccountId?: number;
    RAAccountId?: number;
    Address?: Address;
};
