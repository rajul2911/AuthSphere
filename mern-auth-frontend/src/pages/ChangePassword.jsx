import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useChangePasswordMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [changePassword, { isLoading }] =
    useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  /* ===========================
     Submit
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Min 8 characters");
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      toast.success("Password changed. Login again.");

      navigate("/login");

    } catch (err) {
      toast.error(
        err?.data?.message || "Change failed"
      );
    }
  };

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md"
      >

        {/* Current */}
        <div className="mb-4">
          <label className="block mb-1">
            Current Password
          </label>

          <input
            type="password"
            className="w-full border p-2 rounded"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />
        </div>

        {/* New */}
        <div className="mb-4">
          <label className="block mb-1">
            New Password
          </label>

          <input
            type="password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />
        </div>

        {/* Confirm */}
        <div className="mb-6">
          <label className="block mb-1">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>

        <button
          disabled={isLoading}
          className="
            bg-blue-600 text-white
            px-4 py-2 rounded w-full
            hover:bg-blue-700 transition
          "
        >
          {isLoading ? "Updating..." : "Change Password"}
        </button>

      </form>

    </DashboardLayout>
  );
}
