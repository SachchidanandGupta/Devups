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
  friendStatus,
  onAdd,
  onRemove,
  onAccept,
  onReject,
}) => {
  /**
   * not_friends
   * friends
   * request_sent
   * request_received
   * blocked
   */
  const {userId} = useParams(); 
  return (
    <div className="flex flex-col justify-end items-center sm:items-end shrink-0">
      {friendStatus === "not_friends" && (
        <button onClick={()=>onAdd(userId)} className="  cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto">
          <span>INITIALIZE_UPLINK</span> <MdPersonAddAlt />
        </button>
      )}
      {friendStatus === "friends" && (
        <button onClick={()=>onRemove(userId)} className="  cursor-pointer flex items-center gap-3 border border-danger text-danger text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-text-primary hover:bg-danger transition-colors w-full sm:w-auto">
          <span>DISCONNECT_UPLINK</span> <FaRegEyeSlash />
        </button>
      )}
      {friendStatus === "request_sent" && (
        <button className="  flex items-center gap-3 border border-border text-text-muted text-xs sm:text-sm font-bold tracking-widest px-4 py-2  transition-colors w-full sm:w-auto">
          <span>UPLINK_PENDING</span> <MdOutlinePending />
        </button>
      )}
      {friendStatus === "request_received" && (
        <button onClick={()=>onAccept(userId)} className="  cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto">
          <span>ACCEPT_HANDSHAKE</span> <MdCheck />
        </button>
      )}
      {friendStatus === "blocked" && (
        <button className="  flex items-center gap-3 bg-surface text-text-muted text-xs sm:text-sm font-bold tracking-widest px-4 py-2  transition-colors w-full sm:w-auto">
          <span>NODE_RESTRICTED</span> <MdBlockFlipped />
        </button>
      )}
    </div>
  );
};

export default FriendStatusButton;
