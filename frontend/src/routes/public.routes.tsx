import { Route } from "react-router-dom";
import { lazy } from "react";
import { RestrictedPublicRoute } from "./RestrictedPublicRoute";
import { PublicRoute } from "./PublicRoute";

const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const Home = lazy(() => import("@/pages/JobSeeker/Home"));
const JobsListPage = lazy(() => import("@/pages/JobSeeker/JobsListPage"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));

export const publicRoutes = (
  <>
    {/* 🌐 Home & Jobs (Guest + USER) */}
    <Route element={<RestrictedPublicRoute />}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsListPage />} />
      </Route>
    </Route>

    {/* 🔐 Login & Register (Guest only) */}
    <Route element={<PublicRoute />}>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Route>
  </>
);
