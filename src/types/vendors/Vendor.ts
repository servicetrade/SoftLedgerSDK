import { Address } from '../addresses/Address';

export type Vendor = {
	_id: number;
	id: string;
	isActive: boolean;
	name: string;
	shortName: string;
	nameOnCheck: string;
	companyName: string;
	accNumber: string;
	email: string;
	is1099: boolean;
	EIN: string;
	terms: string;
	customFields: object;
	externalId: string;
	currency: string;
	attachments: string[];
	Address: Address;
	Contact: object;
};
