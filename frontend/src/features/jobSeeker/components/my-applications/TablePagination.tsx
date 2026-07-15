import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TablePagination = ({ table, pagination }: any) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">
        Page {pagination.pageIndex + 1} of {table.getPageCount()}
      </span>

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={16} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
