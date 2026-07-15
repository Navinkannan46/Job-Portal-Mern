import { useState } from "react";
import { Building2 } from "lucide-react";

const EditCompanyView = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mt-28 mx-auto">
      <h1 className="text-2xl font-bold mb-1">Edit Company</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Update your company details
      </p>

      {submitted && (
        <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/20 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
              Changes Saved
            </span>
            <span className="text-muted-foreground">
              Your company details have been updated.
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="bg-card rounded-md border bg-white border-border p-6 space-y-4"
      >
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Acme Inc."
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Description
          </label>
          <textarea
            placeholder="Tell us about your company..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Industry</label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select industry</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Retail</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Location</label>
            <input
              type="text"
              placeholder="San Francisco, CA"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Website</label>
          <input
            type="url"
            placeholder="https://example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Building2 className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCompanyView;
