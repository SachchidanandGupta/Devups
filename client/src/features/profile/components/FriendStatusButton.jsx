import React from "react";
import { useParams } from "react-router";
import {
  MdPersonAddAlt,
  MdOutlinePending,
  MdCheck,
  MdBlockFlipped,
} from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
const FriendStatusButton = ({
  userId,
  friendStatusData,
  onAdd,
  onRemove,
  onAccept,
  onReject,
  onUnBlock,
}) => {
  /**
   * not_friends
   * friends
   * request_sent
   * request_received
   * blocked
   */
  const { status, blockedBy } = friendStatusData || {};
  const { profileId } = useParams();
  return (
    <div className="flex flex-col justify-end items-center sm:items-end shrink-0 font-sans">
      {status === "not_friends" && (
        <button
          onClick={() => onAdd(profileId)}
          className="  cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto"
        >
          <span>INITIALIZE_UPLINK</span> <MdPersonAddAlt />
        </button>
      )}
      {status === "friends" && (
        <button
          onClick={() => onRemove(profileId)}
          className="  cursor-pointer flex items-center gap-3 border border-danger text-danger text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-text-primary hover:bg-danger transition-colors w-full sm:w-auto"
        >
          <span>DISCONNECT_UPLINK</span> <FaRegEyeSlash />
        </button>
      )}
      {status === "request_sent" && (
        <button className="  flex items-center gap-3 border border-border text-text-muted text-xs sm:text-sm font-bold tracking-widest px-4 py-2  transition-colors w-full sm:w-auto">
          <span>UPLINK_PENDING</span> <MdOutlinePending />
        </button>
      )}
      {status === "request_received" && (
        <button
          onClick={() => onAccept(profileId)}
          className="  cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto"
        >
          <span>ACCEPT_HANDSHAKE</span> <MdCheck />
        </button>
      )}
      {status === "blocked" ? (
        blockedBy === userId ? (
          <button
            onClick={() => onUnBlock(profileId)}
            className="cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto"
          >
            <span>UNBAN</span>
            <MdBlockFlipped />
          </button>
        ) : (
          <button className="cursor-pointer flex items-center gap-3 border border-border text-text-muted text-xs sm:text-sm font-bold tracking-widest px-4 py-2 w-full sm:w-auto">
            <span>NODE_RESTRICTED</span>
            <MdBlockFlipped />
          </button>
        )
      ) : null}
    </div>
  );
};

export default FriendStatusButton;
