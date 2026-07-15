import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { applyForJobService } from "./application.service";
import {
  formatApplicationListDto,
  formatApplicationDto,
} from "./application.dto";
import { sendResponse } from "../../common/utils/response";
import { AppError } from "../../common/errors/AppError";
import { Role } from "../../common/constants/role.enum";

export const applyForJob = asyncHandler(async (req: Request, res: Response) => {
  const { jobId, resume, coverLetter } = req.body;
  const applicantId = req.user.id;

  const application = await applyForJobService({
    jobId,
    applicantId,
    resume,
    coverLetter,
  });

  sendResponse(
    res,
    201,
    "Application submitted successfully",
    formatApplicationDto(application),
  );
});
