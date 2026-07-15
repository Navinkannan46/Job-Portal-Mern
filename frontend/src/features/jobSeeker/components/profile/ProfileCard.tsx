import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Edit } from "lucide-react";
import type { UserProfile } from "../../store/jobSeekerApi";

export const ProfileCard = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            {profile.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">
              {profile.bio || "No bio added yet"}
            </p>
          </div>
        </div>

        <Link
          to="/profile/edit"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Edit className="w-4 h-4" /> Edit Profile
        </Link>
      </div>

      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border/50 text-sm text-muted-foreground font-medium">
        <span className="flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-primary/70" /> {profile.email}
        </span>

        {profile.phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-primary/70" /> {profile.phone}
          </span>
        )}

        {profile.location && (
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary/70" /> {profile.location}
          </span>
        )}
      </div>
    </div>
  );
};
