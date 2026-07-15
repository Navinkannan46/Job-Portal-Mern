import { User } from "@prisma/client";

export const formatUserDto = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    employerProfile: user.employer
      ? {
          id: user.employer.id,
          companyId: user.employer.companyId,
          designation: user.employer.designation,
        }
      : null,
    createdAt: user.createdAt,
  };
};

export const formatAuthResponseDto = (
  user: User,
  accessToken: string,
  refreshToken?: string,
) => {
  return {
    user: formatUserDto(user),
    accessToken,
    refreshToken,
  };
};
