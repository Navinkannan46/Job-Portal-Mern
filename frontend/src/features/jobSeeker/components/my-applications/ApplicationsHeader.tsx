import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ApplicationsHeader() {
    return (
        <div className=" flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl font-black">My Applications</h1>
                <p className="text-slate-600 mt-2 text-lg">
                    You have submitted 24 applications this month.
                </p>
            </div>

            <Button variant="outline" className="flex items-center gap-2">
                <Download size={18} />
                Export CSV
            </Button>
        </div>
    )
}