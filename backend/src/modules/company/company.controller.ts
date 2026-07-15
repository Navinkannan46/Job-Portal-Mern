import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { sendResponse } from "../../common/utils/response";
import {
  createCompanyService,
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyDetailsService,
  updateCompanyService,
} from "./company.service";
import { formatCompanyDto, formatCompanyListDto } from "./company.dto";
import { AppError } from "../../common/errors/AppError";
import { Role } from "../../common/constants/role.enum";

export const createCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await createCompanyService(req.body, req.user.id);
    sendResponse(
      res,
      201,
      "Company created successfully",
      formatCompanyDto(company),
    );
  },
);

export const updateCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await updateCompanyService(
      id as string,
      req.body,
      req.user.id,
      req.user.role,
    );

    sendResponse(
      res,
      200,
      "Company updated successfully",
      formatCompanyDto(company),
    );
  },
);
export const getAllCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    const companies = await getAllCompaniesService();
    sendResponse(
      res,
      200,
      "Companies retrieved successfully",
      formatCompanyListDto(companies),
    );
  },
);

export const getCompanyDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await getCompanyDetailsService(
      id as string,
      req.user.id,
      req.user.role,
    );

    sendResponse(
      res,
      200,
      "Company details retrieved successfully",
      formatCompanyDto(company),
    );
  },
);

export const deleteCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteCompanyService(id as string, req.user.id, req.user.role);

    sendResponse(res, 200, "Company deleted successfully");
  },
);
