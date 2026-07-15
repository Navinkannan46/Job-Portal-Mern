import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useGetAdminEmployersQuery } from "../../store/adminApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUpDown } from "lucide-react";


type Employer = {
  id: number;
  companyName: string;
  email: string;
  location: string;
  totalJobs: number;
  status: "Active" | "Blocked";
};



const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};


const AdminEmployersView = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: apiResponse } = useGetAdminEmployersQuery({});

  const data: Employer[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((emp: any) => ({
      id: emp.id,
      companyName: emp.company?.name || "Unknown",
      email: emp.user?.email || "Unknown",
      location: emp.company?.location || "N/A",
      totalJobs: 0,
      status: "Active",
    }));
  }, [apiResponse]);

  const columns = useMemo<ColumnDef<Employer>[]>(
    () => [
      {
        accessorKey: "companyName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "totalJobs",
        header: "Jobs",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Employers Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage all registered employers
          </p>
        </div>
        <Button>Add Employer</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search employers..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No employers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminEmployersView;
