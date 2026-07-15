import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Take the Next Step?
                </h2>

                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Join thousands of professionals who found their dream job
                    through JobFlow.
                </p>

                <div className="flex justify-center gap-3">
                    <Link to="/register">
                        <Button size="lg">Get Started Free</Button>
                    </Link>
                    <Link to="/jobs">
                        <Button size="lg" variant="outline">
                            Browse Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;