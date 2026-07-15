import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  DollarSign,
  Brain,
  MapPin,
  Rocket,
  Plus,
  X,
} from "lucide-react";

const EditJobView = () => {
  const [skills, setSkills] = useState<string[]>([
    "React.js",
    "Node.js",
    "MongoDB",
    "Express",
    "TypeScript",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Updated");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 mt-20 flex items-center justify-center p-6 overflow-hidden ">
      <div className="w-full max-w-4xl space-y-6 relative z-10">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Job Listing
          </h1>
          <p className="text-muted-foreground">
            Update the details for your job posting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Info */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-primary" />
                <CardTitle>General Info</CardTitle>
              </div>

              <Select defaultValue="active">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="Senior Full Stack Developer" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Job Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full-time</SelectItem>
                      <SelectItem value="part">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <label className="text-sm font-medium">
                    Experience Level
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead / Architect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  rows={5}
                  placeholder="Outline the role, tech stack, and responsibilities..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Location */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="text-primary" />
                <CardTitle>Compensation & Location</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Salary Min</label>
                  <Input type="number" placeholder="60000" />
                </div>

                <div>
                  <label className="text-sm font-medium">Salary Max</label>
                  <Input type="number" placeholder="120000" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Work Mode</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Office Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="San Francisco, CA" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="text-primary" />
                <CardTitle>Requirements</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Required Skills</label>

                <div className="flex gap-2 mt-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Type skill and press add..."
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Save Job Changes
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditJobView;
