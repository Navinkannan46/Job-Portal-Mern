import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Verified } from "lucide-react";
import type { Job } from "../../store/jobSeekerApi";

interface JobOverviewCardProps {
  job: Job;
}

export default function JobOverviewCard({ job }: JobOverviewCardProps) {
  return (
    <Card className="rounded-2xl bg-white shadow-md">
      <CardHeader>
        <CardTitle>Job Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-10">
        <section>
          <h3 className="text-xl font-semibold mb-3">About the Role</h3>

          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </section>

        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <>
            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-4">
                Requirements & Skills
              </h3>

              <div className="space-y-4">
                {job.skillsRequired.map((skill, index) => (
                  <div key={index} className="flex gap-3">
                    <Verified className="text-primary mt-1" size={20} />
                    <p>{skill}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {job.company.description && (
          <>
            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-3">
                About {job.company.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {job.company.description}
              </p>
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}
