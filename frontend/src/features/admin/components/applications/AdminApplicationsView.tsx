import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { useGetAdminApplicationsQuery } from "../../store/adminApi";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, FileText, ArrowRightLeft } from "lucide-react";

type Application = {
  id: string;
  applicant: string;
  jobTitle: string;
  company: string;
  resume: string;
  status: "applied" | "shortlisted" | "rejected" | "hired";
  appliedDate: string;
};


const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700",
    shortlisted: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    hired: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
};

function DataTablePagination<TData>({
  table,
}: {
  table: TanstackTable<TData>;
}) {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const AdminApplicationsView = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");

  const { data: apiResponse } = useGetAdminApplicationsQuery({});

  const applicationsData: Application[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((app: any) => ({
      id: app.id,
      applicant: app.applicant?.name || "Unknown",
      jobTitle: app.job?.title || "Unknown",
      company: app.job?.company?.name || "Unknown",
      resume: app.resume || "No resume",
      status: app.status.toLowerCase(),
      appliedDate: new Date(app.createdAt).toLocaleDateString(),
    }));
  }, [apiResponse]);

  const filteredData = useMemo(() => {
    return applicationsData.filter((app) => {
      const matchesSearch =
        app.applicant.toLowerCase().includes(globalFilter.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(globalFilter.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      const matchesCompany =
        companyFilter === "all" || app.company === companyFilter;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [applicationsData, globalFilter, statusFilter, companyFilter]);

  const columns: ColumnDef<Application>[] = [
    { accessorKey: "applicant", header: "Applicant" },
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "company", header: "Company" },
    {
      accessorKey: "resume",
      header: "Resume",
      cell: ({ row }) => (
        <span className="text-primary text-sm cursor-pointer hover:underline">
          {row.original.resume}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    { accessorKey: "appliedDate", header: "Applied Date" },
    {
      id: "actions",
      header: "",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Applications Management</h1>
        <p className="text-muted-foreground">
          Review and manage all job applications.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-9 h-9"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setCompanyFilter}>
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="TechCorp">TechCorp</SelectItem>
            <SelectItem value="InnovateCo">InnovateCo</SelectItem>
            <SelectItem value="DesignHub">DesignHub</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
};

export default AdminApplicationsView;
