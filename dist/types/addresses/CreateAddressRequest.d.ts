export type CreateAddressRequest = {
	label: string;
	line1: string;
	line2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
	isVerified: boolean;
	AgentId: number;
	VendorId: number;
};
