import { Card, CardContent } from "@/components/ui/card";
import type { ApplicationStats } from "../../store/jobSeekerApi";

interface ApplicationsStatsProps {
    stats: ApplicationStats;
}

export default function ApplicationsStats({ stats }: ApplicationsStatsProps) {
    const statCards = [
        {
            title: "Total Sent",
            value: stats.totalSent,
        },
        {
            title: "Shortlisted",
            value: stats.shortlisted,
        },
        {
            title: "Hired",
            value: stats.hired,
        },
        {
            title: "Rejected",
            value: stats.rejected,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                return (
                    <Card
                        key={index}
                        className="  border p-0 shadow-sm bg-slate-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-lg"
                    >
                        <CardContent className="p-6 flex items-center justify-between">
                            {/* Text */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {stat.title}
                                </p>
                                <p className="text-3xl font-extrabold mt-3 text-slate-900">
                                    {stat.value}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
