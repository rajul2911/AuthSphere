import { useState, useEffect } from "react";
import { useSignupMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, { isLoading, isSuccess, data, error }] =
    useSignupMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ===========================
     Handle Success / Error
  ============================ */
  useEffect(() => {
    // Success
    if (isSuccess && data?.data) {
      dispatch(setUser(data.data));
      toast.success("Account created successfully!");
      navigate("/employee");
    }

    // Error
    if (error) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Signup failed";

      toast.error(message);
    }
  }, [isSuccess, data, error, dispatch, navigate]);

  /* ===========================
     Submit Handler
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    await signup({
      name,
      email,
      password,
    });
  };

  return (
    <AuthLayout title="Create Account">

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 characters"
        />

        <Button loading={isLoading}>
          Sign Up
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </AuthLayout>
  );
}