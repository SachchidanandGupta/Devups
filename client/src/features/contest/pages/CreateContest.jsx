import React, { useEffect, useState, useRef } from "react";
import TopBar from "../../../shared/components/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import useLeetcode from "../../leetcode/hooks/useLeetcode";
import { Link } from "react-router";
import SearchDropDown from "../components/SearchDropDown";
import useFriend from "../../friends/hooks/useFriend";
import { MdPersonAddAlt } from "react-icons/md";
import InviteFriend from "../components/InviteFriend";
import useContest from "../hooks/useContest";
import { useNavigate } from "react-router";
import ExploreQuestions from "../components/ExploreQuestions";
const CreateContest = () => {
  const { problemsSearch, searchQuestions, searchLoading } = useLeetcode();
  const { friends, fetchFriends } = useFriend();
  const { initiateContest } = useContest();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("2");
  const [query, setQuery] = useState("");
  const [inivitedIds, setInivitedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [formError, setFormError] = useState("");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const searchRef = useRef(null);
  const options = ["0.5", "1.5", "2", "3", "4", "6"];
  const [contestData, setContestData] = useState({
    contestName: "",
    startTime: "",
    contestDuration: "2",
    endTime: "",
    participantIds: [],
    problems: [],
  });
  useEffect(() => {
    fetchFriends();
  }, []);
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => searchQuestions(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    if (query.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query]);
  useEffect(() => {
    function handleClickSearchOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickSearchOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickSearchOutside);
  }, []);
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

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleSelectProblem = (problem) => {
    setSelectedProblems((prev) => [
      ...prev,
      {
        questionFrontendId: problem.questionFrontendId,
        titleSlug: problem.titleSlug,
        title: problem.title,
        difficulty: problem.difficulty,
        platform: "leetcode",
      },
    ]);
    setQuery("");
  };

  const handleRemoveProblem = (titleSlug) => {
    setSelectedProblems((prev) =>
      prev.filter((p) => p.titleSlug !== titleSlug),
    );
  };
  const visibleResults = problemsSearch.filter(
    (p) => !selectedProblems.some((sp) => sp.titleSlug === p.titleSlug),
  );

  function determineXp(difficulty) {
    if (difficulty === "Easy") {
      return 25;
    } else if (difficulty === "Medium") {
      return 75;
    } else if (difficulty === "Hard") {
      return 175;
    }
  }

  const handleAddInvite = (friendId) => {
    setInivitedIds((prev) => [...prev, friendId]);
  };

  const handleRemoveInvite = (friendId) => {
    setInivitedIds((prev) => prev.filter((p) => p !== friendId));
  };

  const computeEndTime = (startTime, duration) => {
    const StartDate = new Date(startTime);
    const durationMs = parseFloat(duration) * 60 * 60 * 1000;
    return new Date(StartDate.getTime() + durationMs).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProblems.length === 0) {
      setFormError("Select_at_least_one_problem_to_continue.");
      return;
    }

    if (inivitedIds.length === 0) {
      setFormError("Invite_at_least_one_friend_to_continue.");
      return;
    }

    setFormError("");

    const startTimeISO = new Date(contestData.startTime).toISOString();
    const endTimeISO = computeEndTime(
      contestData.startTime,
      contestData.contestDuration,
    );

    const payload = {
      contestName: contestData.contestName,
      startTime: startTimeISO,
      endTime: endTimeISO,
      participantIds: inivitedIds,
      problems: selectedProblems.map((p) => ({
        platform: p.platform,
        titleSlug: p.titleSlug,
        title: p.title,
        difficulty: p.difficulty,
      })),
    };

    try {
      await initiateContest(payload);
      navigate("/contest");
    } catch (error) {
      setFormError("Contest_creation_failed. Try again.");
    }
  };

  return (
    <div className="font-sans  min-h-full">
      <TopBar pageField={"create_session"} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col min-h-[calc(100vh-4rem)]"
      >
        <div className="w-full p-2 sm:p-4 flex flex-col gap-4 font-sans grow">
          <div className="border border-border-white flex flex-col gap-4 p-4 bg-surface">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 uppercase">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-accent"></div>
                <span className="text-accent">contest_basics_node</span>
              </div>

              <span className="text-text-muted text-xs">id: cf-9002-x</span>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 uppercase">
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
                  required
                  className="border border-border py-3 px-2 focus:border-accent focus:outline-none text-accent placeholder:text-text-muted w-full
                  [&:-webkit-autofill]:border-accent
                [&:-webkit-autofill]:ring-2
              [&:-webkit-autofill]:ring-accent
                [&:-webkit-autofill]:[-webkit-text-fill-color:#00ff88]
                [&:-webkit-autofill]:shadow-[0_0_0_2px_#00ff88,inset_0_0_0_1000px_#0d0d0d]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="startTime"
                  className="text-text-secondary text-sm"
                >
                  start_time_utc
                </label>

                <input
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  min={getCurrentDateTime()}
                  value={contestData.startTime}
                  onChange={handleInput}
                  required
                  className="border border-border py-3 px-2 focus:border-accent focus:outline-none  text-accent w-full"
                />
              </div>

              {/* Contest Duration */}
              <div className="flex flex-col gap-2">
                <label className="text-text-secondary text-sm">
                  contest_duration_protocol
                </label>

                <div className="flex flex-wrap gap-2 w-full">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleDurationSelect(option)}
                      className={`flex-1 min-w-[3.5rem] h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer ${
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
          <div className="border border-border-white flex flex-col gap-4 p-4 uppercase bg-surface">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent"></div>
                <span className="text-accent">problem_selection_protocol</span>
              </div>

              <span
                onClick={() => setIsExploreOpen(true)}
                className="text-text-muted hover:underline hover:text-accent text-xs cursor-pointer"
              >
                Explore_nodes
              </span>
            </div>
            {/* search for questions */}
            <div ref={searchRef} className="relative">
              <div className="flex gap-2 items-center border border-border p-2 sm:p-4 justify-between">
                <div className="h-full hidden sm:block">
                  <IoSearchSharp size={20} />
                </div>
                <input
                  type="text"
                  placeholder="SEARCH_LEETCODE_QUESTION..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-full focus:outline-none text-accent placeholder:text-text-secondary text-sm sm:text-base bg-transparent"
                />
                <span className="text-text-muted text-xs whitespace-nowrap">
                  debounce_300ms
                </span>
              </div>
              {isOpen && (
                <SearchDropDown
                  data={visibleResults}
                  searchRef={searchRef}
                  onSelect={handleSelectProblem}
                />
              )}
            </div>

            {/* Desktop Table Header - Hidden on Mobile */}
            <div className="hidden sm:grid sm:grid-cols-9 gap-4 border-b border-border p-2">
              <span className="text-text-muted text-xs col-span-1">ID</span>
              <span className="text-text-muted text-xs col-span-4">
                QUESTION_TITLE
              </span>
              <span className="text-text-muted text-xs col-span-2">
                AUTO_ASSIGNED_XP
              </span>
              <span className="text-text-muted text-xs col-span-2 flex items-center justify-end">
                ACTION
              </span>
            </div>

            {selectedProblems.length > 0 ? (
              <div className="h-40 overflow-y-auto flex flex-col w-full gap-2 items-center">
                {selectedProblems.map((item) => {
                  const questionFrontendId = item.questionFrontendId;
                  const title = item.title;
                  const titleSlug = item.titleSlug;
                  const difficulty = item.difficulty;
                  const assignedXp = determineXp(difficulty);
                  let textColor = "text-text-muted";
                  if (difficulty === "Easy") {
                    textColor = "text-accent";
                  } else if (difficulty === "Medium") {
                    textColor = "text-warning";
                  } else if (difficulty === "Hard") {
                    textColor = "text-danger";
                  }

                  return (
                    <div
                      key={titleSlug}
                      className="flex flex-col sm:grid sm:grid-cols-9 gap-2 sm:gap-4 border-2 bg-text-muted border-border p-2 sm:items-center w-full"
                    >
                      {/* Mobile Top Row / Desktop ID + Title */}
                      <div className="flex items-center gap-2 sm:contents min-w-0">
                        <span className="text-text-secondary text-sm sm:text-md sm:col-span-1 flex-shrink-0">
                          #{questionFrontendId}
                        </span>
                        <span className="text-text-primary text-sm sm:text-md sm:col-span-4 truncate min-w-0">
                          {title}
                        </span>
                      </div>

                      {/* Mobile Bottom Row / Desktop XP + Action */}
                      <div className="flex items-center justify-between sm:contents mt-1 sm:mt-0">
                        <span
                          className={`${textColor} text-sm sm:text-md sm:col-span-2 whitespace-nowrap`}
                        >
                          +{assignedXp} XP
                        </span>
                        <span
                          onClick={() => handleRemoveProblem(titleSlug)}
                          className="text-danger hover:underline cursor-pointer text-xs sm:col-span-2 flex items-center sm:justify-end whitespace-nowrap"
                        >
                          remove_node
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-4 border border-dashed border-border p-4 text-center">
                <span className="text-text-muted text-xs">
                  ADD_QUESTIONS_NODES
                </span>

                <button
                  type="button"
                  onClick={() => setIsExploreOpen(true)}
                  className="px-4 py-2 border border-accent text-accent hover:text-black font-semibold hover:bg-accent cursor-pointer text-sm active:text-text-primary active:bg-danger active:border-danger transition-colors"
                >
                  EXPLORE_QUESTIONS
                </button>
              </div>
            )}
          </div>
          <div className="border border-border-white flex flex-col gap-4 p-4 bg-surface">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-accent"></div>
                <span className="text-accent">PEER_INVITATION_LINK</span>
                <div className="bg-surface-2 border-2 border-border px-4 py-1 text-accent">
                  {" "}
                  {inivitedIds?.length} / {friends?.length}{" "}
                </div>
              </div>
              {/* <span className="text-text-muted hover:text-accent hover:underline cursor-pointer text-xs">
                SELECT_ALL_FRIEND_NODES
              </span> */}
            </div>
            {friends?.length > 0 ? (
              <InviteFriend
                friendList={friends}
                addInvite={handleAddInvite}
                removeInvite={handleRemoveInvite}
              />
            ) : (
              <div className="w-full border border-border flex flex-col gap-3 items-center justify-center h-40 text-center p-4">
                <span className="text-text-muted text-sm uppercase">
                  no_peer_connection_detected
                </span>
                <Link to={"/friends"}>
                  <button
                    type="button"
                    className="px-4 py-2 flex items-center gap-2 border border-accent text-accent hover:text-black font-semibold hover:bg-accent cursor-pointer text-sm active:text-text-primary active:bg-danger active:border-danger transition-colors"
                  >
                    <MdPersonAddAlt /> INITIALISE_UPLINK
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BAR - Changed from fixed to sticky */}
        <div className="uppercase w-full p-4 sm:px-8 h-auto sm:h-20 bg-surface-2 border-t border-border-white sticky bottom-0 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 z-50">
          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <span className="text-text-muted text-xs">validation_status</span>
            <div className="flex gap-2 items-center">
              <div
                className={`h-2 w-2 ${formError ? "bg-danger" : "bg-accent animate-pulse"}`}
              ></div>
              <span
                className={
                  formError
                    ? "text-danger text-sm sm:text-base"
                    : "text-accent text-sm sm:text-base"
                }
              >
                {formError || "ready_for_uplink"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Link to={"/contest"} className="flex-1 sm:flex-none">
              <button
                type="button"
                className="w-full sm:w-auto uppercase text-danger border border-danger text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-danger hover:text-text-primary text-center"
              >
                abort_session
              </button>
            </Link>
            <button
              type="submit"
              className="flex-1 sm:flex-none uppercase bg-accent text-text-secondary text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-white text-center font-bold"
            >
              INITIALISE_CONTEST_UPLINK
            </button>
          </div>
        </div>
      </form>
      {isExploreOpen && (
        <ExploreQuestions
          selectedProblems={selectedProblems}
          onAdd={handleSelectProblem}
          onRemove={handleRemoveProblem}
          onClose={() => setIsExploreOpen(false)}
        />
      )}
    </div>
  );
};

export default CreateContest;
