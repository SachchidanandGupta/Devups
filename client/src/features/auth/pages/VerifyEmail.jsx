import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BinaryDesign from "../components/BinaryDesign";
import AuthFooter from "../components/AuthFooter";

const VerifyEmail = () => {
  const { confirmEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); 
  const [failReason, setFailReason] = useState("");
  const attempted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("failed");
      setFailReason("No verification token was provided.");
      return;
    }
    if (attempted.current) return;
    attempted.current = true;

    (async () => {
      const success = await confirmEmail(token);
      if (success) {
        setStatus("success");
      } else {
        setStatus("failed");
        setFailReason(
          "This link is invalid or has expired. Request a new one from the login page.",
        );
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    if (status === "success" && isAuthenticated) {
      const timer = setTimeout(() => navigate("/"), 1500);
      return () => clearTimeout(timer);
    }
  }, [status, isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-4 bg-black font-sans overflow-hidden relative">
      <BinaryDesign />

      <div className="max-w-lg w-full bg-surface border border-border z-10 flex flex-col p-6 sm:p-8 gap-4 text-center">
        {status === "verifying" && (
          <>
            <h2 className="text-accent text-lg sm:text-xl font-bold tracking-widest animate-pulse">
              VERIFYING_IDENTITY...
            </h2>
            <p className="text-text-muted text-xs sm:text-sm">
              Hold tight, confirming your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-accent text-lg sm:text-xl font-bold tracking-widest">
              IDENTITY_CONFIRMED
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm">
              Your email has been verified. Redirecting you in...
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <h2 className="text-danger text-lg sm:text-xl font-bold tracking-widest">
              VERIFICATION_FAILED
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm">
              {failReason}
            </p>
            <Link
              to="/register"
              className="text-accent text-[10px] sm:text-xs tracking-widest hover:text-white transition-colors mt-2 border border-accent px-4 py-2 uppercase font-bold"
            >
              BACK_TO_REGISTER
            </Link>
          </>
        )}
      </div>

      <AuthFooter />
    </div>
  );
};

export default VerifyEmail;