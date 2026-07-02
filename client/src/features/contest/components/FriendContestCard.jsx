import React, { useEffect, useState } from "react";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { GoTrophy } from "react-icons/go";
import useAuth from "../../auth/hooks/useAuth";
const FriendContestCard = ({ contest, onComplete }) => {
  const {
    _id,
    creator,
    participants = [],
    startTime,
    endTime,
    status = "pending",
    winner,
    scores = [],
    contestName,
    target = 100,
  } = contest || {};
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const username = user?.username;
  const currentUserId = user?._id;

  useEffect(() => {
    const calc = () => {
      const diff = new Date(startTime) - new Date();
      if (diff <= 0) {
        setTimeLeft("LIVE_NOW");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  useEffect(() => {
    const remainedTime = () => {
      const left = new Date(endTime) - new Date();
      if (left <= 0) {
        setTimeRemaining("COMPLETED");
        return;
      }
      const h = Math.floor(left / 3600000);
      const m = Math.floor((left % 3600000) / 60000);
      const s = Math.floor((left % 60000) / 1000);
      setTimeRemaining(`${h}h ${m}m ${s}s`);
    };
    remainedTime();
    const interval = setInterval(remainedTime, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const getScore = (userId) => {
    const scoreEntry = scores.find((s) => String(s.userId) === String(userId));
    return scoreEntry ? scoreEntry.xpEarned : 0;
  };
  const getProgress = (xpEarned) => {
    return Math.min(Math.floor((xpEarned / target) * 100), 100);
  };

  const getTopUserName = (topUserId) => {
    const topUserName = participants.find(
      (s) => String(s._id) === String(topUserId),
    );
    return topUserName ? topUserName.username : "TBA";
  };
  const currentUserScore =
    scores.find((s) => String(s.userId) === String(currentUserId))?.xpEarned ||
    0;

  const topScore = scores.length
    ? Math.max(...scores.map((s) => s.xpEarned))
    : 0;

  return (
    <div className="flex flex-col group bg-surface-2 p-4 sm:p-6 gap-6 border border-border hover:border-accent transition-all delay-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-4 items-center min-w-0 flex-1">
          <div className="relative w-12 h-12 overflow-hidden bg-surface-2 border border-border group-hover:border-accent shrink-0">
            {creator.avatar ? (
              <img
                src={creator.avatar}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold font-mono text-xl bg-surface-2">
                {creator.username
                  ? creator.username.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <h1 className="font-semibold text-lg sm:text-xl font-mono text-text-primary uppercase truncate group-hover:text-accent transition-colors">
              {creator._id === currentUserId
                ? participants.length > 2
                  ? `YOUR_CHALLENGE + ${participants.length - 2} OTHERS`
                  : "YOUR_CHALLENGE"
                : participants.length > 2
                  ? `${creator.username} + ${participants.length - 2} OTHERS VS ${username}`
                  : `${creator.username} VS ${username}`}
            </h1>
            <span className="uppercase text-xs sm:text-sm text-text-secondary truncate block mt-0.5">
              Challenge: {contestName}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end shrink-0 bg-black/40 p-2 sm:p-0 sm:bg-transparent border border-border sm:border-transparent rounded-sm sm:rounded-none">
          {timeLeft === "LIVE_NOW" ? (
            timeRemaining === "COMPLETED" ? (
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-text-primary font-bold text-xl">
                  {timeRemaining}
                </span>
                <span className="uppercase text-xs text-text-secondary tracking-widest">
                  CONCLUDED
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-accent font-bold text-xl">
                  {timeRemaining}
                </span>
                <span className="uppercase text-xs text-accent tracking-widest animate-pulse">
                  LIVE_EXECUTION
                </span>
              </div>
            )
          ) : (
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-text-primary font-bold text-xl sm:text-2xl">
                {timeLeft}
              </span>
              <span className="uppercase text-xs text-text-secondary tracking-widest">
                STARTS_IN
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {participants.map((participant) => {
          const score = getScore(participant._id);
          const progress = getProgress(score);

          return (
            <div
              key={participant._id}
              className="flex flex-col w-full font-mono"
            >
              <div className="flex w-full justify-between items-center mb-1">
                <span className="text-xs sm:text-sm text-text-primary group-hover:text-accent font-medium truncate pr-4">
                  {participant.username.toUpperCase()}
                </span>
                <span className="text-xs text-accent font-semibold shrink-0">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-surface h-2 border border-border">
                <div
                  className="bg-accent transition-all duration-500 h-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full border-b border-border"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8 min-w-0 flex-1">
          <div className="flex flex-col">
            <span className="text-text-secondary text-[10px] sm:text-xs tracking-widest">
              YOUR_SCORE
            </span>
            <span className="text-text-primary text-base sm:text-xl font-bold truncate">
              {currentUserScore}/{target}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-text-secondary text-[10px] sm:text-xs tracking-widest">
              TOP_SCORE
            </span>
            <span className="text-text-primary text-base sm:text-xl font-bold truncate">
              {topScore}/{target}
            </span>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-text-secondary text-[10px] sm:text-xs tracking-widest">
              WINNER
            </span>
            {timeRemaining === "COMPLETED" ? (
              <div className="text-accent text-base sm:text-xl font-bold truncate">
                {getTopUserName(winner)}
              </div>
            ) : (
              <div className="text-text-primary text-base sm:text-xl font-bold">
                TBA
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-border sm:border-t-0">
          {timeRemaining !== "COMPLETED" && timeLeft === "LIVE_NOW" ? (
            <button className="text-accent text-xs sm:text-sm font-bold tracking-widest hover:underline active:scale-95 transition-all cursor-pointer">
              JOIN_NOW ➤
            </button>
          ) : (
            <button
              disabled
              className="font-bold text-xs sm:text-sm text-text-muted tracking-widest cursor-poniter"
            >
              CONTEST ➤
            </button>
          )}

          {status !== "completed" &&
            String(creator?._id) === String(currentUserId) && (
              <button
                onClick={() => onComplete?.(_id)}
                className="text-accent text-xs sm:text-sm font-bold tracking-widest border border-accent px-3 py-1.5 hover:bg-accent hover:text-black active:scale-95 transition-all cursor-pointer"
              >
                COMPLETE
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default FriendContestCard;
