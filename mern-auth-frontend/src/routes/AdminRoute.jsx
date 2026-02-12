import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Show loader while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Not an admin - redirect to their respective dashboard
  if (user.role !== "admin") {
    if (user.role === "manager") return <Navigate to="/manager" replace />;
    if (user.role === "employee") return <Navigate to="/employee" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;