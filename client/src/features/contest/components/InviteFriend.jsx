import React from "react";
import Avatar from "../../../shared/components/Avatar";

const InviteFriend = ({ friendList, removeInvite, addInvite }) => {
  const totalRecords = friendList.length;
  return (
    <div
      className={`
        grid w-full border border-border max-h-40 overflow-y-auto
        ${totalRecords === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}
      `}
    >
      {friendList.map((item) => {
        const checkboxId = `friendInvite-${item._id}`;
        return (
          <label
            key={checkboxId}
            htmlFor={checkboxId}
            className="flex items-center justify-between p-4 border border-border uppercase hover:bg-surface-2 cursor-pointer select-none"
          >
            <div className="flex items-center gap-4">
              <Avatar data={item} />
              <div className="flex flex-col">
                <span>{item.username}</span>
                {item.onlineStatus ? (
                  <span className="text-xs text-accent">online // </span>
                ) : (
                  <span className="text-xs text-text-secondary">
                    offline //{" "}
                  </span>
                )}
              </div>
            </div>

            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                name="friendInvite"
                id={checkboxId}
                className="peer appearance-none w-5 h-5 bg-text-muted checked:bg-accent transition-colors duration-200"
                onChange={(e) => {
                  if (e.target.checked) {
                    addInvite(item._id);
                  } else {
                    removeInvite(item._id);
                  }
                }}
              />

              <svg
                className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default InviteFriend;
