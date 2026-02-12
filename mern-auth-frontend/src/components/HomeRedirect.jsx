import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeRedirect() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user.role === "manager" ? "/manager" : "/employee"}
      replace
    />
  );
}
