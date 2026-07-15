export const formatJobDto = (job: any) => {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    company: job.company,
    postedBy: job.postedBy,
    skillsRequired: job.skillsRequired,
    location: job.location,
    jobType: job.jobType,
    experienceRequired: job.experienceRequired,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    status: job.status,
    expiresAt: job.expiresAt,
    applicantsCount: job.applicantsCount,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
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
  }));
};
