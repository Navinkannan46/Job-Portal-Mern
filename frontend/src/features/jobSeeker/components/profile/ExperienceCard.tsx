import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "../../store/jobSeekerApi";
import { format } from "date-fns";

export const ExperienceCard = ({
  experience,
}: {
  experience: Experience[];
}) => {
  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "MMM yyyy");
    } catch (e) {
      return date;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-primary" /> Experience
      </h2>

      <div className="space-y-6">
        {experience.length > 0 ? (
          experience.map((exp, i) => (
            <div
              key={exp.id}
              className={`${i !== 0 ? "pt-6 border-t border-border/50" : ""} relative pl-4 border-l-2 border-primary/20`}
            >
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-background border-2 border-primary" />

              <h3 className="font-bold text-lg leading-tight">
                {exp.position}
              </h3>

              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mt-1">
                <span className="text-foreground">{exp.company}</span>
                <span className="text-muted-foreground/50">•</span>
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(exp.startDate)} -{" "}
                {exp.isCurrentJob
                  ? "Present"
                  : exp.endDate
                    ? formatDate(exp.endDate)
                    : ""}
              </p>

              {exp.description && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm italic py-4">
            No experience added yet.
          </p>
        )}
      </div>
    </div>
  );
};
