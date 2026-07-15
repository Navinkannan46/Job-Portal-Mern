import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useLogout } from "@/hooks/useLogout";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { handleLogout } = useLogout();
  const { user } = useSelector(
    (state: RootState) => state.auth || { user: null },
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = {
    guest: [
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ],
    USER: [
      { name: "Home", path: "/" },
      { name: "Find Jobs", path: "/jobs" },
      { name: "Applications", path: "/applications" },
      { name: "Profile", path: "/profile" },
    ],
  };

  const role = user?.role || "guest";
  const currentLinks = navLinks[role as keyof typeof navLinks] || [];

  const activeClassName = "text-blue-600 font-semibold";
  const inactiveClassName =
    "text-gray-600 hover:text-blue-500 transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <NavLink
            to={"/"}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <Briefcase className="text-blue-600" size={28} />
            <span>JobPortal</span>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {currentLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={18} />
                  </div>
                  <span className="font-medium hidden lg:inline">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors tooltip"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={18} />
              </div>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-2">
          {currentLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
