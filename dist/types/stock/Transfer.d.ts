import { TransferStatus } from './TransferStatus';
export declare type Transfer = {
	_id: number;
	date: string;
	quantity: string;
	status: TransferStatus;
	currency: string;
	ItemId: number;
	ToWarehouseId: number;
	FromWarehouseId: number;
};
