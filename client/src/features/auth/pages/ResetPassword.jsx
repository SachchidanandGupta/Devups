import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import { MdOutlineTerminal } from "react-icons/md";
import AuthFooter from "../components/AuthFooter";
import BinaryDesign from "../components/BinaryDesign";
import FormHeader from "../components/FormHeader";

const ResetPassword = () => {
  const { resetPasswordRequest, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(token ? "form" : "failed");
  const [formError, setFormError] = useState(
    token ? "" : "No reset token was provided.",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    setFormError("");

    const success = await resetPasswordRequest(token, newPassword);
    if (success) {
      setStatus("success");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setStatus("failed");
      setFormError(
        "This link is invalid or has expired. Request a new one.",
      );
    }
  };

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

      <div className="max-w-lg w-full bg-surface border border-border z-10">
        <FormHeader />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col border-b border-border pb-6">
            <div className="relative pl-4">
              <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-accent"></div>
              <div>
                <h2
                  className={`text-lg sm:text-xl font-bold tracking-widest ${
                    status === "failed" ? "text-danger" : "text-accent"
                  }`}
                >
                  {status === "form" && "RESET_PASSWORD"}
                  {status === "success" && "PASSWORD_UPDATED"}
                  {status === "failed" && "RECOVERY_FAILED"}
                </h2>
                <span className="text-text-secondary text-xs sm:text-sm tracking-widest uppercase block mt-1">
                  {status === "form" && "SET_NEW_CREDENTIALS"}
                  {status === "success" && "REDIRECTING_TO_LOGIN..."}
                  {status === "failed" && "LINK_INVALID_OR_EXPIRED"}
                </span>
              </div>
            </div>

            {status === "form" && (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <InputField
                    label="New_password"
                    id="newPassword"
                    type="password"
                    placeholder="........"
                    value={newPassword}
                    define={"encrypted"}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputField
                    label="Confirm_password"
                    id="confirmPassword"
                    type="password"
                    placeholder="........"
                    value={confirmPassword}
                    define={"encrypted"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {formError && (
                  <div className="p-3 border border-danger bg-danger/5 animate-pulse mt-4">
                    <p className="text-xs sm:text-sm text-danger font-bold text-center uppercase tracking-widest">
                      {formError}
                    </p>
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
                      UPDATING...
                    </span>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 group-hover:gap-4 transition-all ease-in-out">
                      <span>UPDATE_PASSWORD</span>
                      <MdOutlineTerminal size={20} />
                    </div>
                  )}
                </button>
              </form>
            )}

            {status === "failed" && (
              <div className="mt-8 flex flex-col items-center gap-4">
                {formError && (
                  <p className="text-text-secondary text-xs sm:text-sm text-center tracking-widest">
                    {formError}
                  </p>
                )}
                <Link
                  to="/forgot-password"
                  className="text-accent text-[10px] sm:text-xs tracking-widest hover:text-white transition-colors border border-accent px-4 py-2 uppercase font-bold"
                >
                  REQUEST_NEW_LINK
                </Link>
              </div>
            )}

            {status === "success" && (
              <p className="mt-8 text-text-secondary text-xs sm:text-sm text-center tracking-widest">
                You can now log in with your new password.
              </p>
            )}
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default ResetPassword;