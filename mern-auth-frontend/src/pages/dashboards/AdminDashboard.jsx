import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  useGetAllUsersQuery,
  useGetAuditLogsQuery,
} from "../../api/adminApi";

export default function AdminDashboard() {
  const { data: usersData } = useGetAllUsersQuery();
  const { data: logsData } = useGetAuditLogsQuery();

  const users = usersData?.data || [];
  const logs = logsData?.data || [];

  const managers = users.filter((u) => u.role === "manager").length;
  const employees = users.filter((u) => u.role === "employee").length;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <Stat title="Total Users" value={users.length} />
        <Stat title="Managers" value={managers} />
        <Stat title="Employees" value={employees} />
        <Stat title="Audit Logs" value={logs.length} />

      </div>

      {/* Users Table */}
      <div
        className="
          bg-white shadow rounded-lg p-6 mb-8
          hover:shadow-lg
          transition-all duration-200 ease-in-out
        "
      >
        <h3 className="text-lg font-semibold mb-4">
          Users
        </h3>

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="
                  border-b
                  hover:bg-blue-50
                  transition
                "
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Logs */}
      <div
        className="
          bg-white shadow rounded-lg p-6
          hover:shadow-lg
          transition-all duration-200
        "
      >
        <h3 className="text-lg font-semibold mb-4">
          Audit Logs
        </h3>

        <ul className="space-y-2 text-sm">
          {logs.slice(0, 8).map((log) => (
            <li
              key={log._id}
              className="
                border-b pb-2
                hover:text-blue-600
                transition
              "
            >
              {log.action} by {log.performedBy?.name}
            </li>
          ))}
        </ul>
      </div>

    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div
      className="
        bg-white p-5 rounded shadow
        hover:shadow-lg
        transition-all duration-200 ease-in-out
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
