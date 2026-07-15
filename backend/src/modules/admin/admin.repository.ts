import { prisma } from "../../config/prisma";

export const findAllEmployerProfiles = async () => {
  return prisma.user.findMany({
    where: { role: "EMPLOYER" },
    include: {
      employer: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findEmployerProfileByUserId = async (userId: string) => {
  return prisma.employerProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      company: true,
    },
  });
};

export const findById = async (id: string) => {
  return prisma.user.findUnique({
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

export const findAllUsers = async () => {
  return prisma.user.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findAllCompanies = async () => {
  return prisma.company.findMany({
    include: {
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findAllJobs = async () => {
  return prisma.job.findMany({
    include: {
      company: true,
      postedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findAllApplications = async () => {
  return prisma.application.findMany({
    include: {
      job: {
        include: {
          company: true,
        },
      },
      applicant: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
