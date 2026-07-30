import React, { useEffect, useState } from "react";
import { MdOutlineTerminal } from "react-icons/md";
import useLeetcode from "../../leetcode/hooks/useLeetcode";

const ExploreQuestions = ({ selectedProblems, onAdd, onRemove, onClose }) => {
  const {
    allTags,
    exploreResults,
    selectedTags,
    toggleTag,
    searchExploreProblems,
    initialExploreProblems,
    fetchTags,
    problemsSearch,
    searchQuestions,
  } = useLeetcode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("difficulty");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    fetchTags();
    initialExploreProblems();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      if (searchQuery.trim() === "") {
        initialExploreProblems();
      } else {
        searchQuestions(searchQuery);
      }
    } else {
      searchExploreProblems(selectedTags);
    }
  }, [selectedTags, searchQuery]);

  const activeSource =
    selectedTags.length === 0 && searchQuery.trim() !== ""
      ? problemsSearch
      : exploreResults;

  const displayProblem = [...activeSource].sort(
    (a, b) => Number(a.questionFrontendId) - Number(b.questionFrontendId),
  );

  const searchFiltered =
    selectedTags.length > 0 && searchQuery.trim() !== ""
      ? displayProblem.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.questionFrontendId.startsWith(searchQuery),
        )
      : displayProblem;

  const filteredByDifficulty =
    selectedValue === "difficulty"
      ? searchFiltered
      : searchFiltered.filter((p) => p.difficulty === selectedValue);


  const getDifficultyStyle = (tier) => {
    switch (tier) {
      case "Easy":
        return "text-accent border border-accent hover:bg-accent-dim hover:text-text-primary";
      case "Medium":
        return "text-warning border border-warning hover:bg-warning-dim hover:text-text-primary";
      case "Hard":
        return "text-danger border border-danger hover:bg-danger-dim hover:text-text-primary";
      default:
        return "text-text-secondary border border-border hover:text-accent hover:border-accent";
    }
  };

  const handleChangeValue = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-surface-2/20 backdrop-blur-xs"></div>

      <div className="relative flex flex-col w-full max-w-5xl h-[95vh] md:h-[700px] bg-surface border border-border z-10 overflow-hidden">
        {/* Header */}
        <div className="uppercase text-accent flex items-center gap-2 border-b border-border p-3 sm:p-4 shrink-0 text-sm sm:text-base">
          <MdOutlineTerminal size={20} className="shrink-0" />
          <span className="truncate font-sans font-bold">
            PROTOCOL: EXPLORE_UPLINK // MODAL_SESSION_ACTIVE
          </span>
        </div>

        <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-6 font-sans">
          <div className="md:col-span-2 h-40 md:h-full w-full flex flex-col border-b md:border-b-0 md:border-r border-border p-3 sm:p-4 min-h-0">
            <div className="w-full flex items-center p-1 sm:p-2 text-text-secondary shrink-0 mb-1 sm:mb-2 text-sm sm:text-base">
              ALGORITHM_TAGS
            </div>

            <div className="flex-1 min-h-0 flex gap-2 flex-wrap content-start overflow-y-auto pr-1 pb-4">
              {allTags.map((item) => {
                const isActive = selectedTags.includes(item);
                return (
                  <button
                    onClick={() => toggleTag(item)}
                    key={item}
                    className={` ${
                      isActive
                        ? "bg-accent text-black"
                        : "text-text-secondary hover:text-accent"
                    } border border-border hover:border-accent text-nowrap text-xs sm:text-sm uppercase font-sans cursor-pointer px-2 py-1 transition-colors active:bg-danger active:text-text-primary`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col flex-1 min-h-0 h-full">
            <div className="p-3 sm:p-4 w-full flex flex-wrap justify-between items-center gap-2 font-sans border-b border-border shrink-0">
              <span className="text-text-secondary font-bold text-sm sm:text-base">
                {filteredByDifficulty?.length} NODES_ONLINE
              </span>
              <div className="flex gap-2 items-center">
                <span className="text-text-muted text-xs sm:text-sm">
                  SORT:
                </span>
                <span className="text-sm sm:text-md text-accent">
                  LATEST_UPDATE
                </span>
              </div>
            </div>

            <div className="bg-surface-2 w-full flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto p-3 sm:p-4 relative">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4 shrink-0 mb-2">
                <input
                  type="text"
                  placeholder="SEARCH_QUESTIONS...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-4 py-2 sm:py-3 border border-border text-accent placeholder-text-secondary focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm [&:-webkit-autofill]:border-accent [&:-webkit-autofill]:ring-2 [&:-webkit-autofill]:ring-accent [&:-webkit-autofill]:[-webkit-text-fill-color:#00ff88] [&:-webkit-autofill]:shadow-[0_0_0_2px_#00ff88,inset_0_0_0_1000px_#0d0d0d]"
                />

                <div className="w-full sm:w-40 relative shrink-0">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${getDifficultyStyle(
                      selectedValue,
                    )} py-2 sm:py-3 flex items-center justify-center uppercase cursor-pointer w-full sm:w-40 text-sm border`}
                  >
                    {selectedValue}
                  </div>

                  {isOpen && (
                    <div className="absolute w-full sm:min-w-40 z-20 bg-surface  mt-1">
                      <ul className="w-full">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className={`h-10 flex items-center justify-center w-full text-sm uppercase my-1 ${getDifficultyStyle(
                              option,
                            )} cursor-pointer`}
                            onClick={() => handleChangeValue(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full bg-surface flex flex-col gap-2 shrink-0">
                {filteredByDifficulty.map((items) => {
                  const isSelected = selectedProblems.some(
                    (p) => p.titleSlug === items.titleSlug,
                  );
                  let frontendId = items.questionFrontendId;
                  if (frontendId < 10) {
                    frontendId = "00" + frontendId;
                  } else if (frontendId >= 10 && frontendId < 100) {
                    frontendId = "0" + frontendId;
                  }

                  let textColor = "text-text-primary";
                  if (items.difficulty === "Easy") {
                    textColor = "text-accent";
                  } else if (items.difficulty === "Medium") {
                    textColor = "text-warning";
                  } else if (items.difficulty === "Hard") {
                    textColor = "text-danger";
                  }
                  return (
                    <div
                      key={items.titleSlug}
                      className="bg-surface border border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-3 sm:p-4 uppercase"
                    >
                      <div className="flex gap-2 sm:gap-4 items-start min-w-0 w-full sm:w-auto">
                        <div className="text-text-muted flex items-start sm:items-center mt-1 sm:mt-0 shrink-0">
                          <span className="text-xs">#</span>
                          <span className="text-sm sm:text-base">
                            {frontendId}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 items-start justify-start min-w-0 w-full">
                          <span className="text-sm sm:text-md font-bold block w-full truncate">
                            {items.title}
                          </span>

                          <div className="flex flex-wrap gap-2 items-center">
                            <span className={`text-xs ${textColor}`}>
                              {items.difficulty}
                            </span>
                            {items.topicTags?.map((tags, idx) => (
                              <div
                                key={idx}
                                className="text-text-secondary border border-border hover:border-accent hover:text-accent text-[10px] sm:text-xs p-1 text-nowrap"
                              >
                                {tags.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                        <button
                          onClick={() =>
                            isSelected
                              ? onRemove(items.titleSlug)
                              : onAdd(items)
                          }
                          className={`w-full sm:w-auto uppercase border px-4 py-2 cursor-pointer text-xs sm:text-sm font-bold transition-colors ${
                            isSelected
                              ? "text-danger border-danger hover:bg-danger hover:text-text-primary"
                              : "text-accent border-accent hover:bg-accent hover:text-black"
                          }`}
                        >
                          {isSelected ? "remove_node" : "add_node"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center border-t border-border p-3 sm:p-4 shrink-0 bg-surface z-10">
          <button
            onClick={() => onClose()}
            className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-accent text-black font-sans font-bold cursor-pointer hover:bg-white hover:text-text-secondary text-sm sm:text-base transition-colors active:bg-danger active:text-text-primary"
          >
            COMMIT_SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreQuestions;
