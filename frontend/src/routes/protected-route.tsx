import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { getRedirectPath } from "./helpers";

interface Props {
  role?: "USER" | "EMPLOYER" | "ADMIN";
}

const ProtectedRoute = ({ role }: Props) => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return null; // Or a loading spinner, but AuthLoader will show one
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
