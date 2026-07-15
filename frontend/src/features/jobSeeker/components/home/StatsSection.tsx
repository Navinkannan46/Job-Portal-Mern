import { Briefcase, Building2, Users, TrendingUp } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "12K+", label: "Active Jobs" },
    { icon: Building2, value: "3K+", label: "Companies" },
    { icon: Users, value: "50K+", label: "Job Seekers" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
];

const StatsSection = () => {
    return (
        <section className="py-12 border-b bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                                <stat.icon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;