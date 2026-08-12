import React, { useState, useEffect } from "react";
import { MdOutlineTerminal } from "react-icons/md";

const NoticeBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full bg-surface-2 border-b border-accent-muted p-2 font-sans uppercase text-xs md:text-sm">
      <div className="flex items-start sm:items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Content Section */}
        <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
          <MdOutlineTerminal size={20} className="shrink-0 mt-0.5 sm:mt-0 text-accent" />
          <span className="text-text-secondary leading-tight sm:leading-normal break-words">
            Solved something? Nice. Give it up to 6 hours to show up here &mdash;
            we&apos;re optimizing for your focus, not our aws bill.
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close notification"
          className="shrink-0 py-1 px-2.5 text-danger border border-danger hover:bg-danger hover:text-text-primary transition-colors cursor-pointer text-xs font-bold leading-none"
        >
          ✕
        </button>

      </div>
    </div>
  );
};

export default NoticeBar;