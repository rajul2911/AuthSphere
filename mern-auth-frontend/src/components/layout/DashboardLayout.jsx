import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../api/authApi";
import { clearUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { FaDesktop } from "react-icons/fa";

import {
  FaUsers,
  FaHome,
  FaSignOutAlt,
  FaUserTie,
  FaBars,
  FaTimes,
} from "react-icons/fa";

/* ===============================
   Sidebar Link Component
================================ */
function SidebarLink({ to, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        flex items-center gap-3
        px-4 py-2 rounded
        text-gray-700
        hover:bg-blue-50 hover:text-blue-600
        transition-all duration-200
      "
    >
      {icon}
      {children}
    </Link>
  );
}

/* ===============================
   Dashboard Layout
================================ */
export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===============================
     Logout Handler
  ================================ */
  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/login");
  };

  /* ===============================
     Close Sidebar (Mobile)
  ================================ */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ===============================
          Mobile Overlay
      ================================ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ===============================
          Sidebar
      ================================ */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600">MERN Auth</h2>

          {/* Close button (mobile) */}
          <button className="md:hidden" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <SidebarLink to="/" icon={<FaHome />} onClick={closeSidebar}>
            Dashboard
          </SidebarLink>

          {user?.role === "admin" && (
            <SidebarLink to="/admin" icon={<FaUsers />} onClick={closeSidebar}>
              User Management
            </SidebarLink>
          )}

          {user?.role === "manager" && (
            <SidebarLink
              to="/manager"
              icon={<FaUserTie />}
              onClick={closeSidebar}
            >
              Team
            </SidebarLink>
          )}

          <SidebarLink
            to="/change-password"
            icon={<FaUserTie />}
            onClick={closeSidebar}
          >
            Change Password
          </SidebarLink>

          <SidebarLink
            to="/sessions"
            icon={<FaDesktop />}
            onClick={closeSidebar}
          >
            Sessions
          </SidebarLink>

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 w-full
              px-4 py-2 rounded
              text-red-600
              hover:bg-red-50
              transition
            "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* ===============================
          Main Content
      ================================ */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* ===============================
            Topbar
        ================================ */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <FaBars size={18} />
            </button>

            <h1 className="text-lg font-semibold">Welcome, {user?.name}</h1>
          </div>

          {/* Role Badge */}
          <span
            className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                user?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : user?.role === "manager"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-green-100 text-green-600"
              }
            `}
          >
            {user?.role?.toUpperCase()}
          </span>
        </header>

        {/* ===============================
            Page Content
        ================================ */}
        <section className="flex-1 p-6 overflow-auto">{children}</section>
      </main>
    </div>
  );
}
