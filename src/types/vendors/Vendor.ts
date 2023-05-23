import { Address } from '../addresses/Address';
import { CustomFields } from '../CustomFields';

export type Vendor = {
	_id: number;
	id: string;
	name: string;
	shortName?: string;
	nameOnCheck?: string;
	companyName?: string;
	accNumber?: string;
	email?: string;
	is1099: boolean;
	EIN?: string;
	terms?: string;
	customFields: CustomFields;
	externalId?: string;
	attachments?: string[];
	currency?: string;
	inactive: boolean;
	defaultDaysDue?: number | string;
	ExpenseAccountId?: number | string;
	ExpenseAccount?: number | string;
	Contacts?: object;
	Addresses?: Address[];
};
