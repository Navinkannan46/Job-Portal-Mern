import { Route } from "react-router-dom";
import { lazy } from "react";

import ProtectedRoute from "./protected-route";
const JobSeekerLayout = lazy(() => import("@/layouts/JobSeekerLayout"));

const JobDetailsPage = lazy(() => import("@/pages/JobSeeker/JobDetailsPage"));
const MyApplications = lazy(() => import("@/pages/JobSeeker/MyApplications"));
const JobSeekerProfile = lazy(
  () => import("@/pages/JobSeeker/JobSeekerProfile"),
);
const JobSeekerEditProfile = lazy(
  () => import("@/pages/JobSeeker/JobSeekerEditProfile"),
);

export const jobseekerRoutes = (
  <Route element={<ProtectedRoute role="USER" />}>
    <Route element={<JobSeekerLayout />}>
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/applications" element={<MyApplications />} />
      <Route path="/profile" element={<JobSeekerProfile />} />
      <Route path="/profile/edit" element={<JobSeekerEditProfile />} />
    </Route>
  </Route>
);
