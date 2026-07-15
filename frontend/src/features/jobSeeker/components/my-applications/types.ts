import type {
  ApplicationStatus,
  JobStatus,
  JobType,
} from "../../store/jobSeekerApi";

export type Application = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  job: {
    id: string;
    title: string;
    status: JobStatus;
    location: string;
    jobType: JobType;
    company: {
      id: string;
      name: string;
      logo?: string;
    };
  };
};
