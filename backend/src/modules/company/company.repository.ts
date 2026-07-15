import { prisma } from "../../config/prisma";

export const createCompany = async (data: any) => {
  return prisma.company.create({
    data,
  });
};

export const findCompanyById = async (id: string) => {
  return prisma.company.findUnique({
    where: { id },
  });
};

export const updateCompany = async (id: string, data: any) => {
  return prisma.company.update({
    where: { id },
    data,
  });
};
export const findAllCompanies = async () => {
  return prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteCompany = async (id: string) => {
  return prisma.company.delete({
    where: { id },
  });
};
