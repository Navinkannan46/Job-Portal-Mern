import { useGetApplicationsQuery } from "@/features/jobSeeker/store/jobSeekerApi";
import ApplicationsHeader from "@/features/jobSeeker/components/my-applications/ApplicationsHeader";
import ApplicationsStats from "@/features/jobSeeker/components/my-applications/ApplicationsStats";
import ApplicationsTable from "@/features/jobSeeker/components/my-applications/ApplicationsTable";
import { Spinner } from "@/components/ui/spinner";

const MyApplicationsView = () => {
    const { data, isLoading, isError } = useGetApplicationsQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner className="size-8" />
            </div>
        );
    }

    if (isError || !data?.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold text-red-600">Failed to load applications</h2>
                <p className="text-muted-foreground">Please try again later or check your internet connection.</p>
            </div>
        );
    }

    const { stats, applications } = data.data;

    return (
        <div className="min-h-screen mt-16 bg-white px-6 py-12">
            <div className=" space-y-10">
                <ApplicationsHeader />
                <ApplicationsStats stats={stats} />
                <ApplicationsTable data={applications} />
            </div>
        </div>
    );
};

export default MyApplicationsView;
