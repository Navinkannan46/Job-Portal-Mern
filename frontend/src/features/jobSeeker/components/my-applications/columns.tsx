import type { ColumnDef } from "@tanstack/react-table";
import type { Application } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

const statusColor = (status: string) => {
  switch (status) {
    case "SHORTLISTED":
    case "HIRED":
      return "bg-primary/10 text-primary border-primary/20";
    case "PENDING":
    case "APPLIED":
    case "REVIEWING":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "REJECTED":
      return "bg-rose-50 text-rose-600 border-rose-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "job.title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Job Title <ArrowUpDown size={14} className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold">{row.original.job.title}</span>
        <span className="text-xs text-slate-500">
          {row.original.job.location} • {row.original.job.jobType.replace("_", " ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "job.company.name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Company <ArrowUpDown size={14} className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.job.company.logo && (
          <img
            src={row.original.job.company.logo}
            alt={row.original.job.company.name}
            className="w-6 h-6 rounded object-contain"
          />
        )}
        <span>{row.original.job.company.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Date <ArrowUpDown size={14} className="ml-2" />
      </Button>
    ),
    cell: ({ getValue }) => format(new Date(getValue() as string), "MMM d, yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Badge variant="outline" className={statusColor(getValue() as string)}>
        {(getValue() as string).charAt(0) + (getValue() as string).slice(1).toLowerCase()}
      </Badge>
    ),
  },
];
