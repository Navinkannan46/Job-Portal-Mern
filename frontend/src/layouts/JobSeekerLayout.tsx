import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const JobSeekerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default JobSeekerLayout;
