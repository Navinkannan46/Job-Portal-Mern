export const formatCompanyDto = (company: any) => {
  return {
    id: company.id,
    name: company.name,
    description: company.description,
    website: company.website,
    logo: company.logo,
    location: company.location,
    industry: company.industry,
    companySize: company.companySize,
    foundedYear: company.foundedYear,
    isVerified: company.isVerified,
    createdById: company.createdById,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
};

export const formatCompanyListDto = (companies: any[]) => {
  return companies.map(formatCompanyDto);
};
