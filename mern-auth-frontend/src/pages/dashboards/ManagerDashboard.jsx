import DashboardLayout from "../../components/layout/DashboardLayout";
import { useGetAllUsersQuery } from "../../api/adminApi";

export default function ManagerDashboard() {
  const { data, isLoading } = useGetAllUsersQuery();
  const users = data?.data || [];

  const employees = users.filter(
    (u) => u.role === "employee"
  );

  const activeEmployees = employees.filter(
    (u) => u.isActive
  ).length;

  const recentlyLoggedIn = employees.filter(
    (u) =>
      u.lastLogin &&
      new Date(u.lastLogin) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Manager Dashboard
      </h2>

      {isLoading ? (
        <p>Loading team...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Stat title="Team Size" value={employees.length} />
            <Stat title="Active Employees" value={activeEmployees} />
            <Stat title="Logged In (7 days)" value={recentlyLoggedIn} />
          </div>

          {/* Team List */}
          <div
            className="
              bg-white p-6 rounded-lg shadow
              hover:shadow-lg transition-all duration-200
            "
          >
            <h3 className="text-lg font-semibold mb-4">
              Team Members
            </h3>

            <ul className="space-y-2">
              {employees.map((u) => (
                <li
                  key={u._id}
                  className="
                    border-b pb-2
                    hover:text-blue-600 transition
                  "
                >
                  {u.name} ({u.email})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

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
