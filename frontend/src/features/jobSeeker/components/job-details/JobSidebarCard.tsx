import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2, Check } from "lucide-react";
import type { Job } from "../../store/jobSeekerApi";
import {
  useApplyForJobMutation,
  useGetProfileQuery,
  useGetApplicationsQuery,
} from "../../store/jobSeekerApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface JobSidebarCardProps {
  job: Job;
}

export default function JobSidebarCard({ job }: JobSidebarCardProps) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated || user?.role !== "USER",
  });

  const { data: applicationsData } = useGetApplicationsQuery(undefined, {
    skip: !isAuthenticated || user?.role !== "USER",
  });

  const hasApplied = applicationsData?.data?.applications?.some(
    (app) => app.job.id === job.id
  );

  const [applyForJob, { isLoading }] = useApplyForJobMutation();

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error("Please login as a Job Seeker to apply.");
      return;
    }

    if (user?.role !== "USER") {
      toast.error("Only job seekers can apply for jobs.");
      return;
    }

    const profile = profileData?.data;

    if (!profile?.resume) {
      toast.error("Please upload your resume in your profile before applying.");
      return;
    }

    try {
      const response = await applyForJob({
        jobId: job.id,
        resume: profile.resume,
      }).unwrap();
      if (response.success) {
        toast.success(`Successfully applied for ${job.title}!`);
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Failed to apply for this job. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="rounded-2xl bg-white shadow-md sticky top-8">
      <CardContent className="p-6 space-y-4">
        {hasApplied ? (
          <Button
            className="w-full text-lg py-6 bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 pointer-events-none cursor-default shadow-none font-semibold rounded-xl flex items-center justify-center gap-2"
            disabled
          >
            <Check size={18} />
            Applied
          </Button>
        ) : (
          <Button
            className="w-full text-lg py-6 group"
            onClick={handleApply}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                Apply Now
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </>
            )}
          </Button>
        )}

        <Separator />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job Type</span>
            <span className="font-semibold">
              {job.jobType
                .replace("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-semibold">
              {job.location || "Not specified"}
            </span>
          </div>

          {(job.salaryMin || job.salaryMax) && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Salary</span>
              <span className="font-semibold text-green-600">
                ${job.salaryMin ? `${job.salaryMin / 1000}k` : "0"} - $
                {job.salaryMax ? `${job.salaryMax / 1000}k` : "N/A"}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Applicants</span>
            <span className="font-semibold">{job.applicantsCount} applied</span>
          </div>

          {job.expiresAt && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires</span>
              <span className="font-semibold text-red-500">
                {new Date(job.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
