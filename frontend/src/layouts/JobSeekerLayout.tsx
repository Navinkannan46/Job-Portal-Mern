import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const JobSeekerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default JobSeekerLayout;
