import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { sendResponse } from "../../common/utils/response";
import {
  formatEmployerProfileDto,
  formatEmployerProfileListDto,
  formatUserDto,
  formatUsersDto,
  formatCompaniesDto,
  formatJobsDto,
  formatApplicationsDto,
} from "./admin.dto";
import {
  getAllEmployerProfilesService,
  getProfileByIdService,
  getUserById,
  getAllUsersService,
  getAllCompaniesService,
  getAllJobsService,
  getAllApplicationsService,
} from "./admin.service";

export const getEmployerProfileById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await getProfileByIdService(id as string);
    sendResponse(
      res,
      200,
      "Employer profile details retrieved successfully",
      formatEmployerProfileDto(profile),
    );
  },
);

export const getAllEmployerProfiles = asyncHandler(
  async (req: Request, res: Response) => {
    const profiles = await getAllEmployerProfilesService();
    sendResponse(
      res,
      200,
      "All employer profiles retrieved successfully",
      formatEmployerProfileListDto(profiles),
    );
  },
);

export const getUserProfileById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id as string);
    sendResponse(
      res,
      200,
      "User profile fetched successfully",
      formatUserDto(user),
    );
  },
);

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getAllUsersService();
    sendResponse(
      res,
      200,
      "All users retrieved successfully",
      formatUsersDto(users),
    );
  },
);

export const getAllCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    const companies = await getAllCompaniesService();
    sendResponse(
      res,
      200,
      "All companies retrieved successfully",
      formatCompaniesDto(companies),
    );
  },
);

export const getAllJobs = asyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await getAllJobsService();
    sendResponse(
      res,
      200,
      "All jobs retrieved successfully",
      formatJobsDto(jobs),
    );
  },
);

export const getAllApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const applications = await getAllApplicationsService();
    sendResponse(
      res,
      200,
      "All applications retrieved successfully",
      formatApplicationsDto(applications),
    );
  },
);
