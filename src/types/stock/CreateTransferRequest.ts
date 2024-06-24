export type CreateTransferRequest = {
	dontRunCostBasis?: boolean;
	date: string;
	quantity: string;
	ItemId: number;
	FromWarehouseId: number;
	ToWarehouseId: number;
};
