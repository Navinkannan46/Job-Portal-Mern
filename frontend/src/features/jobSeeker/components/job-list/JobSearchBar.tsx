import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

import { useState } from "react"

interface JobSearchBarProps {
    onSearch: (search: string, location: string) => void;
}

function JobSearchBar({ onSearch }: JobSearchBarProps) {
    const [searchVal, setSearchVal] = useState("");
    const [locationVal, setLocationVal] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchVal, locationVal);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-3 bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4 flex flex-col lg:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-[13px] text-muted-foreground w-4 h-4" />
                        <Input 
                            placeholder="Job title, keywords, company" 
                            className="pl-9 bg-white" 
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-[13px] text-muted-foreground w-4 h-4" />
                        <Input 
                            placeholder="City or remote" 
                            className="pl-9 bg-white" 
                            value={locationVal}
                            onChange={(e) => setLocationVal(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="bg-primary hover:bg-blue-600 text-white">
                        Find Jobs
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
export default JobSearchBar