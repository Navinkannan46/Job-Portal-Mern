import { AppError } from "../../common/errors/AppError";
import {
  findAllEmployerProfiles,
  findById,
  findEmployerProfileByUserId,
  findAllUsers,
  findAllCompanies,
  findAllJobs,
  findAllApplications,
} from "./admin.repository";

export const getProfileByIdService = async (id: string) => {
  const profile = await findEmployerProfileByUserId(id);
  if (!profile) {
    throw new AppError("Employer profile not found", 404);
  }
  return profile;
};

export const getAllEmployerProfilesService = async () => {
  return findAllEmployerProfiles();
};

export const getUserById = async (userId: string) => {
  const user = await findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const getAllUsersService = async () => {
  return findAllUsers();
};

export const getAllCompaniesService = async () => {
  return findAllCompanies();
};

export const getAllJobsService = async () => {
  return findAllJobs();
};

export const getAllApplicationsService = async () => {
  return findAllApplications();
};
