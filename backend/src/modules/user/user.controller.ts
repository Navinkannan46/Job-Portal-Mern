import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import * as userService from "./user.service";
import { sendResponse } from "../../common/utils/response";
import {
  formatUserDashboardDto,
  formatUserDto,
  formatUsersDto,
} from "./user.dto";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // req.user is guaranteed to be populated by authMiddleware
  const user = await userService.getProfile(req.user.id);
  sendResponse(
    res,
    200,
    "User profile fetched successfully",
    formatUserDto(user),
  );
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.updateProfile(req.user.id, req.body);
    sendResponse(
      res,
      200,
      "User profile updated successfully",
      formatUserDto(user),
    );
  },
);

export const getMyApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.getMyApplications(req.user.id);
    sendResponse(
      res,
      200,
      "User dashboard fetched successfully",
      formatUserDashboardDto(user),
    );
  },
);
