import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/features/auth/store/authApi";
import { logout as logoutAction } from "@/features/auth/store/authSlice";
import { apiSlice } from "@/store/apiSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // 1. Call the backend to clear the secure cookie
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logoutAction());
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    }
  };

  return { handleLogout };
};
