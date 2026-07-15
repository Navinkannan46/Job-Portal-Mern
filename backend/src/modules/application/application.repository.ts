import { prisma } from "../../config/prisma";
import { Application } from "@prisma/client";

export const createApplication = async (data: {
  jobId: string;
  applicantId: string;
  resume?: string;
  coverLetter?: string;
}): Promise<Application> => {
  return prisma.application.create({
    data,
    include: {
      job: {
        select: {
          id: true,
          title: true,
          status: true,
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      },
    },
  });
};

export const findApplicationByJobAndUser = async (
  jobId: string,
  applicantId: string,
): Promise<Application | null> => {
  return prisma.application.findUnique({
    where: {
      jobId_applicantId: {
        jobId,
        applicantId,
      },
    },
  });
};
