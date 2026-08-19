import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import { MdOutlineTerminal } from "react-icons/md";
import AuthFooter from "../components/AuthFooter";
import BinaryDesign from "../components/BinaryDesign";
import FormHeader from "../components/FormHeader";

const Login = () => {
  const {
    login,
    resend,
    user,
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    setError,
  } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSent, setResendSent] = useState(false);

  const isUnverifiedError =
    typeof error === "string" &&
    error.toLowerCase().includes("verify your email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResendSent(false);
    await login(identifier, password);
  };

  const handleResend = async () => {
    setResendCooldown(30);
    const success = await resend(identifier);
    if (success) setResendSent(true);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 gap-8 bg-black font-sans overflow-hidden">
      <BinaryDesign />
      <div className="w-full flex flex-col items-center justify-center text-center z-10 px-4">
        <h1 className="text-accent text-2xl sm:text-3xl font-bold tracking-tight">
          DEVUPS_TERMINAL
        </h1>
        <h2 className="text-text-muted text-xs sm:text-sm font-light mt-1 tracking-widest">
          SECURE_CHANNEL_ESTABLISHED // NODE:0x4F92
        </h2>
      </div>

      <div className="max-w-lg w-full bg-surface border border-border z-10 ">
        <FormHeader />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col border-b border-border pb-6">
            <div className="relative pl-4">
              <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-accent"></div>
              <div>
                <h2 className="text-accent text-lg sm:text-xl font-bold tracking-widest">
                  USER_AUTHENTICATION
                </h2>
                <span className="text-text-secondary text-xs sm:text-sm tracking-widest uppercase block mt-1">
                  INITIALIZING IDENTITY PROTOCOL...
                </span>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <InputField
                  label="Username_or_Email"
                  id="identifier"
                  type="text"
                  placeholder="root@devups.sh"
                  value={identifier}
                  define={"required"}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <InputField
                  label="Password_key"
                  id="password"
                  type="password"
                  placeholder="........"
                  value={password}
                  define={"encrypted"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end -mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-text-muted text-[10px] sm:text-xs tracking-widest hover:text-accent transition-colors"
                  >
                    FORGOT_PASSWORD?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="p-3 border border-danger bg-danger/5 animate-pulse mt-4">
                  <p className="text-xs sm:text-sm text-danger font-bold text-center uppercase tracking-widest">
                    {error}
                  </p>
                </div>
              )}

              {isUnverifiedError && (
                <div className="flex flex-col items-center gap-2 -mt-2">
                  {resendSent ? (
                    <p className="text-accent text-[10px] sm:text-xs tracking-widest uppercase">
                      VERIFICATION_LINK_SENT
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || isLoading}
                      className={`text-[10px] sm:text-xs tracking-widest uppercase font-bold px-3 py-1.5 border transition-colors ${
                        resendCooldown > 0 || isLoading
                          ? "opacity-50 cursor-not-allowed border-border text-text-muted"
                          : "border-accent text-accent hover:bg-accent hover:text-black cursor-pointer"
                      }`}
                    >
                      {resendCooldown > 0
                        ? `RESEND_AVAILABLE_IN_${resendCooldown}S`
                        : "RESEND_VERIFICATION_LINK"}
                    </button>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full group flex justify-center py-3.5 px-4 border border-accent text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 mt-6 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed bg-surface-2"
                    : "hover:bg-accent hover:text-black text-accent"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-accent">
                    <svg
                      className="animate-spin h-5 w-5 currentColor"
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
                    INITIALIZING...
                  </span>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 group-hover:gap-4 transition-all ease-in-out">
                    <span>INITIALISE_SESSION</span>
                    <MdOutlineTerminal size={20} />
                  </div>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs sm:text-sm text-text-secondary tracking-widest">
              NEW_USER?
              <Link
                to="/register"
                className="font-bold text-text-primary hover:text-accent transition-colors decoration-border hover:decoration-accent underline-offset-4"
              >
                {" "}
                CREATE_ACCOUNT
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-4 mt-5 w-full font-sans text-text-muted uppercase text-[9px] sm:text-[10px] tracking-widest overflow-hidden whitespace-nowrap">
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

export default Login;
