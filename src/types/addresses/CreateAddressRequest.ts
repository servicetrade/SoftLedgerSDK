export type CreateAddressRequest = {
	label: string;
	line1?: string;
	line2?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	isDefault?: boolean;
	CustomerId?: number;
	VendorId?: number;
};
