import React, { useState } from "react";

import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    useAuthStore.getState().setError(null);
    await login(identifier, password);
    const isAuth = useAuthStore.getState().isAuthenticated;
    if (isAuth) navigate("/");
  };

  return (
    <div>
      <h1>Login into your account</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          placeholder="Enter username or email"
          required
          
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
          required
          
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p>{error}</p>}

        <p>
          Haven't registered yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
