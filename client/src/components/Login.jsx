import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form with:", loginForm);
    try {
      const res = await axios.post("https://mobile-e-commerce-production-e6b9.up.railway.app//api/auth/login", loginForm);
      console.log("Login response:", res.data);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // Role-based navigation check
        if (res.data.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (res.data.role === "user") {
          navigate("/", { replace: true });
        } else {
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans antialiased text-slate-200 selection:bg-yellow-400 selection:text-black">
      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-800/80 relative overflow-hidden">
          
          {/* Subtle Decorative Yellow Glow Effect in Background */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Brand Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400 text-black font-black text-xl mb-2 tracking-tighter shadow-lg shadow-yellow-400/20">
              SM
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Login
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Welcome Back Login To Continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={loginSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleInputChange}
                value={loginForm.email}
                name="email"
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="password">
                  Password
                </label>
                
              </div>
              <input
                onChange={handleInputChange}
                value={loginForm.password}
                name="password"
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Premium Yellow Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black hover:bg-yellow-300 py-3.5 rounded-xl transition duration-200 font-bold tracking-wide uppercase text-sm shadow-xl shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-[0.99] transform"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            New to the platform?{" "}
            <Link to="/Signup" className="font-semibold text-yellow-400 hover:text-yellow-300 transition hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;