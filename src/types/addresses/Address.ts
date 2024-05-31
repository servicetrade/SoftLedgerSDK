export type Address = {
	_id: number;
	label?: string;
	line1?: string;
	line2?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	isDefault?: boolean;
	isVerified?: boolean;
	CustomerId?: number;
	VendorId?: number;
};
