export const formatEmployerProfileDto = (profile: any) => {
  if (!profile) return null;
  return {
    id: profile.id,
    userId: profile.userId,
    companyId: profile.companyId,
    designation: profile.designation,
    isPrimary: profile.isPrimary,
    user: profile.user
      ? {
          id: profile.user.id,
          name: profile.user.name,
          email: profile.user.email,
          phone: profile.user.phone,
        }
      : undefined,
    company: profile.company
      ? {
          id: profile.company.id,
          name: profile.company.name,
          location: profile.company.location,
          logo: profile.company.logo,
        }
      : undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
};

export const formatEmployerProfileListDto = (profiles: any[]) => {
  return profiles.map(formatEmployerProfileDto);
};

export const formatJobListDto = (jobs: any[]) => {
  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    jobType: job.jobType,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    createdAt: job.createdAt,
    experienceRequired: job.experienceRequired,
    status: job.status,
  }));
};

export const formatEmployerApplicantDto = (application: any) => {
  return {
    id: application.id,
    status: application.status,
    createdAt: application.createdAt,
    resume: application.resume,
    coverLetter: application.coverLetter,
    job: application.job,
    applicant: application.applicant,
  };
};

export const formatEmployerApplicantListDto = (applications: any[]) => {
  return applications.map(formatEmployerApplicantDto);
};
