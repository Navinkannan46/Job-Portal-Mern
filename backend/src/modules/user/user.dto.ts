import { User } from "@prisma/client";

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
export const formatUserDashboardDto = (user: any) => {
  const profile = user.profile || {};
  const applications = user.applications || [];

  const stats = {
    totalSent: applications.length,
    shortlisted: applications.filter((app: any) =>
      ["SHORTLISTED"].includes(app.status),
    ).length,
    hired: applications.filter((app: any) =>
      ["HIRED"].includes(app.status),
    ).length,
    rejected: applications.filter((app: any) => app.status === "REJECTED")
      .length,
  };

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    // Profile info
    skills: profile.skills || [],
    resume: profile.resume,
    location: profile.location,
    bio: profile.bio,
    stats,
    applications: applications.map((app: any) => ({
      id: app.id,
      status: app.status,
      createdAt: app.createdAt,
      job: {
        id: app.job.id,
        title: app.job.title,
        location: app.job.location,
        jobType: app.job.jobType,
        company: {
          id: app.job.company.id,
          name: app.job.company.name,
          logo: app.job.company.logo,
          location: app.job.company.location,
        },
      },
    })),
  };
};
export const formatUsersDto = (users: User[]) => {
  return users.map(formatUserDto);
};
