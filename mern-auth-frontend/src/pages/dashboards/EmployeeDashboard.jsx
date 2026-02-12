import DashboardLayout from "../../components/layout/DashboardLayout";
import { useGetMeQuery } from "../../api/authApi";

export default function EmployeeDashboard() {
  const { data, isLoading } = useGetMeQuery();
  const user = data?.data;

  const sessionCount = user?.sessions?.length || 0;

  const accountAge =
    user?.createdAt
      ? Math.floor(
          (Date.now() - new Date(user.createdAt)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Employee Dashboard
      </h2>

      {isLoading ? (
        <p>Loading profile...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Stat
              title="Last Login"
              value={
                user?.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Never"
              }
            />
            <Stat
              title="Account Age (days)"
              value={accountAge}
            />
            <Stat
              title="Active Sessions"
              value={sessionCount}
            />
          </div>

          {/* Profile */}
          <div
            className="
              bg-white p-6 rounded-lg shadow
              hover:shadow-lg transition-all duration-200
              hover:scale-[1.02]
            "
          >
            <h3 className="text-lg font-semibold mb-4">
              My Profile
            </h3>

            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
            <p><b>Role:</b> {user?.role}</p>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

/* =======================
   Stat Card
======================= */
function Stat({ title, value }) {
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
        {value}
      </p>
    </div>
  );
}
