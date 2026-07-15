import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  UserCircle,
  LogOut,
  ChevronRight,
  Building,
  ShieldCheck,
  UserCheck,
  FileText,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useLogout } from "@/hooks/useLogout";

type Role = "ADMIN" | "EMPLOYER";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface SidebarConfig {
  title: string;
  icon: React.ElementType;
  menuItems: MenuItem[];
}

const Sidebar = () => {
  const { handleLogout } = useLogout();
  const { user } = useSelector(
    (state: RootState) => state.auth || { user: null },
  );

  const role = user?.role as Role;

  const configs: Record<Role, SidebarConfig> = {
    ADMIN: {
      title: "AdminPanel",
      icon: ShieldCheck,
      menuItems: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Employers", path: "/admin/employers", icon: UserCheck },
        { name: "Job Seekers", path: "/admin/jobseekers", icon: Users },
        { name: "Jobs", path: "/admin/jobs", icon: Briefcase },
        { name: "Companies", path: "/admin/companies", icon: Building },
        { name: "Applications", path: "/admin/applications", icon: FileText },
      ],
    },
    EMPLOYER: {
      title: "Employer",
      icon: Briefcase,
      menuItems: [
        {
          name: "Dashboard",
          path: "/employer/dashboard",
          icon: LayoutDashboard,
        },
        { name: "Profile", path: "/employer/profile", icon: UserCircle },
        { name: "My Jobs", path: "/employer/jobs", icon: Briefcase },
        { name: "Post a Job", path: "/employer/job/create", icon: PlusCircle },
        {
          name: "Create Company",
          path: "/employer/companies/create",
          icon: Building,
        },
        { name: "Applicants", path: "/employer/applications", icon: Users },
      ],
    },
  };

  const config = configs[role] ?? configs.EMPLOYER;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen sticky top-0 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
          <config.icon className="text-blue-500" size={28} />
          <span>{config.title}</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 mt-4 space-y-1">
        {config.menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} />
              <span className="font-medium">{item.name}</span>
            </div>

            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-2">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-600/30">
              <UserCircle size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">
                {user.name}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {user.role.toLowerCase()}
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-medium border border-transparent hover:border-red-400/20"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
