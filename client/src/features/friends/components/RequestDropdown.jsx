import React from "react";
import Avatar from "../../../shared/components/Avatar";
import { changeSpace } from "../../../shared/hooks/space";

const RequestDropdown = ({ requests, accept, decline, dropdownRef }) => {
  return (
    <div
      ref={dropdownRef}
      className="w-[calc(100vw-2rem)] sm:w-[320px] max-h-[80vh] flex flex-col font-sans bg-surface-2 border border-border shadow-2xl rounded-none"
    >
      {/* Header */}
      <div className="uppercase text-text-secondary bg-text-muted border-b text-xs sm:text-sm border-border px-3 py-2.5 font-sans font-bold tracking-wider shrink-0">
        incoming_uplink_requests
      </div>

      {/* Content Area */}
      {requests.length > 0 ? (
        <div className="overflow-y-auto flex-1 max-h-[300px] flex flex-col divide-y divide-border/50">
          {requests.map((s, index) => (
            <div
              className="border-b border-border flex flex-col sm:flex-row sm:items-center justify-between p-2.5 gap-2.5 bg-black"
              key={s._id || index}
            >
              {/* Requester Info */}
              <div className="flex gap-2.5 items-center min-w-0">
                <Avatar data={s.requester} />
                <div className="flex flex-col min-w-0">
                  <span className="text-text-primary truncate font-bold text-xs sm:text-sm uppercase font-sans">
                    {changeSpace(s.requester.username)} //
                  </span>
                  <span className="font-semibold text-[10px] sm:text-xs text-text-secondary font-sans">
                    LVL: {s.requester.level}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => accept(s.requester._id, "accepted")}
                  className="text-text-primary text-[10px] sm:text-xs font-semibold uppercase px-2.5 py-1 bg-accent hover:bg-text-primary hover:text-text-secondary cursor-pointer active:scale-95 active:text-text-primary active:bg-danger font-sans rounded-none transition-colors"
                >
                  accept
                </button>
                <button
                  onClick={() => decline(s.requester._id, "rejected")}
                  className="text-text-secondary border text-[10px] sm:text-xs font-semibold uppercase px-2.5 py-1 border-border bg-surface-2 hover:bg-danger hover:text-text-primary cursor-pointer active:scale-95 font-sans rounded-none transition-colors"
                >
                  decline
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5 h-[120px] bg-black p-4 text-center border-t border-accent-dim">
          <span className="text-accent text-xs sm:text-sm font-bold tracking-wider uppercase font-sans">
            no_pending_requests
          </span>
          <span className="text-text-muted text-[10px] opacity-70 tracking-widest uppercase font-sans">
            SYSTEM_IDLE // UPLINK_CLEAR
          </span>
        </div>
      )}
    </div>
  );
};

export default RequestDropdown;