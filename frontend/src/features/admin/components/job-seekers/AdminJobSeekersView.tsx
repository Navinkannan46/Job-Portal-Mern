import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetAdminUsersQuery } from "../../store/adminApi";

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
import { Search, MoreHorizontal, Eye, Ban, Trash2 } from "lucide-react";

type JobSeeker = {
  id: number;
  name: string;
  email: string;
  skills: string;
  experience: string;
  appliedJobs: number;
  status: "Active" | "Blocked";
};


const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
        }`}
    >
      {status}
    </span>
  );
};

const AdminJobSeekersView = () => {
  const [search, setSearch] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");

  const { data: apiResponse } = useGetAdminUsersQuery({});

  const jobSeekersData: JobSeeker[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      skills: user.skills?.length ? user.skills.join(", ") : "N/A",
      experience: user.experiences?.length > 0 ? "Experienced" : "Fresher",
      appliedJobs: 0,
      status: user.status === "ACTIVE" ? "Active" : "Blocked",
    }));
  }, [apiResponse]);

  const filteredData = useMemo(() => {
    return jobSeekersData.filter((seeker) => {
      const matchesSearch =
        seeker.name.toLowerCase().includes(search.toLowerCase()) ||
        seeker.email.toLowerCase().includes(search.toLowerCase());

      const matchesExperience =
        experienceFilter === "all" || seeker.experience === experienceFilter;

      return matchesSearch && matchesExperience;
    });
  }, [jobSeekersData, search, experienceFilter]);

  const columns = useMemo<ColumnDef<JobSeeker>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "skills",
        header: "Skills",
      },
      {
        accessorKey: "experience",
        header: "Experience",
      },
      {
        accessorKey: "appliedJobs",
        header: "Applied Jobs",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Ban className="h-4 w-4 mr-2" /> Block
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    < >
      <div className="mb-6 ">
        <h1 className="text-2xl font-bold">Job Seekers Management</h1>
        <p className="text-muted-foreground">
          Manage job seeker profiles and accounts.
        </p>
      </div>

      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search job seekers..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={experienceFilter} onValueChange={setExperienceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience</SelectItem>
            <SelectItem value="1-3 years">1-3 years</SelectItem>
            <SelectItem value="3-5 years">3-5 years</SelectItem>
            <SelectItem value="5+ years">5+ years</SelectItem>
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
            {table.getRowModel().rows.length ? (
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default AdminJobSeekersView;
