import { prisma } from "../../config/prisma";
import { Prisma, User } from "@prisma/client";

export const findByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<User> => {
  return prisma.user.create({
    data,
  });
};
