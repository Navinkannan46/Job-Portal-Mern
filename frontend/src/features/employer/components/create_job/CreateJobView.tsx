import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

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

import { Rocket, Plus, X, Loader2, Building2 } from "lucide-react";

import {
  JobType,
  JobStatus,
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetMyCompaniesQuery,
  useGetJobByIdQuery,
} from "../../store/employerApi";
import type { Company } from "../../store/employerApi";

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  companyId: z
    .string()
    .min(1, "Please select a company")
    .uuid("Invalid company selected"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  status: z.enum(["OPEN", "CLOSED", "DRAFT"]),

  experienceRequired: z.string().regex(/^[0-9]*$/, "Must be a number"),
  salaryMin: z
    .string()
    .regex(/^[0-9]*$/, "Must be a number")
    .optional(),
  salaryMax: z
    .string()
    .regex(/^[0-9]*$/, "Must be a number")
    .optional(),

  location: z.string().optional(),
  educationRequired: z.string().optional(),
  isRemote: z.boolean().optional(),
  expiresAt: z.string().min(1, "Please select an expiry date"),
});

type JobFormData = z.infer<typeof jobSchema>;

const CreateJobView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const { data: companies, isLoading: companyLoading } =
    useGetMyCompaniesQuery();

  const { data: jobResponse, isLoading: jobLoading } = useGetJobByIdQuery(jobId as string, { skip: !jobId });
  const existingJob = jobResponse?.data;

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const isSubmitting = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobType: "FULL_TIME",
      status: "OPEN",
      isRemote: false,
      companyId: "",
    },
  });

  useEffect(() => {
    if (companies?.data?.length === 1 && !existingJob) {
      setValue("companyId", companies.data[0].id);
    }
  }, [companies, setValue, existingJob]);

  useEffect(() => {
    if (existingJob) {
      setValue("title", existingJob.title);
      setValue("description", existingJob.description);
      setValue("companyId", existingJob.company?.id || existingJob.companyId);
      setValue("jobType", existingJob.jobType);
      setValue("status", existingJob.status);
      setValue("experienceRequired", String(existingJob.experienceRequired || 0));
      if (existingJob.salaryMin) setValue("salaryMin", String(existingJob.salaryMin));
      if (existingJob.salaryMax) setValue("salaryMax", String(existingJob.salaryMax));
      if (existingJob.location) setValue("location", existingJob.location);
      if (existingJob.educationRequired) setValue("educationRequired", existingJob.educationRequired);
      setValue("isRemote", existingJob.isRemote || false);
      if (existingJob.expiresAt) {
         setValue("expiresAt", new Date(existingJob.expiresAt).toISOString().split('T')[0]);
      }
      if (existingJob.skillsRequired) {
        setSkills(existingJob.skillsRequired);
      }
    }
  }, [existingJob, setValue]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    if (skills.length === 0) {
      toast.error("Add at least one skill");
      return;
    }

    if (data.expiresAt) {
      data.expiresAt = new Date(data.expiresAt).toISOString();
    }

    const payload = {
      ...data,
      experienceRequired: data.experienceRequired
        ? Number(data.experienceRequired)
        : undefined,
      salaryMin: data.salaryMin ? Number(data.salaryMin) : undefined,
      salaryMax: data.salaryMax ? Number(data.salaryMax) : undefined,
      skillsRequired: skills,
    };

    try {
      if (jobId) {
        await updateJob({ id: jobId, data: payload }).unwrap();
        toast.success("Job updated successfully");
      } else {
        await createJob(payload).unwrap();
        toast.success("Job created successfully");
      }
      navigate("/employer/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to ${jobId ? 'update' : 'create'} job`);
    }
  };

  if (companyLoading || jobLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">{jobId ? 'Edit Job' : 'Create Job'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* COMPANY */}
        <Card>
          <CardHeader>
            <div className="flex gap-2 items-center">
              <Building2 />
              <CardTitle>Select Company</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <Controller
              name="companyId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value ?? "")}
                  value={field.value ?? ""}
                >
                  {" "}
                  <SelectTrigger>
                    <SelectValue placeholder="Choose company" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    {companies?.data?.map((c: Company) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companyId && (
              <p className="text-red-500 text-sm">{errors.companyId.message}</p>
            )}
          </CardContent>
        </Card>

        {/* GENERAL */}
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>General Info</CardTitle>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value={JobStatus.OPEN}>Open</SelectItem>
                    <SelectItem value={JobStatus.DRAFT}>Draft</SelectItem>
                    <SelectItem value={JobStatus.CLOSED}>Closed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </CardHeader>

          <CardContent className="space-y-4">
            <Input {...register("title")} placeholder="Job Title" />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value={JobType.FULL_TIME}>Full Time</SelectItem>
                    <SelectItem value={JobType.PART_TIME}>Part Time</SelectItem>
                    <SelectItem value={JobType.CONTRACT}>Contract</SelectItem>
                    <SelectItem value={JobType.INTERNSHIP}>
                      Internship
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              type="number"
              {...register("experienceRequired")}
              placeholder="Experience"
            />
          </CardContent>
        </Card>

        {/* SALARY */}
        <Card>
          <CardHeader>
            <CardTitle>Salary & Location</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input
              type="number"
              {...register("salaryMin")}
              placeholder="Min Salary"
            />
            <Input
              type="number"
              {...register("salaryMax")}
              placeholder="Max Salary"
            />
            <Input {...register("location")} placeholder="Location" />
          </CardContent>
        </Card>

        {/* ADDITIONAL */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Info</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              {...register("educationRequired")}
              placeholder="Education Required"
            />

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isRemote")} />
              Remote Job
            </label>

            <Input type="date" {...register("expiresAt")} />
            {errors.expiresAt && (
              <p className="text-red-500 text-sm">{errors.expiresAt.message}</p>
            )}
          </CardContent>
        </Card>

        {/* SKILLS */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill"
              />
              <Button type="button" onClick={addSkill}>
                <Plus />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <Badge key={skill}>
                  {skill}
                  <X
                    className="ml-1 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SUBMIT */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Rocket />}
          {jobId ? 'Update Job' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};

export default CreateJobView;
