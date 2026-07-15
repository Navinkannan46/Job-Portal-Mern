export const SkillsCard = ({ skills }: { skills: string[] }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Skills</h2>

      <div className="flex flex-wrap gap-2">
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold border border-primary/10 hover:bg-primary/20 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-muted-foreground text-sm italic py-2">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};
