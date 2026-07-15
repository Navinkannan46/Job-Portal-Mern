import { Route } from "react-router-dom";
import { lazy } from "react";

import ProtectedRoute from "@/routes/protected-route";

const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));

const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));
const AdminEmployers = lazy(() => import("@/pages/Admin/AdminEmployers"));
const AdminJobs = lazy(() => import("@/pages/Admin/AdminJobs"));
const AdminCompanies = lazy(() => import("@/pages/Admin/AdminCompanies"));
const AdminJobSeekers = lazy(() => import("@/pages/Admin/AdminJobSeekers"));
const AdminApplications = lazy(() => import("@/pages/Admin/AdminApplications"));

export const adminRoutes = (
  <Route element={<ProtectedRoute role="ADMIN" />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/employers" element={<AdminEmployers />} />
      <Route path="/admin/jobseekers" element={<AdminJobSeekers />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
      <Route path="/admin/companies" element={<AdminCompanies />} />
      <Route path="/admin/applications" element={<AdminApplications />} />
    </Route>
  </Route>
);
