import {CreateJobRequest} from "../../types/jobs/CreateJobRequest";
import {JobStatus} from "../../types/jobs/JobStatus";

export const createJobRequest: CreateJobRequest = {
    number: 'number',
    name: 'name',
    status: JobStatus.QUOTED,
    AgentId: 1,
    description: 'description',
}