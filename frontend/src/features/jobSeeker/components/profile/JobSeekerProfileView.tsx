import { ProfileCard } from "./ProfileCard";
import { SkillsCard } from "./SkillsCard";
import { ResumeCard } from "./ResumeCard";
import { ExperienceCard } from "./ExperienceCard";
import { EducationCard } from "./EducationCard";
import { useGetProfileQuery } from "../../store/jobSeekerApi";
import { Loader2 } from "lucide-react";

export default function JobSeekerProfileView() {
  const { data: response, isLoading, isError } = useGetProfileQuery();
  const profile = response?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Failed to load profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mt-24 mx-auto space-y-6 p-6">
      <ProfileCard profile={profile} />

      <SkillsCard skills={profile.skills} />

      <ResumeCard resume={profile.resume} />

      <ExperienceCard experience={profile.experiences} />

      <EducationCard education={profile.educations} />
    </div>
  );
}
