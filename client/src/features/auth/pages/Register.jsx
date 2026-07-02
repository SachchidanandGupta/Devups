import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import BinaryDesign from "../components/BinaryDesign";
import FormHeader from "../components/FormHeader";
import AuthFooter from "../components/AuthFooter";
import { MdOutlineTerminal } from "react-icons/md";

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-4 bg-black font-mono overflow-hidden relative">
      <BinaryDesign />

      <div className="w-full flex flex-col items-center justify-center text-center z-10 px-2 shrink-0">
        <h1 className="text-accent text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
          DEVUPS_TERMINAL
        </h1>
        <h2 className="text-text-muted text-[10px] sm:text-xs font-light mt-0.5 tracking-widest">
          SECURE_CHANNEL_ESTABLISHED // NODE:0x4F92
        </h2>
      </div>

      <div className="max-w-lg w-full bg-surface border border-border z-10 flex flex-col max-h-[85vh]">
        <FormHeader />

        <div className="p-4 sm:p-6 flex flex-col   flex-1 min-h-0">
          <div className="border-b flex pb-4  flex-col gap-4 border-border">
            <div className="flex flex-col  pb-3 shrink-0">
              <div className="relative pl-3 sm:pl-4">
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-accent"></div>
                <div>
                  <h2 className="text-accent text-base sm:text-lg lg:text-xl font-bold tracking-widest leading-tight">
                    NEW_USER_REGISTRATION
                  </h2>
                  <span className="text-text-secondary text-[9px] sm:text-[10px] lg:text-xs tracking-widest uppercase block mt-1">
                    INITIALIZING IDENTITY PROTOCOL...
                  </span>
                </div>
              </div>
            </div>

            <form
              className="mt-4 flex flex-col gap-3 sm:gap-4 shrink-0"
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <InputField
                  label="Username_id"
                  id="username"
                  type="text"
                  placeholder="identity_string"
                  value={username}
                  define={"required"}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="w-full relative">
                <InputField
                  label="Email_Address"
                  id="email"
                  type="email"
                  required
                  define={"required"}
                  placeholder="contact@network.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && !isEmailValid && (
                  <p className="absolute -bottom-3.5 left-0 text-[8px] sm:text-[9px] font-medium text-danger">
                    INVALID_EMAIL
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-3 w-full mt-1">
                <div className="flex-1">
                  <InputField
                    label="Password_key"
                    id="password"
                    type="password"
                    placeholder="........"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex-1 relative">
                  <InputField
                    label="Confirm_key"
                    id="confirm"
                    type="password"
                    placeholder="........"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  {confirm && !passwordsMatch && (
                    <p className="absolute -bottom-3.5 left-0 text-[8px] sm:text-[9px] font-medium text-danger">
                      MISMATCH
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-danger/10 p-2 border border-danger animate-pulse mt-1">
                  <p className="text-[10px] sm:text-xs text-danger font-bold text-center uppercase tracking-widest">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading || !passwordsMatch || (email && !isEmailValid)
                }
                className={`w-full group flex justify-center py-2 sm:py-2.5 px-4 border border-accent text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 mt-2 ${
                  isLoading || !passwordsMatch || (email && !isEmailValid)
                    ? "opacity-50 cursor-not-allowed bg-surface-2 text-text-muted"
                    : "hover:bg-accent hover:text-black text-accent"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    REGISTERING...
                  </span>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 group-hover:gap-4 transition-all ease-in-out">
                    <span>REGISTER_UPLINK</span>
                    <MdOutlineTerminal size={18} />
                  </div>
                )}
              </button>
            </form>

            <p className="mt-3 text-center text-[10px] sm:text-xs text-text-secondary tracking-widest shrink-0">
              EXISTING_CREDENTIALS?
              <Link
                to="/login"
                className="font-bold text-text-primary hover:text-accent transition-colors  decoration-border hover:decoration-accent  ml-1"
              >
                {" "}LOGIN_UPLINK
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-between  gap-1 sm:gap-4 mt-auto pt-3 w-full font-mono text-text-muted uppercase text-[8px] sm:text-[9px] tracking-widest overflow-hidden whitespace-nowrap shrink-0">
            <span className="shrink-0">STATUS: IDLE_WAITING</span>
            <span className="truncate">VERSION: 1.0.4_REBUILT</span>
            <span className="shrink-0">ENCRYPT: AES_256</span>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
};

export default Register;
