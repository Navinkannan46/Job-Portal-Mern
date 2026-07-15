import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import {
  registerServices,
  loginServices,
  refreshTokenService,
} from "./auth.service";
import { sendResponse } from "../../common/utils/response";
import { formatAuthResponseDto, formatUserDto } from "./auth.dto";
import { AppError } from "../../common/errors/AppError";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15m
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7d

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await registerServices(req.body);

  res.cookie("accessToken", data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookie("refreshToken", data.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  sendResponse(
    res,
    201,
    "User registered successfully",
    formatAuthResponseDto(data.user, data.accessToken, data.refreshToken),
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await loginServices(req.body);

  res.cookie("accessToken", data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookie("refreshToken", data.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  sendResponse(
    res,
    200,
    "Login successful",
    formatAuthResponseDto(data.user, data.accessToken, data.refreshToken),
  );
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  const data = await refreshTokenService(refreshToken);

  res.cookie("accessToken", data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  sendResponse(res, 200, "Token refreshed successfully", data);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  sendResponse(res, 200, "Logged out successfully");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("User not found", 404);
  }

  sendResponse(
    res,
    200,
    "User profile retrieved successfully",
    formatUserDto(req.user),
  );
});
