import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { LOGIN } from "@/utils/constant.js";
import API from "@/utils/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(LOGIN, { email, password });
      const { token, user } = res.data;
      setUser(user, token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
      toast.success("Login successful!", {
        style: { background: "#0f172a", color: "#00ffff", fontWeight: "500" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        style: { background: "#0f172a", color: "#f87171", fontWeight: "500" },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] font-inter text-3xl">
      {/* Glass Card */}
      <div className="h-auto w-[90%] sm:w-[80%] md:w-[420px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-7 text-white transition-all duration-300 ">
        {/* Logo and Welcome */}
        <div className="mb-3 flex flex-col items-center text-center">
          <h1 className="text-3xl font-orbitron font-bold text-cyan-400 mb-1 tracking-wide">
            SyncFleet
          </h1>
          <p className="text-gray-300 text-xs">Enter your credentials</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 rounded-lg overflow-hidden border border-white/20">
          <button
            type="button"
            className={`flex-1 py-2 font-semibold text-xs transition ${
              mode === "login"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 font-semibold text-xs transition ${
              mode === "register"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        {/* Social Auth */}
        <div className="flex justify-between mb-4 gap-2">
          <button
            type="button"
            className="flex-1 flex items-center justify-center border border-white/20 rounded-lg py-2 bg-white/5 hover:bg-white/10 transition font-semibold text-gray-200 text-xs"
            disabled
          >
            <FaGoogle className="w-4 h-4 mr-1 text-cyan-400" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center border border-white/20 rounded-lg py-2 bg-white/5 hover:bg-white/10 transition font-semibold text-gray-200 text-xs"
            disabled
          >
            <FaFacebookF className="w-4 h-4 mr-1 text-cyan-400" />
            Facebook
          </button>
        </div>

        <div className="flex items-center my-2">
          <hr className="flex-1 border-white/20" />
          <span className="mx-2 text-[10px] text-gray-400 font-semibold">
            or
          </span>
          <hr className="flex-1 border-white/20" />
        </div>

        {/* Login Form */}
        <form className="space-y-3" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-1 text-xs"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-white/20 rounded-lg py-2 px-3 bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-1 text-xs"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-white/20 rounded-lg py-2 px-3 bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-8 text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                tabIndex={-1}
              >
                {showPassword ? (
                  <HiEye className="w-4 h-4" />
                ) : (
                  <HiEyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-yellow-400 hover:to-orange-500 text-black font-semibold py-2 rounded-lg shadow-lg transition flex items-center justify-center gap-1 text-xs"
          >
            
            Login
          </button>
        </form>

        <div className="mt-3 text-[10px] text-gray-400 text-center">
          By continuing, you agree to{" "}
          <span className="text-cyan-400 hover:underline cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-cyan-400 hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
