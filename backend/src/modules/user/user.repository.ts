import { prisma } from "../../config/prisma";
import { User, Prisma } from "@prisma/client";

export const findById = async (id: string) => {
  return prisma.user.findFirst({
    where: { id },
    include: {
      profile: {
        include: {
          experiences: {
            orderBy: { startDate: "desc" },
          },
          educations: {
            orderBy: { startYear: "desc" },
          },
        },
      },
    },
  });
};

export const findAll = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: {
      profile: true,
    },
  });
};

export const update = async (
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
    include: {
      profile: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};

export const getMyApplications = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        include: {
          experiences: {
            orderBy: { startDate: "desc" },
          },
          educations: {
            orderBy: { startYear: "desc" },
          },
        },
      },
      applications: {
        include: {
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                  location: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
// --- Profile Specific Repository Methods ---

export const upsertProfile = async (
  userId: string,
  data: Partial<Prisma.UserProfileCreateInput>,
) => {
  const { experiences, educations, ...profileData } = data as any;

  return prisma.userProfile.upsert({
    where: { userId },
    update: profileData,
    create: {
      ...profileData,
      userId,
    },
  });
};

export const updateExperiences = async (
  profileId: string,
  experiences: any[],
) => {
  await prisma.experience.deleteMany({
    where: { userProfileId: profileId },
  });

  if (experiences.length > 0) {
    await prisma.experience.createMany({
      data: experiences.map((exp) => ({
        ...exp,
        userProfileId: profileId,
      })),
    });
  }
};

export const updateEducations = async (
  profileId: string,
  educations: any[],
) => {
  await prisma.education.deleteMany({
    where: { userProfileId: profileId },
  });

  if (educations.length > 0) {
    await prisma.education.createMany({
      data: educations.map((edu) => ({
        ...edu,
        userProfileId: profileId,
      })),
    });
  }
};
