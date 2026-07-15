import JobSearch from "@/features/jobSeeker/components/job-list/JobSearchBar";
import JobSidebar from "@/features/jobSeeker/components/job-list/JobFiltersSidebar";
import JobCard from "@/features/jobSeeker/components/job-list/JobCard";
import Pagination from "@/features/jobSeeker/components/job-list/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetJobsQuery } from "../../store/jobSeekerApi";
import { Loader2 } from "lucide-react";

import { useState } from "react";

/* ----------------- VIEW COMPONENT ----------------- */

const JobListView = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [salaryMin, setSalaryMin] = useState(50);
  const [sort, setSort] = useState("relevant");

  const { data: response, isLoading, isError } = useGetJobsQuery({
    search,
    location,
    experienceLevel,
    salaryMin: salaryMin * 1000,
    sort,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const jobs = response?.data || [];

  // Calculate pagination
  const totalItems = jobs.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (searchVal: string, locationVal: string) => {
    setSearch(searchVal);
    setLocation(locationVal);
    setCurrentPage(1);
  };

  const handleExperienceChange = (level: string) => {
    setExperienceLevel(level);
    setCurrentPage(1);
  };

  const handleSalaryChange = (val: number) => {
    setSalaryMin(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <JobSearch onSearch={handleSearchSubmit} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <JobSidebar
            experienceLevel={experienceLevel}
            setExperienceLevel={handleExperienceChange}
            salaryMin={salaryMin}
            setSalaryMin={handleSalaryChange}
          />

          <div className="lg:col-span-9 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                Recommended for you
                <span className="text-muted-foreground font-normal ml-2">
                  ({jobs.length} jobs found)
                </span>
              </h2>

              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px] bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 hover:bg-white">
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job as any} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                  <p className="text-gray-500">
                    No jobs found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListView;
