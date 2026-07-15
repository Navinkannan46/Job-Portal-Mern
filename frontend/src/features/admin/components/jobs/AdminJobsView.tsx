"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useGetAdminJobsQuery } from "../../store/adminApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

import {
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  salary: string;
  status: "active" | "pending" | "expired" | "rejected";
  createdDate: string;
};

const AdminJobsView = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: apiResponse } = useGetAdminJobsQuery({});

  const jobsData: Job[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company?.name || "Unknown",
      category: job.jobType || "N/A",
      location: job.location || "Remote",
      salary: job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax}` : "Not Disclosed",
      status: job.status.toLowerCase(),
      createdDate: new Date(job.createdAt).toLocaleDateString(),
    }));
  }, [apiResponse]);

  const filteredData = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        job.company.toLowerCase().includes(globalFilter.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobsData, globalFilter, statusFilter]);

  const columns: ColumnDef<Job>[] = [
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "salary",
      header: "Salary",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize font-medium">{row.original.status}</span>
      ),
    },
    {
      accessorKey: "createdDate",
      header: "Created",
    },
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
              <Eye className="h-4 w-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckCircle className="h-4 w-4 mr-2" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem>
              <XCircle className="h-4 w-4 mr-2" /> Reject
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Jobs Management</h1>
          <p className="text-muted-foreground">Manage all job listings</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add Job
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
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

      <div className="flex justify-end gap-2">
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
};

export default AdminJobsView;
