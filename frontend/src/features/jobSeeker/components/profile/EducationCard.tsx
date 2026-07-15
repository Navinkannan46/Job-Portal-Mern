import { GraduationCap, Calendar } from "lucide-react";
import type { Education } from "../../store/jobSeekerApi";

export const EducationCard = ({ education }: { education: Education[] }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-primary" /> Education
      </h2>

      <div className="space-y-6">
        {education.length > 0 ? (
          education.map((edu, i) => (
            <div key={edu.id} className={`${i !== 0 ? "pt-6 border-t border-border/50" : ""} relative pl-4 border-l-2 border-primary/20`}>
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-background border-2 border-primary" />
              
              <h3 className="font-bold text-lg leading-tight">{edu.degree}</h3>
              
              <p className="text-sm font-medium text-foreground mt-1">
                {edu.institution}
              </p>
              
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary/70" /> 
                {edu.startYear} - {edu.endYear || "Present"}
                {edu.fieldOfStudy && (
                  <>
                    <span className="text-muted-foreground/50 mx-1">•</span>
                    {edu.fieldOfStudy}
                  </>
                )}
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm italic py-4">No education information added yet.</p>
        )}
      </div>
    </div>
  );
};
