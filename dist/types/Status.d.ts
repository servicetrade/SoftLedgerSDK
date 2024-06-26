export declare enum StatusState {
	DONE = 'done',
	ERROR = 'error',
	RUNNING = 'running',
	STARTED = 'started',
}
export declare enum StatusType {
	COSTBASIS = 'costbasis',
	CRYPTO_JOURNAL = 'crypto-journals',
	INVENTORY = 'inventory',
}
export declare type Status = {
	status: StatusState;
	type: StatusType;
	tenantId: string;
	data: {
		_id: string;
		progress: string;
		timestamp: string;
		err: {
			type: string;
			msg: string;
		};
	};
};
