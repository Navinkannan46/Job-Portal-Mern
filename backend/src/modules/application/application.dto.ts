export const formatApplicationDto = (application: any) => {
  return {
    id: application.id,
    status: application.status,
    createdAt: application.createdAt,
    job: {
      id: application.job.id,
      title: application.job.title,
      status: application.job.status,
      company: application.job.company,
    },
    resume: application.resume,
    coverLetter: application.coverLetter,
  };
};

export const formatApplicationListDto = (applications: any[]) => {
  return applications.map(formatApplicationDto);
};
