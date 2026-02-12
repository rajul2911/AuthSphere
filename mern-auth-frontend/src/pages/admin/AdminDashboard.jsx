import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeactivateUserMutation,
  useGetAdminStatsQuery,
} from "../../api/adminApi";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const { data: statsData, isLoading: statsLoading } =
    useGetAdminStatsQuery();

  const [updateRole, { isLoading: roleLoading }] =
    useUpdateUserRoleMutation();

  const [deactivateUser, { isLoading: deactivateLoading }] =
    useDeactivateUserMutation();

  const users = data?.data || [];
  const stats = statsData?.data;

  /* ===========================
     Confirm Role Change
  ============================ */
  const handleRoleChange = async (id, newRole) => {
    const result = await Swal.fire({
      title: "Change Role?",
      text: `Assign ${newRole} role?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole }).unwrap();

      toast.success("Role updated");

      refetch();

    } catch (err) {
      toast.error(
        err?.data?.message || "Update failed"
      );
    }
  };

  /* ===========================
     Confirm Deactivate
  ============================ */
  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: "Deactivate User?",
      text: "User will be logged out everywhere",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deactivate",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await deactivateUser(id).unwrap();

      toast.success("User deactivated");

      refetch();

    } catch {
      toast.error("Failed");
    }
  };

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <Stat title="Total Users" value={stats?.totalUsers} loading={statsLoading} />
        <Stat title="Active Users" value={stats?.activeUsers} loading={statsLoading} />
        <Stat title="Active Sessions" value={stats?.activeSessions} loading={statsLoading} />
        <Stat title="New Users (7d)" value={stats?.newUsers} loading={statsLoading} />

      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">

          <h3 className="text-lg font-semibold mb-4">
            User Management
          </h3>

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-blue-50 transition"
                >

                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  {/* Role */}
                  <td>
                    <select
                      value={user.role}
                      disabled={
                        user.role === "admin" ||
                        roleLoading
                      }
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                      className="border p-1 rounded"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </td>

                  {/* Status */}
                  <td>
                    {user.isActive ? (
                      <span className="text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    {user.isActive &&
                      user.role !== "admin" && (
                        <button
                          disabled={deactivateLoading}
                          onClick={() =>
                            handleDeactivate(user._id)
                          }
                          className="
                            text-red-600 hover:underline
                            disabled:opacity-50
                          "
                        >
                          Deactivate
                        </button>
                      )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </DashboardLayout>
  );
}

/* ===========================
   Stat Card
=========================== */
function Stat({ title, value, loading }) {
  return (
    <div
      className="
        bg-white p-5 rounded shadow
        hover:shadow-lg transition-all duration-200
        hover:scale-[1.02]
      "
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-2xl font-bold mt-2">
        {loading ? "..." : value}
      </p>
    </div>
  );
}
