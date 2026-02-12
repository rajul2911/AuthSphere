import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../api/authApi";
// import { setCredentials, clearCredentials } from "../features/auth//authSlice";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);

  // 🚫 Skip /me while login/signup is happening
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: isAuthLoading,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setCredentials(data.data));
    } else if (isError && !isAuthLoading) {
      dispatch(clearCredentials());
    }
  }, [data, isError, isAuthLoading, dispatch]);

  if (isLoading && !isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
        <p className="text-gray-600 text-sm">Checking session…</p>
      </div>
    );
  }

  return children;
}
