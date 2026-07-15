import { useState, useEffect } from "react";
import { Mail, Phone, Edit, Building2, Loader2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetMyProfileQuery,
  useGetMyCompaniesQuery,
  useUpdateEmployerProfileMutation,
} from "../../store/employerApi";
import { toast } from "react-hot-toast";

/* ----------------- VIEW COMPONENT ----------------- */

const EmployerProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { data: profileRes, isLoading: isProfileLoading } =
    useGetMyProfileQuery();
  const { data: companiesRes, isLoading: isCompaniesLoading } =
    useGetMyCompaniesQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateEmployerProfileMutation();

  const profile = profileRes?.data;
  const companies = companiesRes?.data || [];
console.log(profile,"dfd");

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isProfileLoading || isCompaniesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-12">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto space-y-6">
      {/* Profile Card */}
      <Card className="p-0 border-0 rounded-lg overflow-hidden shadow-md">
        <CardContent className="p-6 bg-white">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl font-bold text-primary capitalize">
                {profile.name?.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-sm text-muted-foreground">Employer</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {profile.email}
            </span>
            {profile.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Companies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            My Companies
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-primary/5"
          >
            View All
          </Button>
        </div>

        {companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          company.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {company.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {company.industry || "Industry unspecified"}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={company.isVerified ? "default" : "secondary"}
                      className={
                        company.isVerified
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {company.isVerified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>

                  {company.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {company.description || "No description available."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-12 text-center text-muted-foreground">
              No companies found. Create one to start posting jobs!
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="min-w-[100px]"
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployerProfileView;
