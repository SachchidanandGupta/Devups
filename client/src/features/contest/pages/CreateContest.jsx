import React, { useEffect, useState } from "react";
import TopBar from "../../../shared/components/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import useLeetcode from "../../leetcode/hooks/useLeetcode";
import { Link } from "react-router";
const CreateContest = () => {
  const { problemsSearch, searchQuestions, searchLoading } = useLeetcode();
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const [contestData, setContestData] = useState({
    contestName: "",
    contestStartTime: "",
    contestDuration: "",
  });
  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    searchQuestions(query);
  }, [query]);
  console.log(problemsSearch);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setContestData((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? "" : value,
    }));
  };

  const handleDurationSelect = (option) => {
    setSelected(option);

    setContestData((prev) => ({
      ...prev,
      contestDuration: option,
    }));
  };

  const options = ["0.5", "1.5", "2", "3", "4", "6"];
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div>
      <TopBar pageField={"create_session"} />
      <form>
        <div className="w-full p-4 flex flex-col gap-4 font-mono">
          <div className="border border-border flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center uppercase">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-accent"></div>
                <span className="text-accent">contest_basics_node</span>
              </div>

              <span className="text-text-muted text-xs">id: cf-9002-x</span>
            </div>

            <div className="grid grid-cols-3 gap-4 uppercase">
              {/* Contest Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contestName"
                  className="text-text-secondary text-sm"
                >
                  contest_name
                </label>

                <input
                  id="contestName"
                  name="contestName"
                  type="text"
                  placeholder="ENTER_NAME..."
                  value={contestData.contestName}
                  onChange={handleInput}
                  className="border border-border py-3 px-2 focus:border-accent focus:outline-none text-accent placeholder:text-text-muted"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contestStartTime"
                  className="text-text-secondary text-sm"
                >
                  start_time_utc
                </label>

                <input
                  id="contestStartTime"
                  name="contestStartTime"
                  type="datetime-local"
                  min={getCurrentDateTime()}
                  value={contestData.contestStartTime}
                  onChange={handleInput}
                  className="border border-border py-3 px-2 focus:border-accent focus:outline-none text-text-primary"
                />
              </div>

              {/* Contest Duration */}
              <div className="flex flex-col gap-2">
                <label className="text-text-secondary text-sm">
                  contest_duration_protocol
                </label>

                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleDurationSelect(option)}
                      className={`w-14 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                        selected === option
                          ? "bg-accent text-black border-accent"
                          : "border-border text-text-secondary hover:border-accent hover:text-accent"
                      }`}
                    >
                      <span>{option === "0.5" ? "30m" : `${option}h`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border border-border flex flex-col gap-4 p-4 uppercase">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent"></div>
                <span className="text-accent">problem_selection_protocol</span>
              </div>
              <Link to={"/contest/explore"}>
                <span className="text-accent hover:underline text-xs ">
                  Explore_nodes
                </span>
              </Link>
            </div>
            {/* search for questions */}
            <div className="flex gap-2 items-center border border-border p-4 justify-between">
              <div className="h-full">
                <IoSearchSharp size={20} />
              </div>
              <input
                type="text"
                placeholder="SEARCH_QUESTION_DATABASE..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full focus:outline-none text-accent placeholder:text-text-secondary"
              />
              <span
                className="text-text-mute
              d text-xs"
              >
                debounce_300ms
              </span>
            </div>
            <div className="grid grid-cols-9  gap-4  border-b border-border p-2 ">
              <span className="text-text-muted text-xs col-span-1 ">ID</span>
              <span className="text-text-muted text-xs col-span-3">
                QUESTION_TITLE
              </span>
              <span className="text-text-muted text-xs col-span-3">
                AUTO_ASSIGNED_XP
              </span>
              <span className="text-text-muted text-xs col-span-2 flex items-center justify-end ">
                ACTION
              </span>
            </div>
            {problemsSearch.length > 0 ? (
              <div>

              </div>
            ) : (
              <div className=" flex items-center justify-center border border-dashed border-border h-50">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-text-secondary">
                    ADD_QUESTIONS_TERMINAL
                  </span>
                  <span className="text-text-muted text-sm">
                    visit_either_explore_or_search_questions
                  </span>
                  <Link to={"/contest/explore"}>
                    <button className="text-accent border border-accent px-4 py-2 text-sm hover:bg-accent hover:text-black cursor-pointer active:bg-danger active:text-text-primary active:border-danger ">
                      EXPLORE_NODES
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
