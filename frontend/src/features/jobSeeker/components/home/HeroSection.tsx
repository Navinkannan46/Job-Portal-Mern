import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-[#0b1b3f] via-[#1e2a78] to-[#3b2f8f] text-white py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge */}
                    <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                        🚀 Over 12,000 jobs posted this month
                    </Badge>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        Find Your Next{" "}
                        <span className="text-orange-400">Dream Job</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Connect with top companies and discover opportunities that match
                        your skills, experience, and career goals.
                    </p>

                    {/* Search Box */}
                    <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-2 max-w-2xl mx-auto border border-white/20 shadow-lg">
                        <Search className="h-5 w-5 text-white/70 ml-3" />

                        <Input
                            placeholder="Search job title, company, or keyword..."
                            className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />

                        <Link to="/jobs">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white shrink-0 px-6">
                                Search
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;