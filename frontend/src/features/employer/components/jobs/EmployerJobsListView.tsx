import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  useGetMyJobsQuery,
  useDeleteJobMutation,
} from "../../store/employerApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

/* ----------------- MOCK DATA ----------------- */

type EmployerJob = {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
  };
  location: string;
  experienceRequired: number;
  salaryMin: number;
  salaryMax: number;
  status: string;
  createdAt: string;
};

/* ----------------- VIEW COMPONENT ----------------- */

const EmployerJobsListView = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJob(jobToDelete).unwrap();
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error("Failed to delete job");
    }
    setJobToDelete(null);
  };

  const handleEdit = (job: EmployerJob) => {
    navigate(`/employer/job/create?jobId=${job.id}`);
  };
  const columns: ColumnDef<EmployerJob>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      header: "Company",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.company.name}</span>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "experienceRequired",
      header: "Experience",
    },
    {
      header: "Salary",
      cell: ({ row }) => {
        const job = row.original;
        return `₹${job.salaryMin} - ₹${job.salaryMax}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        const style =
          status === "OPEN"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

        return <Badge className={style}>{status}</Badge>;
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              View
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleEdit(job)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setJobToDelete(job.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Button onClick={() => navigate('/employer/job/create')}>Create Job</Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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

      <Dialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your job
              and remove its data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJobToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployerJobsListView;
