export type FulFillLineRequest = {
	quantity: string;
	WarehouseId: number;
	date?: string;
	dontRunCostBasis?: boolean;
};
