import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mobile-e-commerce-production.up.railway.app/api/auth/register", signupForm);
      console.log(res.data);
      
      if (res.data.message === "User already exists") {
        alert("User already exists! Redirecting to login...");
        navigate("/login");
      } else {
        // Success signup
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans antialiased text-slate-200 selection:bg-yellow-400 selection:text-black">
      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-800/80 relative overflow-hidden">
          
          {/* Subtle Decorative Yellow Glow Effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Brand Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400 text-black font-black text-xl mb-4 tracking-tighter shadow-lg shadow-yellow-400/20">
              SM
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Get Started
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Create your account 
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                onChange={handleInputChange}
                value={signupForm.name}
                name="name"
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleInputChange}
                value={signupForm.email}
                name="email"
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleInputChange}
                value={signupForm.password}
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
              Register Account
            </button>
          </form>

          {/* Account Login Link */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-yellow-400 hover:text-yellow-300 transition hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;