import { JobStatus } from './JobStatus';
export declare type CreateJobRequest = {
	number: string;
	name: string;
	status: JobStatus;
	AgentId: number;
	description?: string;
};
