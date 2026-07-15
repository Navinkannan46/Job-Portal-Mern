import { Job, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";

export const findEmployerProfileByUserId = async (userId: string) => {
  return prisma.user.findFirst({
    where: { id: userId },
    include: {
      employer: true,
    },
  });
};

export const updateEmployerProfile = async (userId: string, data: any) => {
  const { companyId, designation, isPrimary, ...userData } = data;

  const updateData: any = {
    ...userData,
  };

  if (companyId || designation || isPrimary !== undefined) {
    updateData.employer = {
      update: {
        ...(companyId && { companyId }),
        ...(designation && { designation }),
        ...(isPrimary !== undefined && { isPrimary }),
      },
    };
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    include: {
      employer: true,
    },
  });
};

export const findCompaniesByUserId = async (userId: string) => {
  return prisma.company.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findJobsId = async (userId: string) => {
  return prisma.job.findMany({
    where: {
      postedById: userId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateEmployerJob = async (jobId: string, employerId: string, data: any) => {
  return prisma.job.update({
    where: { 
      id: jobId,
      postedById: employerId
    },
    data,
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
  });
};

export const deleteEmployerJob = async (jobId: string, employerId: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.application.deleteMany({
      where: { jobId },
    });
    return tx.job.delete({
      where: { 
        id: jobId,
        postedById: employerId
      },
    });
  });
};

export const findApplicantsByEmployerId = async (employerId: string) => {
  return prisma.application.findMany({
    where: {
      job: {
        postedById: employerId
      }
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          status: true,
        }
      },
      applicant: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profile: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const updateApplicationStatus = async (applicationId: string, employerId: string, status: any) => {
  // First verify the application belongs to a job posted by the employer
  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      job: {
        postedById: employerId
      }
    }
  });

  if (!application) {
    return null;
  }

  return prisma.application.update({
    where: {
      id: applicationId
    },
    data: {
      status
    }
  });
};
