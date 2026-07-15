import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/token.util";
import { prisma } from "../../config/prisma";

// Extend express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in. Please log in to get access.",
          401,
        ),
      );
    }

    const decoded = verifyToken(token);

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        employer: true,
      },
    });

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401,
        ),
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(new AppError("Invalid or expired token", 401));
  }
};
