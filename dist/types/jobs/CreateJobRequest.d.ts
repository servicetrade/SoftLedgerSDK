import { JobStatus } from './JobStatus';
export type CreateJobRequest = {
	number: string;
	name: string;
	status: JobStatus;
	AgentId: number;
	description?: string;
};
