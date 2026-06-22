import React from "react";
import Avatar from "../../../shared/components/Avatar";

const RequestDropdown = ({ requests, accept, decline, dropdownRef }) => {
  
  return (
    <div ref={dropdownRef} className=" absolute top-12 w-full h-50">
      {requests.length > 0 ? (
        <div className="w-full h-full">
          <div className="absolute top-12 w-full mt-1 flex flex-col"></div>
          <div className="uppercase text-text-secondary bg-text-muted border text-sm border-border px-2 py-3">
            incoming uplink requests
          </div>

          <div className="bg-surface-2">
            {requests.map((s, index) => (
              <div
                className="border border-border flex justify-between items-center px-1"
                key={s._id || index}
              >
                <div className="flex gap-2 items-center">
                  <Avatar data={s.requester} />
                  <div className="flex flex-col">
                    <span className="text-text-primary font-bold text-sm uppercase">
                      {s.requester.username} //
                    </span>
                    <span className="font-semibold text-xs">
                      lvl:{s.requester.level}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 py-3 px-1">
                  <button
                    onClick={() => accept(s.requester._id, "accepted")}
                    className="text-text-primary text-xs font-semibold uppercase  px-2 py-1 w-16 bg-accent hover:bg-text-primary hover:text-text-secondary cursor-pointer"
                  >
                    accept
                  </button>
                  <button
                    onClick={() => decline(s.requester._id, "rejected")}
                    className="text-text-secondary border text-xs  font-semibold uppercase px-2 w-16 py-1  border-border bg-surface-2 hover:bg-danger hover:text-text-primary cursor-pointer"
                  >
                    decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xl w-full h-full flex items-center justify-center text-text-secondary font-bold uppercase p-1 border border-border bg-surface-2 ">
          No pending requests
        </div>
      )}
    </div>
  );
};

export default RequestDropdown;
