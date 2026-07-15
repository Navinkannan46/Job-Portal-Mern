import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const TableSearch = ({ globalFilter, setGlobalFilter, table }: any) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="relative max-w-md w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          placeholder="Search jobs or company..."
          className="pl-10"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <select
        className="border rounded-md px-3 py-2"
        onChange={(e) =>
          table.getColumn("status")?.setFilterValue(e.target.value || undefined)
        }
      >
        <option value="">All Status</option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};
