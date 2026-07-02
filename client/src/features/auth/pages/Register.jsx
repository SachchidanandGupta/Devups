import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../../../assets/deveups-logo.png";
import InputField from "../components/InputField";

const Register = () => {
  const {
    register,
    user,
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    setError,
  } = useAuth();
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const passwordsMatch = password === confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await register(username, email, password);
  };
  useEffect(()=>{
     if(isAuthenticated){
      navigate("/");
     }
  },[isAuthenticated])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-8">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-auto object-contain drop-shadow-sm"
            src={logo}
            alt="DEVUPS Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Join DEVUPS
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Create an account to get started.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <InputField
              label="Username"
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Email Address"
              id="email"
              type="email"
              required
              className={`block w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 sm:text-sm ${
                email && !isEmailValid
                  ? "border-red-300 focus:ring-red-500"
                  : "border-slate-200 focus:ring-teal-500"
              }`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !isEmailValid && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div>
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Confirm Password"
              id="confirm"
              type="password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {confirm && !passwordsMatch && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                Passwords do not match.
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 animate-pulse mt-4">
              <p className="text-sm text-red-600 font-medium text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !passwordsMatch || (email && !isEmailValid)}
            className={`w-full flex justify-center py-3.5 px-4 mt-6 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 transition-all duration-200 ${
              isLoading || !passwordsMatch || (email && !isEmailValid)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-600 hover:text-teal-500 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
