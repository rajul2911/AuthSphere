import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthPageGuard({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return (
      <Navigate
        to={user.role === "manager" ? "/manager" : "/employee"}
        replace
      />
    );
  }

  return children;
}
