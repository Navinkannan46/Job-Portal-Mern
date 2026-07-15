import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const roleMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You do not have permission to perform this action. Expected ${roles.join(",")}, got ${req.user.role}`, 403),
      );
    }

    next();
  };
};
