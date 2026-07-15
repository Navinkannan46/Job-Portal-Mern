import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export interface TokenPayload extends jwt.JwtPayload {
  id: string;
}

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET as string, {
    expiresIn: "15m", // Short lived access token
  });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET as string, {
    expiresIn: "7d", // Longer lived refresh token
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET as string) as TokenPayload;
};
