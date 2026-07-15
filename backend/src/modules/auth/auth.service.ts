import bcrypt from "bcryptjs";
import { createUser, findByEmail } from "./auth.repository";
import { AppError } from "../../common/errors/AppError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../common/utils/token.util";
import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.validation";

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export const registerServices = async (data: RegisterInput) => {
  // Validate input
  const validatedData = registerSchema.parse(data);

  const existingUser = await findByEmail(validatedData.email);
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 12);

  const user = await createUser({
    ...validatedData,
    password: hashedPassword,
    role: validatedData.role as any,
  });

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });
  return { user, accessToken, refreshToken };
};

export const loginServices = async (data: LoginInput) => {
  // Validate input
  const validatedData = loginSchema.parse(data);

  const user = await findByEmail(validatedData.email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(validatedData.password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });
  return { user, accessToken, refreshToken };
};

export const refreshTokenService = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    const accessToken = generateAccessToken({ id: decoded.id });
    return { accessToken };
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }
};
