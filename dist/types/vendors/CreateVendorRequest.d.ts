import { Address } from '../addresses/Address';
declare type _VendorRequest = {
	isActive?: boolean;
	Default?: true;
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
};
export declare type CreateVendorRequest = {
	name: string;
} & _VendorRequest;
export declare type UpdateVendorRequest = {
	name?: string;
} & _VendorRequest;
export {};
