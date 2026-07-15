import { prisma } from "../../config/prisma";
import { Job, Prisma } from "@prisma/client";

export const findActiveJobs = async (
  filters?: {
    search?: string;
    location?: string;
    experienceLevel?: string;
    salaryMin?: number;
    sort?: string;
  }
): Promise<Job[]> => {
  const andConditions: Prisma.JobWhereInput[] = [
    { status: "OPEN" }
  ];

  if (filters?.search) {
    const searchLower = filters.search.trim();
    andConditions.push({
      OR: [
        { title: { contains: searchLower, mode: 'insensitive' } },
        { description: { contains: searchLower, mode: 'insensitive' } },
        { company: { name: { contains: searchLower, mode: 'insensitive' } } }
      ]
    });
  }

  if (filters?.location) {
    const locationLower = filters.location.trim();
    if (locationLower.toLowerCase() === 'remote') {
      andConditions.push({
        OR: [
          { isRemote: true },
          { location: { contains: locationLower, mode: 'insensitive' } }
        ]
      });
    } else {
      andConditions.push({
        location: { contains: locationLower, mode: 'insensitive' }
      });
    }
  }

  if (filters?.experienceLevel && filters.experienceLevel !== 'all') {
    if (filters.experienceLevel === 'entry') {
      andConditions.push({ experienceRequired: { lte: 2 } });
    } else if (filters.experienceLevel === 'mid') {
      andConditions.push({ experienceRequired: { gt: 2, lte: 5 } });
    } else if (filters.experienceLevel === 'senior') {
      andConditions.push({ experienceRequired: { gt: 5 } });
    }
  }

  if (filters?.salaryMin !== undefined) {
    andConditions.push({
      OR: [
        { salaryMax: { gte: filters.salaryMin } },
        { salaryMin: { gte: filters.salaryMin } }
      ]
    });
  }

  const where: Prisma.JobWhereInput = {
    AND: andConditions
  };

  let orderBy: Prisma.JobOrderByWithRelationInput = {
    createdAt: "desc"
  };

  if (filters?.sort === 'new') {
    orderBy = { createdAt: 'desc' };
  } else if (filters?.sort === 'salary') {
    orderBy = { salaryMax: 'desc' };
  } else if (filters?.sort === 'relevant') {
    orderBy = { createdAt: 'desc' };
  }

  return prisma.job.findMany({
    where,
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
    orderBy,
  });
};

export const findJobById = async (id: string): Promise<Job | null> => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          description: true,
          logo: true,
          website: true,
          location: true,
          industry: true,
        },
      },
      postedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const findAllJobs = async (): Promise<Job[]> => {
  return prisma.job.findMany({
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

export const createJob = async (data: any): Promise<Job> => {
  return prisma.job.create({
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

export const updateJob = async (id: string, data: any): Promise<Job> => {
  return prisma.job.update({
    where: { id },
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

export const deleteJob = async (id: string): Promise<Job> => {
  return prisma.$transaction(async (tx) => {
    await tx.application.deleteMany({
      where: { jobId: id },
    });
    return tx.job.delete({
      where: { id },
    });
  });
};
