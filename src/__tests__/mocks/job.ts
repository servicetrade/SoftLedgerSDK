import {Job} from "../../types/jobs/Job";
import {JobStatus} from "../../types/jobs/JobStatus";
import {agent} from "./agent";

export const job: Job = {
    _id: 1,
    number: 'number',
    name: 'name',
    description: 'description',
    status: JobStatus.QUOTED,
    AgentId: 1,
    Agent: agent,
}