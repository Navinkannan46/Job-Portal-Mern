import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetAdminCompaniesQuery } from "../../store/adminApi";
import { useMemo } from "react";

import { Input } from "@/components/ui/input";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MoreHorizontal,
  Eye,
  XCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";


export type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  totalJobs: number;
  owner: string;
  verification: "Verified" | "Pending" | "Rejected";
  createdDate: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
};



const StatusBadge = ({ status }: { status: string }) => {
  const colors =
    status === "Verified"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 text-xs rounded-md ${colors}`}>{status}</span>
  );
};


const AdminCompaniesView = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { data: apiResponse } = useGetAdminCompaniesQuery({});

  const companiesData: Company[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((company: any) => ({
      id: company.id,
      name: company.name,
      industry: company.industry || "N/A",
      location: company.location || "N/A",
      totalJobs: 0,
      owner: company.createdBy?.name || "Unknown",
      verification: company.isVerified ? "Verified" : "Pending",
      createdDate: new Date(company.createdAt).toLocaleDateString(),
      description: company.description || "No description provided.",
      website: company.website || "N/A",
      email: company.createdBy?.email || "N/A",
      phone: "N/A",
      address: company.location || "N/A",
    }));
  }, [apiResponse]);

  const columns: ColumnDef<Company>[] = [
    { accessorKey: "name", header: "Company Name" },
    { accessorKey: "industry", header: "Industry" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "totalJobs", header: "Jobs" },
    { accessorKey: "owner", header: "Owner" },
    {
      accessorKey: "verification",
      header: "Verification",
      cell: ({ row }) => <StatusBadge status={row.original.verification} />,
    },
    { accessorKey: "createdDate", header: "Created" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedCompany(company)}>
                <Eye className="h-4 w-4 mr-2" /> View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className="h-4 w-4 mr-2" /> Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: companiesData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-2xl font-bold">Company Management</h1>
        <p className="text-muted-foreground">
          Manage registered companies and verifications.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Table className="border">
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

        <div className="flex justify-end p-4 gap-2">
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

      <Dialog
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCompany?.name}</DialogTitle>
          </DialogHeader>

          {selectedCompany && (
            <div className="space-y-3 text-sm">
              <p>{selectedCompany.description}</p>
              <Separator />
              <p>
                <Globe className="inline h-4 w-4 mr-2" />
                {selectedCompany.website}
              </p>
              <p>
                <Mail className="inline h-4 w-4 mr-2" />
                {selectedCompany.email}
              </p>
              <p>
                <Phone className="inline h-4 w-4 mr-2" />
                {selectedCompany.phone}
              </p>
              <p>
                <MapPin className="inline h-4 w-4 mr-2" />
                {selectedCompany.address}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCompaniesView;
