import { JobStatus } from './JobStatus';
import { Agent } from '../Agent';
export declare type Job = {
    _id: number;
    number: string;
    name: string;
    description: string;
    status: JobStatus;
    AgentId: number;
    Agent: Agent;
};
