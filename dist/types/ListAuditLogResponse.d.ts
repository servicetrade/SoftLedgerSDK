export declare type ListAuditLogResponse<T> = {
	hasNextPage: boolean;
	cursor: string;
	data: T[];
};
