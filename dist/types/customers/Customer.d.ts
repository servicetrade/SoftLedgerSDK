export declare type CustomerAddress = {
	label: string;
	line1: string;
	line2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: true;
	isVerified: true;
	AgentId: number;
	VendorId: number;
};
export declare type CustomerContact = {
	name?: string;
	email?: string;
	phone?: string;
	isPrimary?: true;
	AgentId?: number;
	VendorId?: number;
};
export declare type Customer = {
	id: string;
	_id: number;
	name: string;
	externalId?: string;
	email?: string;
	type?: string;
	description?: string;
	website?: string;
	terms?: string;
	notes?: string;
	customFields?: {};
	attachments?: [];
	Addresses?: CustomerAddress[];
	Contacts?: CustomerContact[];
};
