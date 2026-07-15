import {
  createJob,
  findActiveJobs,
  findJobById,
  updateJob,
  deleteJob,
  findAllJobs,
} from "./job.repository";
import { AppError } from "../../common/errors/AppError";

export const getActiveJobsService = async (filters?: {
  search?: string;
  location?: string;
  experienceLevel?: string;
  salaryMin?: number;
  sort?: string;
}) => {
  return findActiveJobs(filters);
};
export const getALLJobsService = async () => {
  return findAllJobs();
};

export const getJobByIdService = async (id: string) => {
  const job = await findJobById(id);
  if (!job) {
    throw new AppError("Job not found", 404);
  }
  return job;
};

export const createJobService = async (data: any) => {
  return createJob(data);
};

export const updateJobService = async (
  id: string,
  data: any,
  userId: string,
) => {
  const job = await findJobById(id);
  if (!job) {
    throw new AppError("Job not found", 404);
  }

  if (job.postedById !== userId) {
    throw new AppError("You are not authorized to update this job", 403);
  }

  return updateJob(id, data);
};

export const deleteJobService = async (id: string, userId: string) => {
  const job = await findJobById(id);
  if (!job) {
    throw new AppError("Job not found", 404);
  }

  if (job.postedById !== userId) {
    throw new AppError("You are not authorized to delete this job", 403);
  }

  return deleteJob(id);
};
