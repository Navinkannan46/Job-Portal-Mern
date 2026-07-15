import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { sendResponse } from "../../common/utils/response";
import { formatUserDto } from "../auth/auth.dto";
import {
  getCompaniesByUserIdService,
  getEmployerJobsService,
  getProfileService,
  updateProfileService,
  updateEmployerJobService,
  deleteEmployerJobService,
  getApplicantsByEmployerIdService,
} from "./employer.service";
import {
  formatEmployerProfileListDto,
  formatJobListDto,
  formatEmployerApplicantListDto,
} from "./employer.dto";
import { formatCompanyListDto } from "../company/company.dto";

export const getOwnProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getProfileService(req.user.id);
    sendResponse(
      res,
      200,
      "Employer profile retrieved successfully",
      formatUserDto(profile),
    );
  },
);

export const updateEmployerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await updateProfileService(req.user.id, req.body);
    sendResponse(
      res,
      200,
      "Employer profile updated successfully",
      formatUserDto(profile),
    );
  },
);

export const getMyCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const companies = await getCompaniesByUserIdService(userId as string);
    sendResponse(
      res,
      200,
      "Companies retrieved successfully",
      formatCompanyListDto(companies),
    );
  },
);

export const getEmployerJobs = asyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await getEmployerJobsService(req.user.id);
    sendResponse(
      res,
      200,
      "Employer jobs retrieved successfully",
      formatJobListDto(jobs),
    );
  },
);

export const updateEmployerJob = asyncHandler(
  async (req: Request, res: Response) => {
    const job = await updateEmployerJobService(
      req.params.id as string,
      req.user.id,
      req.body
    );
    sendResponse(
      res,
      200,
      "Job updated successfully",
      formatJobListDto([job])[0]
    );
  }
);

export const deleteEmployerJob = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteEmployerJobService(req.params.id as string, req.user.id);
    sendResponse(res, 200, "Job deleted successfully");
  }
);

export const getEmployerApplicants = asyncHandler(
  async (req: Request, res: Response) => {
    const applicants = await getApplicantsByEmployerIdService(req.user.id);
    sendResponse(
      res,
      200,
      "Applicants retrieved successfully",
      formatEmployerApplicantListDto(applicants)
    );
  }
);

export const updateApplicantStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { updateApplicantStatusService } = await import("./employer.service");
    const application = await updateApplicantStatusService(
      req.params.id as string,
      req.user.id,
      req.body
    );
    sendResponse(
      res,
      200,
      "Applicant status updated successfully",
      formatEmployerApplicantListDto([application])[0]
    );
  }
);
