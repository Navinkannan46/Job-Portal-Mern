import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Featured Jobs</h2>
                    <Link to="/jobs">
                        <Button variant="ghost" className="gap-1">
                            View All <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;