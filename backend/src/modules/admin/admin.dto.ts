export const formatEmployerProfileDto = (user: any) => {
  if (!user) return null;
  return {
    id: user.employer?.id || user.id,
    userId: user.id,
    companyId: user.employer?.companyId,
    designation: user.employer?.designation,
    isPrimary: user.employer?.isPrimary,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    company: user.employer?.company
      ? {
        id: user.employer.company.id,
        name: user.employer.company.name,
        location: user.employer.company.location,
        logo: user.employer.company.logo,
      }
      : undefined,
    createdAt: user.employer?.createdAt || user.createdAt,
    updatedAt: user.employer?.updatedAt || user.updatedAt,
  };
};

export const formatEmployerProfileListDto = (profiles: any[]) => {
  return profiles.map(formatEmployerProfileDto);
};

import { User, Company, Job, Application } from "@prisma/client";

export const formatUserDto = (user: any) => {
  const profile = user.profile || {};

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    // Flattened profile data
    skills: profile.skills || [],
    resume: profile.resume,
    location: profile.location,
    expectedSalary: profile.expectedSalary,
    bio: profile.bio,
    experiences: (profile.experiences || []).map((exp: any) => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      isCurrentJob: exp.isCurrentJob,
    })),
    educations: (profile.educations || []).map((edu: any) => ({
      id: edu.id,
      degree: edu.degree,
      institution: edu.institution,
      fieldOfStudy: edu.fieldOfStudy,
      startYear: edu.startYear,
      endYear: edu.endYear,
    })),
  };
};

export const formatUsersDto = (users: any[]) => {
  return users.map(formatUserDto);
};

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
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
    createdBy: company.createdBy ? {
      id: company.createdBy.id,
      name: company.createdBy.name,
      email: company.createdBy.email,
    } : undefined,
  };
};

export const formatCompaniesDto = (companies: any[]) => {
  return companies.map(formatCompanyDto);
};

export const formatJobDto = (job: any) => {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    skillsRequired: job.skillsRequired,
    location: job.location,
    jobType: job.jobType,
    experienceRequired: job.experienceRequired,
    educationRequired: job.educationRequired,
    isRemote: job.isRemote,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    status: job.status,
    expiresAt: job.expiresAt,
    applicantsCount: job.applicantsCount,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    company: job.company ? {
      id: job.company.id,
      name: job.company.name,
      logo: job.company.logo,
    } : undefined,
    postedBy: job.postedBy ? {
      id: job.postedBy.id,
      name: job.postedBy.name,
      email: job.postedBy.email,
    } : undefined,
  };
};

export const formatJobsDto = (jobs: any[]) => {
  return jobs.map(formatJobDto);
};

export const formatApplicationDto = (application: any) => {
  return {
    id: application.id,
    status: application.status,
    resume: application.resume,
    coverLetter: application.coverLetter,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    job: application.job ? {
      id: application.job.id,
      title: application.job.title,
      company: application.job.company ? {
        id: application.job.company.id,
        name: application.job.company.name,
      } : undefined,
    } : undefined,
    applicant: application.applicant ? {
      id: application.applicant.id,
      name: application.applicant.name,
      email: application.applicant.email,
    } : undefined,
  };
};

export const formatApplicationsDto = (applications: any[]) => {
  return applications.map(formatApplicationDto);
};
