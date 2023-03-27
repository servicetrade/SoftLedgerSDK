import { CreateAddressRequest } from '../../types/addresses/CreateAddressRequest';

export const createAddressRequestMock: CreateAddressRequest = {
	label: 'label',
	line1: 'line1',
	line2: 'line2',
	city: 'city',
	state: 'state',
	zip: 'zip',
	country: 'country',
	isDefault: false,
	isVerified: false,
	AgentId: 1,
	VendorId: 1,
};
