export type CreateWarehouseRequest = {
	name: string;
	LocationId: number;
	description?: string;
	Address?: object;
	ParentId?: number;
	customFields?: { [key: string]: string | number };
};
