import React, { useEffect } from "react";
import { MdOutlineTerminal } from "react-icons/md";
import useLeetcode from "../../leetcode/hooks/useLeetcode";
const ExploreQuestions = () => {
  const {
    allTags,
    exploreResults,
    selectedTags,
    toggleTag,
    searchExploreProblems,
    fetchTags,
  } = useLeetcode();
  useEffect(() => {
    fetchTags();
  }, []);
  console.log("Tags", allTags);
  console.log("SelectedTags", selectedTags);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-surface-2/20 backdrop-blur-xs"></div>

      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-surface border border-border z-10">
        <div className="uppercase text-accent flex items-center gap-2 border-b border-border p-4 shrink-0">
          <MdOutlineTerminal size={20} />
          <span className="text-nowrap font-sans font-bold">
            PROTOCOL: EXPLORE_UPLINK // MODAL_SESSION_ACTIVE
          </span>
        </div>

        <div className="h-[500px] min-h-0 grid grid-cols-1 md:grid-cols-6 font-sans">
          <div className="md:col-span-2 border-b md:border-b-0 md:border-r w-full flex flex-col border-border p-4 overflow-hidden">
            <div className="w-full flex items-center p-2 text-text-secondary shrink-0 mb-2">
              ALGORITHM_TAGS
            </div>

            <div className="flex gap-2 flex-wrap overflow-y-auto content-start pr-1 pb-4">
              {allTags.map((item) => (
                <button
                  key={item}
                  className="border border-border text-text-secondary hover:border-accent hover:text-accent text-nowrap text-sm uppercase font-sans cursor-pointer px-2 py-1 active:bg-accent active:text-black"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col overflow-hidden">
            <div className="p-4 w-full flex justify-between items-center font-sans border-b border-border shrink-0">
              <span className="text-text-secondary">NODES_ONLINE</span>
              <div className="flex gap-2 items-center">
                <span className="text-text-muted text-sm">SORT:</span>
                <span className="text-md text-accent">LATEST_UPDATE</span>
              </div>
            </div>

            <div className="bg-surface-2 w-full flex-1 overflow-y-auto p-4">
              {/* Question list items go here */}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 items-center border-t border-border p-4 shrink-0">
          <button className="px-4 py-2 border border-danger text-danger cursor-pointer hover:bg-danger hover:text-text-primary font-sans">
            ABORT_SESSION
          </button>
          <button className="px-4 py-2 bg-accent text-black font-sans font-bold cursor-pointer hover:bg-white hover:text-text-secondary">
            COMMIT_SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreQuestions;
