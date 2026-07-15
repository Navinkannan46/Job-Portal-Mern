import {
  Briefcase,
  Users,
  UserCheck,
  Award,
  Eye,
  Plus,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetMyJobsQuery,
  useGetApplicantsQuery,
} from "../../store/employerApi";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  APPLIED: "bg-muted text-muted-foreground",
  REVIEWING: "bg-info/10 text-info",
  SHORTLISTED: "bg-warning/10 text-warning",
  INTERVIEW: "bg-primary/10 text-primary",
  HIRED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
};

/* ----------------- VIEW COMPONENT ----------------- */

const EmployerDashboardView = () => {
  const { data: jobsRes, isLoading: isJobsLoading } = useGetMyJobsQuery();
  const { data: applicantsRes, isLoading: isApplicantsLoading } =
    useGetApplicantsQuery();

  if (isJobsLoading || isApplicantsLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  const jobs = jobsRes?.data || [];
  const applicants = applicantsRes?.data || [];

  const shortlistedCount = applicants.filter(
    (app) => app.status === "SHORTLISTED"
  ).length;
  const hiredCount = applicants.filter((app) => app.status === "HIRED").length;

  const stats = [
    {
      label: "Total Jobs Posted",
      value: jobs.length.toString(),
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "Total Applicants",
      value: applicants.length.toString(),
      icon: Users,
      color: "text-info",
    },
    {
      label: "Shortlisted",
      value: shortlistedCount.toString(),
      icon: UserCheck,
      color: "text-warning",
    },
    {
      label: "Hired",
      value: hiredCount.toString(),
      icon: Award,
      color: "text-success",
    },
  ];

  // Get the 5 most recent applications
  const recentApplications = [...applicants]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className=" p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/employer/companies/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Building2 className="w-4 h-4" /> Create Company
          </Link>
          <Link
            to="/employer/job/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Create Job
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-card shadow-md border-2 rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent applications table */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold">Recent Applications</h2>
          <Link
            to="/employer/applications"
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            <Eye className="w-4 h-4" /> View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Applicant
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Job Title
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-muted-foreground text-sm"
                  >
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {app.applicant.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">
                          {app.applicant.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {app.job.title}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {format(new Date(app.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[app.status] || statusColors.APPLIED
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardView;
