import React from "react";
import Dropdown from "../../../shared/components/Dropdown";
import { useState, useEffect } from "react";
import Avatar from "../../../shared/components/Avatar";
import { useNavigate } from "react-router";

const AddFriendDrop = ({ close, addRef, search, results, setSearchResult }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }
    const timer = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);
 
  return (
    <div className=" w-[350px] h-[400px] border border-border bg-surface-2 flex flex-col uppercase font-sans z-50 shadow-2xl">
      <div className="flex items-center justify-between px-2 py-1.5 bg-text-muted shrink-0 border-b border-border">
        <span className="text-accent text-sm font-bold tracking-widest">
          uplink_new_peer
        </span>
        <button
          onClick={() => close(false)}
          className="text-text-secondary hover:text-white transition-colors px-2 cursor-pointer font-bold"
        >
          X
        </button>
      </div>

      <div className="px-2 pt-2 pb-3 shrink-0 border-b border-border bg-surface-2">
        <label
          htmlFor="search_identifier"
          className="text-text-secondary text-[10px] tracking-widest mb-1 block"
        >
          search_identifier
        </label>
        <input
          id="search_identifier"
          type="text"
          placeholder="SEARCH_USERNAME..."
          onChange={(e) => setQuery(e.target.value)}
          className="border border-border px-2 py-1.5 w-full bg-black text-accent placeholder:text-text-muted placeholder:text-xs placeholder:tracking-widest text-sm focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-2 bg-surface-2 flex flex-col gap-2">
        {results?.length > 0 ? (
          results.map((user) => (
            <div
              key={user._id}
              className="flex flex-col gap-2 w-full p-2 border border-border bg-black"
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar data={user} />
                <div className="flex flex-col">
                  <span className="text-text-primary text-sm font-bold tracking-wider">
                    {user.username}
                  </span>
                  <span className="text-accent text-xs font-sans tracking-widest">
                    LVL: {user.level}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full mt-1">
                <button
                 onClick={()=>navigate(`/profile/${user._id}`)}
                className=" col-span-2 text-black bg-accent border border-accent hover:bg-black hover:text-accent font-bold tracking-widest text-xs py-1.5 transition-colors cursor-pointer uppercase">
                  visit_profile
                </button>

                <button
                  onClick={() => close(false)}
                  className="col-span-1 text-text-muted py-1.5 px-2 border border-border hover:bg-danger hover:text-black hover:border-danger font-bold tracking-widest text-xs transition-colors cursor-pointer uppercase"
                >
                  cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full w-full border border-dashed border-accent-dim flex items-center justify-center p-4 text-center bg-black">
            <span className="text-xs text-text-secondary tracking-widest leading-relaxed">
              ENTER_USERNAME_TO_INITIALIZE_UPLINK
            </span>
          </div>
        )}
      </div>

      <div className="w-full px-2 py-1.5 flex items-center justify-start bg-text-muted border-t border-border shrink-0">
        <span className="text-text-secondary text-[10px] tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-warning animate-pulse"></div>
          protocol_status: awaiting_input
        </span>
      </div>
    </div>
  );
};

export default AddFriendDrop;
