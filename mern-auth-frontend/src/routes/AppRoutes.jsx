import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import EmployeeDashboard from "../pages/dashboards/EmployeeDashboard";
import ManagerDashboard from "../pages/dashboards/ManagerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import Sessions from "../pages/Sessions";

import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes - Redirect if already logged in */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={getRoleDashboard(user?.role)} replace />
          ) : (
            <Login />
          )
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? (
            <Navigate to={getRoleDashboard(user?.role)} replace />
          ) : (
            <Signup />
          )
        } 
      />

      {/* Protected Routes - Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Manager Dashboard */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Profile & Settings */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sessions"
        element={
          <ProtectedRoute>
            <Sessions />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Default Route - Smart redirect based on auth status */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to={getRoleDashboard(user?.role)} replace /> 
            : <Navigate to="/login" replace />
        } 
      />

      {/* 404 - Catch all routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Helper function to get dashboard route based on user role
function getRoleDashboard(role) {
  switch (role) {
    case "admin":
      return "/admin";
    case "manager":
      return "/manager";
    case "employee":
      return "/employee";
    default:
      return "/login";
  }
}