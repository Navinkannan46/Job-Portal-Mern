import {
  createCompany,
  deleteCompany,
  findAllCompanies,
  findCompanyById,
  updateCompany,
} from "./company.repository";
import { createCompanySchema, updateCompanySchema } from "./company.validation";
import { AppError } from "../../common/errors/AppError";
import { Role } from "../../common/constants/role.enum";

export const createCompanyService = async (data: any, userId: string) => {
  const validatedData = createCompanySchema.parse(data);

  const company = await createCompany({
    ...validatedData,
    createdById: userId,
  });

  return company;
};

export const updateCompanyService = async (
  id: string,
  data: any,
  userId: string,
  userRole: string,
) => {
  // Check if company exists
  const company = await findCompanyById(id);
  if (!company) {
    throw new AppError("Company not found", 404);
  }

  // Authorization: Only the owner or an ADMIN can update
  if (company.createdById !== userId && userRole !== Role.ADMIN) {
    throw new AppError("You are not authorized to update this company", 403);
  }

  // Validate data
  const validatedData = updateCompanySchema.parse(data);

  // Update company
  const updatedCompany = await updateCompany(id, validatedData);

  return updatedCompany;
};
export const getAllCompaniesService = async () => {
  return findAllCompanies();
};

export const getCompanyDetailsService = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const company = await findCompanyById(id);
  if (!company) {
    throw new AppError("Company not found", 404);
  }

  if (company.createdById !== userId && userRole !== Role.ADMIN) {
    throw new AppError(
      "You are not authorized to view this company's details",
      403,
    );
  }

  return company;
};

export const deleteCompanyService = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const company = await findCompanyById(id);
  if (!company) {
    throw new AppError("Company not found", 404);
  }

  // Authorization: Only the owner or an ADMIN can delete
  if (company.createdById !== userId && userRole !== Role.ADMIN) {
    throw new AppError("You are not authorized to delete this company", 403);
  }

  await deleteCompany(id);
  return { success: true };
};
