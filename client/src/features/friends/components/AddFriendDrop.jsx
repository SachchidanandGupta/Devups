import React, { useState, useEffect } from "react";
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
    <div className="w-[calc(100vw-2rem)] sm:w-[350px] max-h-[85vh] sm:h-[400px] border border-border bg-surface-2 flex flex-col uppercase font-sans z-50 shadow-2xl rounded-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-text-muted shrink-0 border-b border-border">
        <span className="text-accent text-xs sm:text-sm font-bold tracking-widest font-sans">
          uplink_new_peer
        </span>
        <button
          onClick={() => close(false)}
          className="text-text-secondary hover:text-white transition-colors px-1 cursor-pointer font-bold text-xs sm:text-sm font-sans"
        >
          X
        </button>
      </div>

      {/* Input Field */}
      <div className="p-2.5 shrink-0 border-b border-border bg-surface-2">
        <label
          htmlFor="search_identifier"
          className="text-text-secondary text-[10px] tracking-widest mb-1 block font-sans"
        >
          search_identifier
        </label>
        <input
          id="search_identifier"
          type="text"
          placeholder="SEARCH_USERNAME..."
          onChange={(e) => setQuery(e.target.value)}
          className="border border-border px-2.5 py-1.5 w-full bg-black text-accent placeholder:text-text-muted placeholder:text-xs placeholder:tracking-widest text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors font-sans rounded-none"
        />
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-2 bg-surface-2 flex flex-col gap-2 min-h-[160px]">
        {results?.length > 0 ? (
          results.map((user) => (
            <div
              key={user._id}
              className="flex flex-col gap-2 w-full p-2 border border-border bg-black rounded-none"
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar data={user} />
                <div className="flex flex-col min-w-0">
                  <span className="text-text-primary text-xs sm:text-sm font-bold tracking-wider truncate font-sans">
                    {user.username}
                  </span>
                  <span className="text-accent text-[10px] sm:text-xs tracking-widest font-sans">
                    LVL: {user.level}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full mt-1">
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="col-span-2 text-black bg-accent border border-accent hover:bg-black hover:text-accent font-bold tracking-widest text-[10px] sm:text-xs py-1.5 transition-colors cursor-pointer uppercase font-sans rounded-none"
                >
                  visit_profile
                </button>

                <button
                  onClick={() => close(false)}
                  className="col-span-1 text-text-muted py-1.5 px-2 border border-border hover:bg-danger hover:text-black hover:border-danger font-bold tracking-widest text-[10px] sm:text-xs transition-colors cursor-pointer uppercase font-sans rounded-none"
                >
                  cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full min-h-[140px] w-full border border-dashed border-accent-dim flex items-center justify-center p-4 text-center bg-black">
            <span className="text-[10px] sm:text-xs text-text-secondary tracking-widest leading-relaxed font-sans">
              ENTER_USERNAME_TO_INITIALIZE_UPLINK
            </span>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="w-full px-2.5 py-1.5 flex items-center justify-start bg-text-muted border-t border-border shrink-0">
        <span className="text-text-secondary text-[10px] tracking-widest flex items-center gap-2 font-sans">
          <div className="w-1.5 h-1.5 bg-warning animate-pulse rounded-none"></div>
          protocol_status: awaiting_input
        </span>
      </div>
    </div>
  );
};

export default AddFriendDrop;