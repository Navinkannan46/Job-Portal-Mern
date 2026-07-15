import CategoriesSection from "@/features/jobSeeker/components/home/CategoriesSection";
import CTASection from "@/features/jobSeeker/components/home/CTASection";
import FeaturedSection from "@/features/jobSeeker/components/home/FeaturedSection";
import HeroSection from "@/features/jobSeeker/components/home/HeroSection";
import StatsSection from "@/features/jobSeeker/components/home/StatsSection";

const JobSeekerHomeView = () => {
  return (
    <div className="mt-20">
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedSection />
      <CTASection />
    </div>
  );
};

export default JobSeekerHomeView;
