import { useEffect } from "react";
import { useGetMeQuery } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../features/auth/authSlice";
import Loader from "../ui/Loader";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }

    // Handle all errors by clearing user
    if (error) {
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return children;
}