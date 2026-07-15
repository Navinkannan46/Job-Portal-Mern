import {
  Briefcase,
  Building2,
  Users,
  FileText,
  UserSearch,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  useGetAdminJobsQuery,
  useGetAdminApplicationsQuery,
  useGetAdminCompaniesQuery,
  useGetAdminUsersQuery,
  useGetAdminEmployersQuery,
} from "../../store/adminApi";


type Job = {
  id: number;
  title: string;
  company: string;
  status: string;
};

type Application = {
  id: number;
  applicant: string;
  jobTitle: string;
  status: string;
};

function DataTable<T>({
  columns,
  data,
}: {
  columns: ColumnDef<T>[];
  data: T[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border rounded-lg">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-3 text-left text-sm font-semibold "
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-t">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3 text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const AdminDashboardView = () => {
  const { data: jobsResp } = useGetAdminJobsQuery({});
  const { data: appsResp } = useGetAdminApplicationsQuery({});
  const { data: companiesResp } = useGetAdminCompaniesQuery({});
  const { data: usersResp } = useGetAdminUsersQuery({});
  const { data: employersResp } = useGetAdminEmployersQuery({});

  const dashboardStats = {
    totalJobs: jobsResp?.data?.length || 0,
    totalEmployers: employersResp?.data?.length || 0,
    totalJobSeekers: usersResp?.data?.length || 0,
    totalApplications: appsResp?.data?.length || 0,
    totalCompanies: companiesResp?.data?.length || 0,
  };

  const recentJobs: Job[] = (jobsResp?.data || [])
    .slice(0, 5)
    .map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company?.name || "Unknown",
      status: job.status,
    }));

  const recentApplications: Application[] = (appsResp?.data || [])
    .slice(0, 5)
    .map((app: any) => ({
      id: app.id,
      applicant: app.applicant?.name || "Unknown",
      jobTitle: app.job?.title || "Unknown",
      status: app.status,
    }));

  const stats = [
    {
      label: "Total Jobs",
      value: dashboardStats.totalJobs,
      icon: Briefcase,
      change: "+12%",
      up: true,
    },
    {
      label: "Total Employers",
      value: dashboardStats.totalEmployers,
      icon: Building2,
      change: "+8%",
      up: true,
    },
    {
      label: "Total Job Seekers",
      value: dashboardStats.totalJobSeekers,
      icon: UserSearch,
      change: "+24%",
      up: true,
    },
    {
      label: "Total Applications",
      value: dashboardStats.totalApplications,
      icon: FileText,
      change: "+18%",
      up: true,
    },
    {
      label: "Total Companies",
      value: dashboardStats.totalCompanies,
      icon: Users,
      change: "-3%",
      up: false,
    },
  ];

  const jobColumns: ColumnDef<Job>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "status", header: "Status" },
  ];

  const applicationColumns: ColumnDef<Application>[] = [
    { accessorKey: "applicant", header: "Applicant" },
    { accessorKey: "jobTitle", header: "Job" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here’s what’s happening in your portal.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <stat.icon className="w-6 h-6 text-blue-500" />
              <span
                className={`text-xs font-medium flex items-center gap-1 ${stat.up ? "text-green-600" : "text-red-600"
                  }`}
              >
                {stat.up ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold">{stat.value.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Jobs</h2>
        <DataTable columns={jobColumns} data={recentJobs} />
      </div>

      {/* Recent Applications */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Applications</h2>
        <DataTable columns={applicationColumns} data={recentApplications} />
      </div>
    </div>
  );
};

export default AdminDashboardView;
