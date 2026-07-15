import { Route } from "react-router-dom";
import { lazy } from "react";

import ProtectedRoute from "@/routes/protected-route";

const EmployerLayout = lazy(() => import("@/layouts/EmployerLayout"));

const EmployerDashboard = lazy(
  () => import("@/pages/Employer/EmployerDashboard"),
);
const EmployerProfile = lazy(() => import("@/pages/Employer/EmployerProfile"));
const EmployerJobsList = lazy(
  () => import("@/pages/Employer/EmployerJobsList"),
);
const CreateJob = lazy(() => import("@/pages/Employer/CreateJob"));
const EditJob = lazy(() => import("@/pages/Employer/EditJob"));
const CreateCompany = lazy(() => import("@/pages/Employer/CreateCompany"));
const EditCompany = lazy(() => import("@/pages/Employer/EditCompany"));
const ManageApplicants = lazy(
  () => import("@/pages/Employer/ManageApplicants"),
);

export const employerRoutes = (
  <Route element={<ProtectedRoute role="EMPLOYER" />}>
    <Route element={<EmployerLayout />}>
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      <Route path="/employer/profile" element={<EmployerProfile />} />

      <Route path="/employer/jobs" element={<EmployerJobsList />} />
      <Route path="/employer/job/create" element={<CreateJob />} />
      <Route path="/employer/jobs/:id/edit" element={<EditJob />} />

      <Route path="/employer/companies/create" element={<CreateCompany />} />
      <Route path="/employer/companies/:id/edit" element={<EditCompany />} />

      <Route path="/employer/applications" element={<ManageApplicants />} />
    </Route>
  </Route>
);
