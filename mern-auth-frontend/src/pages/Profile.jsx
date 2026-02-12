import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useGetMeQuery, useUpdateProfileMutation } from "../api/authApi";
import toast from "react-hot-toast";

export default function Profile() {
  const { data } = useGetMeQuery();
  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const user = data?.data;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({ name, email }).unwrap();
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        My Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md"
      >
        <div className="mb-4">
          <label>Name</label>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label>Email</label>
          <input
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </DashboardLayout>
  );
}
