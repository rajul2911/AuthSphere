import { useState, useEffect } from "react";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isSuccess, data, error }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =====================================
     Handle Success / Error
  ===================================== */

  useEffect(() => {
    // Success
    if (isSuccess && data?.data) {
      dispatch(setUser(data.data));

      toast.success("Login successful");

      const role = data.data.role;

      if (role === "admin") navigate("/admin");
      else if (role === "manager") navigate("/manager");
      else navigate("/employee");
    }

    // Error
    if (error) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Invalid credentials";

      toast.error(message);
    }
  }, [isSuccess, data, error, dispatch, navigate]);

  /* =====================================
     Submit Handler
  ===================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    await login({ email, password });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <Button loading={isLoading}>
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline"
          >
            Signup
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}



