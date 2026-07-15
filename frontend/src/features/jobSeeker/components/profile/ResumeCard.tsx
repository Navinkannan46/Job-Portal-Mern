import { Download, FileText } from "lucide-react";

export const ResumeCard = ({ resume }: { resume?: string }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold">Resume</h2>
            <p className="text-xs text-muted-foreground">
              {resume ? "Last updated recently" : "No resume uploaded"}
            </p>
          </div>
        </div>

        {resume ? (
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" /> Download Resume
          </a>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Download Resume
          </button>
        )}
      </div>
    </div>
  );
};
