import { Address } from "../addresses/Address";

export type CreateVendorRequest = {
    name: string;
    isActive?: boolean;
    Default: true
    shortName?: string;
    nameOnCheck?: string;
    companyName?: string;
    accNumber?: string;
    email?: string;
    is1099?: boolean;
    EIN?: string;
    terms?: string;
    currency?: string; 
    customFields?: object;
    attachments?: string[];
    externalId?: string;
    Addresses?: Address[];
    Contacts?: object[];
}