import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { sendResponse } from "../../common/utils/response";
import { AppError } from "../../common/errors/AppError";

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }

  // Construct the accessible URL for the uploaded file
  const fileUrl = `/uploads/resumes/${req.file.filename}`;

  sendResponse(res, 201, "Resume uploaded successfully", {
    url: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});
