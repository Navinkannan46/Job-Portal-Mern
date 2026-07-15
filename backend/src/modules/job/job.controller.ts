import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import {
  createJobService,
  deleteJobService,
  getActiveJobsService,
  getALLJobsService,
  getJobByIdService,
  updateJobService,
} from "./job.service";
import { sendResponse } from "../../common/utils/response";
import { formatJobDto, formatJobListDto } from "./job.dto";

export const getActiveJobs = asyncHandler(
  async (req: Request, res: Response) => {
    const { search, location, experienceLevel, salaryMin, sort } = req.query;
    const jobs = await getActiveJobsService({
      search: search as string,
      location: location as string,
      experienceLevel: experienceLevel as string,
      salaryMin: salaryMin ? parseFloat(salaryMin as string) : undefined,
      sort: sort as string,
    });
    sendResponse(
      res,
      200,
      "Jobs retrieved successfully",
      formatJobListDto(jobs),
    );
  },
);

export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await getJobByIdService(id as string);
  sendResponse(res, 200, "Job retrieved successfully", formatJobDto(job));
});
export const getAllJobs = asyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await getALLJobsService();
    sendResponse(
      res,
      200,
      "Jobs retrieved successfully",
      formatJobListDto(jobs),
    );
  },
);
export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const jobData = {
    ...req.body,
    postedById: req.user.id,
  };
  const job = await createJobService(jobData);
  sendResponse(res, 201, "Job created successfully", formatJobDto(job));
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await updateJobService(id as string, req.body, req.user.id);
  sendResponse(res, 200, "Job updated successfully", formatJobDto(job));
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteJobService(id as string, req.user.id);
  sendResponse(res, 200, "Job deleted successfully");
});
