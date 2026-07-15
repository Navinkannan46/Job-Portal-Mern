import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface JobFiltersSidebarProps {
    experienceLevel: string;
    setExperienceLevel: (level: string) => void;
    salaryMin: number;
    setSalaryMin: (salary: number) => void;
}

function JobFiltersSidebar({
    experienceLevel,
    setExperienceLevel,
    salaryMin,
    setSalaryMin,
}: JobFiltersSidebarProps) {

    return (
        <div className="hidden lg:block lg:col-span-3 space-y-6">
            <Card className="bg-white shadow-sm">
                <CardContent className="p-5 space-y-4">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground">
                        Experience Level
                    </h3>

                    <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="all" id="exp-all" />
                            <label htmlFor="exp-all" className="text-sm cursor-pointer select-none">All Levels</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="entry" id="exp-entry" />
                            <label htmlFor="exp-entry" className="text-sm cursor-pointer select-none">Entry</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="mid" id="exp-mid" />
                            <label htmlFor="exp-mid" className="text-sm cursor-pointer select-none">Intermediate</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="senior" id="exp-senior" />
                            <label htmlFor="exp-senior" className="text-sm cursor-pointer select-none">Senior</label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
                <CardContent className="p-5 space-y-4">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground">
                        Salary Range
                    </h3>

                    <Slider 
                        value={[salaryMin]} 
                        min={50} 
                        max={250} 
                        step={10} 
                        onValueChange={(val) => setSalaryMin(val[0])} 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$50k</span>
                        <span>$250k+</span>
                    </div>
                    <div className="text-xs font-semibold text-center text-primary mt-1">
                        Min Salary: ${salaryMin}k
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default JobFiltersSidebar