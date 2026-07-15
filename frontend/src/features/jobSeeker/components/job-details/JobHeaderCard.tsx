import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bookmark, Share2 } from "lucide-react";
import type { Job } from "../../store/jobSeekerApi";
import { formatDistanceToNow } from "date-fns";

interface JobHeaderCardProps {
  job: Job;
}

export default function JobHeaderCard({ job }: JobHeaderCardProps) {
  return (
    <Card className="rounded-2xl bg-white shadow-md">
      <CardContent className="p-8">
        <div className="flex justify-between gap-6 flex-col md:flex-row">
          <div className="flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-base font-semibold text-gray-600 overflow-hidden">
              {job.company.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                job.company.name.charAt(0)
              )}
            </div>

            <div>
              <h1 className="text-4xl font-extrabold capitalize">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-4 mt-3 text-muted-foreground">
                <span>{job.company.name}</span>

                {job.location && (
                  <span className="flex items-center gap-1 text-primary">
                    <MapPin size={18} />
                    {job.location}
                  </span>
                )}

                <span>
                  Posted {formatDistanceToNow(new Date(job.createdAt))} ago
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Bookmark size={18} />
            </Button>

            <Button variant="outline" size="icon">
              <Share2 size={18} />
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mt-8 flex-wrap">
          <Badge className="py-1 px-3">
            {job.jobType
              .replace("_", " ")
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
          {(job.salaryMin || job.salaryMax) && (
            <Badge variant="secondary" className="py-1 px-3">
              ${job.salaryMin ? `${job.salaryMin / 1000}k` : "0"} - $
              {job.salaryMax ? `${job.salaryMax / 1000}k` : "N/A"}
            </Badge>
          )}
          {job.experienceRequired !== undefined && (
            <Badge variant="outline" className="py-1 px-3">
              {job.experienceRequired === 0
                ? "Entry Level"
                : `${job.experienceRequired}+ Years`}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
