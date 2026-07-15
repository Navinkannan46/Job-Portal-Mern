import { useSelector } from "react-redux";
import { getRedirectPath } from "./helpers";
import { Navigate, Outlet } from "react-router-dom";
import { type RootState } from "../store";

export const PublicRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // ❌ If logged in → redirect
  if (user) {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  // ✅ Guest → allow
  return <Outlet />;
};
