import {
  findCompaniesByUserId,
  findEmployerProfileByUserId,
  findJobsId,
  updateEmployerProfile,
  updateEmployerJob,
  deleteEmployerJob,
  findApplicantsByEmployerId,
} from "./employer.repository";
import { AppError } from "../../common/errors/AppError";
import { updateEmployerProfileSchema } from "./employer.validation";
import { updateJobSchema } from "../job/job.validation";
import { findJobById } from "../job/job.repository";

export const getProfileService = async (userId: string) => {
  const profile = await findEmployerProfileByUserId(userId);
  if (!profile) {
    throw new AppError("Employer profile not found", 404);
  }
  return profile;
};

export const updateProfileService = async (userId: string, data: any) => {
  const validatedData = updateEmployerProfileSchema.parse(data);

  const existingProfile = await findEmployerProfileByUserId(userId);
  if (!existingProfile) {
    throw new AppError("Employer profile not found", 404);
  }
  const updatedProfile = await updateEmployerProfile(userId, validatedData);

  return updatedProfile;
};

export const getCompaniesByUserIdService = async (userId: string) => {
  const companies = await findCompaniesByUserId(userId);
  return companies;
};

export const getEmployerJobsService = async (userId: string) => {
  const jobs = await findJobsId(userId);
  return jobs;
};

export const updateEmployerJobService = async (jobId: string, employerId: string, data: any) => {
  const validatedData = updateJobSchema.parse(data);
  const existingJob = await findJobById(jobId);
  if (!existingJob || existingJob.postedById !== employerId) {
    throw new AppError("Job not found or unauthorized", 404);
  }
  return await updateEmployerJob(jobId, employerId, validatedData);
};

export const deleteEmployerJobService = async (jobId: string, employerId: string) => {
  const existingJob = await findJobById(jobId);
  if (!existingJob || existingJob.postedById !== employerId) {
    throw new AppError("Job not found or unauthorized", 404);
  }
  return await deleteEmployerJob(jobId, employerId);
};

export const getApplicantsByEmployerIdService = async (employerId: string) => {
  return await findApplicantsByEmployerId(employerId);
};

export const updateApplicantStatusService = async (applicationId: string, employerId: string, data: any) => {
  const { updateApplicantStatusSchema } = await import("./employer.validation");
  const validatedData = updateApplicantStatusSchema.parse(data);
  
  const { updateApplicationStatus } = await import("./employer.repository");
  const updatedApplication = await updateApplicationStatus(applicationId, employerId, validatedData.status);
  
  if (!updatedApplication) {
    throw new AppError("Application not found or unauthorized", 404);
  }
  
  return updatedApplication;
};
