import { Address } from '../addresses/Address';
import { CustomFields } from '../CustomFields';
export declare type Warehouse = {
	_id: number;
	name: string;
	externalId: string;
	description: string;
	AddressId: number;
	LocationId: number;
	Location: object;
	customFields: CustomFields;
	Address: Address;
	ParentId?: number;
	inactive: boolean;
};
