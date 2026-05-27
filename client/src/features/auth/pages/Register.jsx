import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { register } = useAuth();
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    useAuthStore.getState().setError(null);
    await register(username, email, password);
    const isAuth = useAuthStore.getState().isAuthenticated;
    if (isAuth) naviagte("/");
  };

  return (
    <div>
      <h1>Register from</h1>
      <form
      onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter the username"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter email address"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your password"
        />
        <input
        value={confirm}
        onChange={(e)=>setConfirm(e.target.value)}
        type="password" placeholder="Confirm password" required  />
        <button 
        disabled={isLoading || password != confirm}
        type="submit">{isLoading ? "Registering..." :"Register"}</button>
      </form>
    </div>
  );
};

export default Register;
