export interface UpdateWarehouseRequest {
	name?: string;
	LocationId?: number;
	description?: string;
	Address?: object;
	ParentId?: number;
	customFields?: {
		[key: string]: string | number;
	};
}
export interface CreateWarehouseRequest extends UpdateWarehouseRequest {
	name: string;
	LocationId: number;
}
