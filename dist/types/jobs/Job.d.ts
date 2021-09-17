import { JobStatus } from './JobStatus';
export declare type Job = {
    _id: number;
    number: string;
    name: string;
    description: string;
    status: JobStatus;
    AgentId: number;
    Agent: {
        _id: number;
        id: string;
        name: string;
        email: string;
    };
};
