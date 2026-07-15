import { Button } from "@/components/ui/button";
import { type Table as TanstackTable } from "@tanstack/react-table";

export function DataTablePagination<TData>({
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
