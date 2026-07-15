import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Plus,
  Trash2,
  Save,
  Upload,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateJobSeekerProfileMutation,
  useUploadResumeMutation,
  type Experience,
  type Education,
  type UserProfile,
} from "../../store/jobSeekerApi";
import { toast } from "react-hot-toast";
import { useRef } from "react";

/* ----------------- TYPES ----------------- */

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  expectedSalary: number;
  resume: string;
}

/* ----------------- VIEW COMPONENT ----------------- */

const JobSeekerEditProfileView = () => {
  const navigate = useNavigate();
  const { data: response, isLoading: isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateJobSeekerProfileMutation();
  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    expectedSalary: 0,
    resume: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState<Partial<Experience>[]>([]);
  const [educations, setEducations] = useState<Partial<Education>[]>([]);

  // Populate form with existing data
  useEffect(() => {
    if (response?.data) {
      const p = response.data;
      setFormData({
        name: p.name || "",
        email: p.email || "",
        phone: p.phone || "",
        bio: p.bio || "",
        location: p.location || "",
        expectedSalary: p.expectedSalary || 0,
        resume: p.resume || "",
      });
      setSkills(p.skills || []);
      setExperiences(p.experiences || []);
      setEducations(p.educations || []);
    }
  }, [response]);

  const handleChange = (
    field: keyof ProfileFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------- Skills ---------- */
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  /* ---------- Experience ---------- */
  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: "",
        position: "",
        startDate: new Date().toISOString(),
        description: "",
        isCurrentJob: false,
      },
    ]);
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    );
  };

  const removeExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- Education ---------- */
  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        fieldOfStudy: "",
        startYear: new Date().getFullYear() - 4,
        endYear: new Date().getFullYear(),
      },
    ]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string | number,
  ) => {
    setEducations((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
    );
  };

  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- File Upload ---------- */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size manually (extra safety)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size is too large (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await uploadResume(formData).unwrap();
      if (res.success) {
        handleChange("resume", res.data.url);
        toast.success("Resume uploaded successfully");
      }
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to upload resume";
      toast.error(errMsg);
    }
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async () => {
    try {
      const payload: Partial<UserProfile> = {
        ...formData,
        skills,
        experiences: experiences as Experience[],
        educations: educations as Education[],
      };

      await updateProfile(payload).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mt-24 mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground text-sm">
              Update your professional information
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isUpdating}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <h2 className="font-bold text-lg border-b pb-2">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-muted/50 text-sm outline-none cursor-not-allowed opacity-70"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Expected Salary (Monthly)
            </label>
            <input
              type="number"
              value={formData.expectedSalary}
              onChange={(e) =>
                handleChange("expectedSalary", Number(e.target.value))
              }
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">
            Bio / Summary
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">Skills</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/5 text-primary text-sm font-semibold border border-primary/10 transition-all hover:bg-primary/10"
            >
              {skill}
              <X
                className="w-4 h-4 cursor-pointer text-primary/50 hover:text-primary transition-colors"
                onClick={() => removeSkill(skill)}
              />
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
            placeholder="Add a skill (e.g. React, Python)..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <button
            onClick={addSkill}
            className="px-6 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center font-bold"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="font-bold text-lg">Work Experience</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-1 text-primary text-sm font-bold hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>

        <div className="space-y-6">
          {experiences.length === 0 && (
            <p className="text-muted-foreground text-sm italic">
              No work experience added yet.
            </p>
          )}
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative bg-background/30 rounded-xl p-5 border border-border/50 space-y-4 group"
            >
              <button
                onClick={() => removeExperience(i)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Company
                  </label>
                  <input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(i, "company", e.target.value)
                    }
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Position
                  </label>
                  <input
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(i, "position", e.target.value)
                    }
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={
                      exp.startDate
                        ? new Date(exp.startDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      updateExperience(i, "startDate", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    End Date
                  </label>
                  <input
                    type="date"
                    disabled={exp.isCurrentJob}
                    value={
                      exp.endDate
                        ? new Date(exp.endDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      updateExperience(i, "endDate", e.target.value)
                    }
                    className={`w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all ${exp.isCurrentJob ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-job-${i}`}
                    checked={exp.isCurrentJob}
                    onChange={(e) =>
                      updateExperience(i, "isCurrentJob", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`current-job-${i}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    Currently working here
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(i, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="font-bold text-lg">Education</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-1 text-primary text-sm font-bold hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>

        <div className="space-y-6">
          {educations.length === 0 && (
            <p className="text-muted-foreground text-sm italic">
              No education history added yet.
            </p>
          )}
          {educations.map((edu, i) => (
            <div
              key={i}
              className="relative bg-background/30 rounded-xl p-5 border border-border/50 space-y-4 group"
            >
              <button
                onClick={() => removeEducation(i)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Degree
                  </label>
                  <input
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(i, "degree", e.target.value)
                    }
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Institution
                  </label>
                  <input
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(i, "institution", e.target.value)
                    }
                    placeholder="e.g. Stanford University"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                  Field of Study
                </label>
                <input
                  value={edu.fieldOfStudy}
                  onChange={(e) =>
                    updateEducation(i, "fieldOfStudy", e.target.value)
                  }
                  placeholder="e.g. Computer Science"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) =>
                      updateEducation(i, "startYear", Number(e.target.value))
                    }
                    placeholder="e.g. 2016"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">
                    Year of Graduation (End Year)
                  </label>
                  <input
                    type="number"
                    value={edu.endYear || ""}
                    onChange={(e) =>
                      updateEducation(
                        i,
                        "endYear",
                        e.target.value ? Number(e.target.value) : 0,
                      )
                    }
                    placeholder="e.g. 2020"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Management */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 border-b pb-2">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Resume Management</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Resume URL (Google Drive, Dropbox, etc.)
            </label>
            <input
              type="url"
              value={formData.resume}
              onChange={(e) => handleChange("resume", e.target.value)}
              placeholder="https://drive.google.com/your-resume-link"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-xs"
            />
          </div>

          <div className="bg-muted/30 rounded-xl p-8 text-center border border-dashed border-border/50">
            <h3 className="font-bold mb-1 text-sm">Direct File Upload</h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-xs mx-auto">
              Choose a PDF or DOC file to upload your resume directly.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isUploading ? "Uploading..." : "Choose File"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 py-4 border-t border-border mt-12">
        <button
          onClick={() => navigate("/profile")}
          className="px-6 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isUpdating}
          className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isUpdating ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default JobSeekerEditProfileView;
