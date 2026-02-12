import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

export default function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // Show loader while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role check - if role is specified and doesn't match
  if (role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}