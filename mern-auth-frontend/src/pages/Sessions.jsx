import DashboardLayout from "../components/layout/DashboardLayout";
import {
  useGetSessionsQuery,
  useLogoutSessionMutation,
} from "../api/authApi";

import toast from "react-hot-toast";

export default function Sessions() {
  const { data, isLoading, refetch } =
    useGetSessionsQuery();

  const [logoutSession] =
    useLogoutSessionMutation();

  const sessions = data?.data || [];

  /* ==========================
     Logout One Session
  ========================== */
  const handleLogout = async (id) => {
    try {
      await logoutSession(id).unwrap();
      toast.success("Session removed");
      refetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-bold mb-6">
        Active Sessions
      </h2>

      {isLoading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No active sessions</p>
      ) : (
        <div className="space-y-4">

          {sessions.map((s) => (
            <div
              key={s.sessionId}
              className="
                bg-white p-5 rounded shadow
                hover:shadow-lg
                transition-all
              "
            >
              <p>
                <b>Device:</b>{" "}
                {s.userAgent || "Unknown"}
              </p>

              <p>
                <b>IP:</b> {s.ipAddress}
              </p>

              <p>
                <b>Created:</b>{" "}
                {new Date(
                  s.createdAt
                ).toLocaleString()}
              </p>

              <p>
                <b>Last Used:</b>{" "}
                {new Date(
                  s.lastUsedAt
                ).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  handleLogout(s.sessionId)
                }
                className="
                  mt-3 text-red-600
                  hover:underline
                "
              >
                Logout this device
              </button>
            </div>
          ))}

        </div>
      )}

    </DashboardLayout>
  );
}
