import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { logger } from "../logger/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = 500;
    message = "Internal Server Error";
    logger.error("Unexpected Error", err);
  } else {
    logger.warn(`Operational Error: ${message}`);
  }

  res.status(statusCode || 500).json({
    success: false,
    message: message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
