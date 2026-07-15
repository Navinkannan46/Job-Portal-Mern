import { Navigate, Outlet } from "react-router-dom";
import { getRedirectPath } from "./helpers";
import { useSelector } from "react-redux";
import { type RootState } from "../store";

export const RestrictedPublicRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return <Outlet />;
  }

  if (user.role === "ADMIN" || user.role === "EMPLOYER") {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  return <Outlet />;
};
