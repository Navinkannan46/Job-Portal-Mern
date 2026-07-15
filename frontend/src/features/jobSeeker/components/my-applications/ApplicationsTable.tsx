import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";

import { columns } from "./columns";
import { TableSearch } from "./TableSearch";
import { TableContent } from "./TableContent";
import { TablePagination } from "./TablePagination";
import type { Application } from "./types";

interface ApplicationsTableProps {
  data: Application[];
}

export default function ApplicationsTable({ data }: ApplicationsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      columnFilters,
      pagination,
    },

    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    // ✅ NO FUZZY
    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6 bg-white">
        <TableSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
        />

        <TableContent table={table} columns={columns} />

        <TablePagination table={table} pagination={pagination} />
      </CardContent>
    </Card>
  );
}
