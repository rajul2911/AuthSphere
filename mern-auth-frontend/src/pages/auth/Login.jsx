// import { useState, useEffect } from "react";
// import { useLoginMutation } from "../../api/authApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../features/auth/authSlice";
// import { useNavigate, Link } from "react-router-dom";

// import toast from "react-hot-toast";

// import AuthLayout from "../../components/layout/AuthLayout";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [login, { isLoading, isSuccess, data, error }] =
//     useLoginMutation();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   /* =====================================
//      Handle Success / Error
//   ===================================== */

//   useEffect(() => {
//     // Success
//     if (isSuccess && data?.data) {
//       dispatch(setUser(data.data));

//       toast.success("Login successful");

//       const role = data.data.role;

//       if (role === "admin") navigate("/admin");
//       else if (role === "manager") navigate("/manager");
//       else navigate("/employee");
//     }

//     // Error
//     if (error) {
//       const message =
//         error?.data?.message ||
//         error?.error ||
//         "Invalid credentials";

//       toast.error(message);
//     }
//   }, [isSuccess, data, error, dispatch, navigate]);

//   /* =====================================
//      Submit Handler
//   ===================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     await login({ email, password });
//   };

//   return (
//     <AuthLayout title="Login">
//       <form onSubmit={handleSubmit} className="space-y-4">

//         <Input
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />

//         <Input
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your password"
//         />

//         <Button loading={isLoading}>
//           Login
//         </Button>

//         <p className="text-sm text-center mt-4">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-blue-600 hover:underline"
//           >
//             Signup
//           </Link>
//         </p>

//       </form>
//     </AuthLayout>
//   );
// }



import { useState, useEffect } from "react";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [login, { isLoading, isSuccess, data, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mouse move handler for the spotlight effect
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setUser(data.data));
      toast.success("Login successful");
      const role = data.data.role;
      if (role === "admin") navigate("/admin");
      else if (role === "manager") navigate("/manager");
      else navigate("/employee");
    }
    if (error) {
      const message = error?.data?.message || error?.error || "Invalid credentials";
      toast.error(message);
    }
  }, [isSuccess, data, error, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");
    await login({ email, password });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a] p-6 selection:bg-indigo-500/30"
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      </div>

      {/* Mouse Spotlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
        }}
      />

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-10 border border-white/20 z-20 transition-all duration-500 hover:shadow-indigo-500/10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-gray-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          New here?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-bold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}