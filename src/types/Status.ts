export enum StatusState {
	DONE = 'done',
	ERROR = 'error',
	RUNNING = 'running',
	STARTED = 'started',
}

export enum StatusType {
	COSTBASIS = 'costbasis',
	CRYPTO_JOURNAL = 'crypto-journals',
	INVENTORY = 'inventory',
}

export type Status = {
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
