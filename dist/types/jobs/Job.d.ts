import { JobStatus } from './JobStatus';
import { Agent } from '../Agent';
export type Job = {
	_id: number;
	number: string;
	name: string;
	description: string;
	status: JobStatus;
	AgentId: number;
	Agent: Agent;
};
