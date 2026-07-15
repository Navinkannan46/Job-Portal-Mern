import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const EmployerLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployerLayout;
