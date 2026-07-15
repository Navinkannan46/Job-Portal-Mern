import { Download } from "lucide-react";

/* ----------------- MOCK DATA ----------------- */

import toast from "react-hot-toast";

import { useGetApplicantsQuery, useUpdateApplicantStatusMutation } from "../../store/employerApi";

const statusOptions = [
  "APPLIED",
  "REVIEWING",
  "SHORTLISTED",
  "HIRED",
  "REJECTED",
];

const statusColors: Record<string, string> = {
  APPLIED: "bg-muted text-muted-foreground",
  REVIEWING: "bg-info/10 text-info",
  SHORTLISTED: "bg-warning/10 text-warning",
  HIRED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
};

/* ----------------- VIEW COMPONENT ----------------- */

const ManageApplicantsView = () => {
  const { data: applicantsResponse, isLoading } = useGetApplicantsQuery();
  const [updateApplicantStatus] = useUpdateApplicantStatusMutation();
  const applicants = applicantsResponse?.data || [];

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateApplicantStatus({ id, status }).unwrap();
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className=" p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-1">Manage Applicants</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Review and manage job applications
      </p>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Applicant
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Job Title
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Resume
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Applied Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    Loading applicants...
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    No applicants found.
                  </td>
                </tr>
              ) : (
                applicants.map((app: any) => (
                  <tr
                    key={app.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {app.applicant?.name?.charAt(0) || "U"}
                        </div>
                        <span className="text-sm font-medium">{app.applicant?.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {app.job?.title}
                    </td>
                    <td className="px-5 py-3.5">
                      {(app.resume || app.applicant?.profile?.resume) ? (
                        <a href={app.resume || app.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                          <Download className="w-3.5 h-3.5" /> Download
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">No Resume</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-muted"}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-input bg-background text-xs outline-none focus:ring-2 focus:ring-ring uppercase"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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

export default ManageApplicantsView;
