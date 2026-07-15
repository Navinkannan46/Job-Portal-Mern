import { useParams } from "react-router-dom";
import { useGetJobQuery } from "@/features/jobSeeker/store/jobSeekerApi";
import JobHeaderCard from "@/features/jobSeeker/components/job-details/JobHeaderCard";
import JobOverviewCard from "@/features/jobSeeker/components/job-details/JobOverviewCard";
import JobSidebarCard from "@/features/jobSeeker/components/job-details/JobSidebarCard";
import { Spinner } from "@/components/ui/spinner";

const JobDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetJobQuery(id || "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-red-600">
          Failed to load job details
        </h2>
        <p className="text-muted-foreground">
          The job listing might have been removed or you may have entered an
          invalid ID.
        </p>
      </div>
    );
  }

  const job = data.data;

  return (
    <div className="bg-slate-100 min-h-screen mt-16 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <JobHeaderCard job={job} />
          <JobOverviewCard job={job} />
        </div>
        <div>
          <JobSidebarCard job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
