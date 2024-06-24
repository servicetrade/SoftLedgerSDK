export type UnFulFillLineRequest = {
	quantity: string;
	WarehouseId: number;
	date?: string;
	runCostBasis?: boolean;
	ReturnAccountId?: number;
};
