import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import type { JobListJob } from "../../store/jobSeekerApi";

interface JobCardProps {
  job: JobListJob;
}

function JobCard({ job }: JobCardProps) {
  const salaryString =
    job.salaryMin && job.salaryMax
      ? `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k`
      : job.salaryMin
        ? `From $${(job.salaryMin / 1000).toFixed(0)}k`
        : job.salaryMax
          ? `Up to $${(job.salaryMax / 1000).toFixed(0)}k`
          : "Salary not disclosed";

  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <Card className="bg-white border p-1 border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 rounded-xl">
        <CardContent className="p-6 space-y-6">
          {/* Top Section */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-4">
              {/* Company Logo Placeholder */}
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-base font-semibold text-gray-600">
                {job.company.logo ? (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  job.company.name.charAt(0)
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg leading-tight text-gray-900">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{job.company.name}</p>

                {/* Job Type */}
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline" className="text-xs font-medium">
                    {job.jobType.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>

            <Bookmark className="text-gray-400 cursor-pointer hover:text-primary transition" />
          </div>

          {/* Job Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {job.location || "Remote"}
            </div>

            <div className="flex items-center gap-1 font-medium text-gray-800">
              <DollarSign size={16} className="text-green-600" />
              {salaryString}
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} />
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
export default JobCard;