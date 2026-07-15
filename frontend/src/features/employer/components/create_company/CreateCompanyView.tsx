import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Building2, Loader2 } from "lucide-react";
import { useCreateCompanyMutation } from "../../store/employerApi";

const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000),
  industry: z.string().min(1, "Please select an industry"),
  location: z.string().min(2, "Location is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  logo: z.string().optional().or(z.literal("")),
  companySize: z.string().optional(),
  foundedYear: z
    .number({ message: "Founded year must be a number" })
    .min(1800, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

type CompanyFormData = z.infer<typeof companySchema>;

const CreateCompanyView = () => {
  const navigate = useNavigate();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      industry: "",
    },
  });

  const onFormSubmit = async (data: CompanyFormData) => {
    try {
      await createCompany(data).unwrap();
      toast.success("Company created successfully!");
      setIsSuccess(true);
      setTimeout(() => navigate("/employer/dashboard"), 2000);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create company");
    }
  };

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-1">Create Company</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Register your company to start posting jobs
      </p>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
              Pending Approval
            </span>
            <span className="text-muted-foreground">
              Your company has been submitted for review. Redirecting to
              dashboard...
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="bg-card rounded-md border bg-white border-border p-6 space-y-4"
      >
        {/* Company Name */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Company Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Acme Inc."
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring ${
              errors.name ? "border-red-500 ring-red-200" : "border-input"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Tell us about your company..."
            rows={4}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring resize-none ${
              errors.description
                ? "border-red-500 ring-red-200"
                : "border-input"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Industry + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Industry</label>
            <select
              {...register("industry")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring ${
                errors.industry ? "border-red-500 ring-red-200" : "border-input"
              }`}
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Services">Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Location</label>
            <input
              {...register("location")}
              type="text"
              placeholder="Kochi, Kerala"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring ${
                errors.location ? "border-red-500 ring-red-200" : "border-input"
              }`}
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Website</label>
          <input
            {...register("website")}
            type="text"
            placeholder="https://example.com"
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring ${
              errors.website ? "border-red-500 ring-red-200" : "border-input"
            }`}
          />
        </div>

        {/* Logo */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Logo URL</label>
          <input
            {...register("logo")}
            type="text"
            placeholder="https://logo.png"
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring border-input"
          />
        </div>

        {/* Company Size + Founded Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Company Size
            </label>
            <select
              {...register("companySize")}
              className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring border-input"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Founded Year
            </label>
            <input
              {...register("foundedYear", { valueAsNumber: true })}
              type="number"
              placeholder="2020"
              className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring border-input"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Building2 className="w-4 h-4" />
          )}
          {isLoading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompanyView;
