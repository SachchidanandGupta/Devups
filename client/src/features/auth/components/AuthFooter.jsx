import React from "react";

const AuthFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-3 bg-surface-2 border-t border-border font-mono z-50">
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 w-full sm:w-auto">
        <span className="text-accent font-bold text-xs sm:text-sm tracking-widest shrink-0">
          DEVUPS_OS
        </span>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="text-text-muted hover:text-text-primary text-[10px] sm:text-xs transition-colors tracking-widest uppercase">
            API_DOCS
          </button>
          <button className="text-text-muted hover:text-text-primary text-[10px] sm:text-xs transition-colors tracking-widest uppercase">
            CORE_PROTOCOL
          </button>
          <button className="text-text-muted hover:text-text-primary text-[10px] sm:text-xs transition-colors tracking-widest uppercase hidden md:block">
            SECURITY_POLICY
          </button>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end items-center w-full sm:w-auto shrink-0">
        <span className="uppercase text-text-secondary text-[10px] sm:text-xs tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          devups [version 1.0.4] - all systems operational
        </span>
      </div>
    </div>
  );
};

export default AuthFooter;
