import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import { MdOutlineTerminal } from "react-icons/md";
import AuthFooter from "../components/AuthFooter";
import BinaryDesign from "../components/BinaryDesign";
import FormHeader from "../components/FormHeader";

const ForgotPassword = () => {
  const { forgotPasswordRequest, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPasswordRequest(email);
    setSubmitted(true);
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
                <h2 className="text-accent text-lg sm:text-xl font-bold tracking-widest">
                  {submitted ? "REQUEST_SENT" : "PASSWORD_RECOVERY"}
                </h2>
                <span className="text-text-secondary text-xs sm:text-sm tracking-widest uppercase block mt-1">
                  {submitted
                    ? "CHECK_INBOX_FOR_INSTRUCTIONS"
                    : "INITIATING_RECOVERY_PROTOCOL..."}
                </span>
              </div>
            </div>

            {!submitted ? (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <InputField
                  label="Email_address"
                  id="email"
                  type="email"
                  placeholder="root@devups.sh"
                  value={email}
                  define={"required"}
                  onChange={(e) => setEmail(e.target.value)}
                />

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
                      SENDING...
                    </span>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 group-hover:gap-4 transition-all ease-in-out">
                      <span>SEND_RESET_LINK</span>
                      <MdOutlineTerminal size={20} />
                    </div>
                  )}
                </button>
              </form>
            ) : (
              <p className="mt-8 text-text-secondary text-xs sm:text-sm text-center tracking-widest">
                If that account exists, a reset link has been sent to your
                email.
              </p>
            )}

            <p className="mt-8 text-center text-xs sm:text-sm text-text-secondary tracking-widest">
              <Link
                to="/login"
                className="font-bold text-text-primary hover:text-accent transition-colors decoration-border hover:decoration-accent underline-offset-4"
              >
                BACK_TO_LOGIN
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default ForgotPassword;