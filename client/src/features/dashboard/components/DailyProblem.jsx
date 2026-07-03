import React, { useEffect } from "react";
import useLeetcode from "../../leetcode/hooks/useLeetcode";
import { MdOutlineTerminal } from "react-icons/md";
import { useNavigate } from "react-router";
const DailyProblem = () => {
  const { fetchDaily,daily } = useLeetcode();
  const navigate = useNavigate();
  useEffect(() => {
    fetchDaily();
  }, []);
  const { title, link, difficulty, acRate, questionNumber, description } =
    daily || {};
  const executionRate = (acRate / 2).toFixed(0);
  let design = "";
  let reward = 0;
  if (difficulty === "Easy") {
    design = " border-accent bg-accent-dim text-accent";
    reward = 5;
  } else if (difficulty === "Medium") {
    design = " border-warning bg-warning-dim text-warning";
    reward = 15;
  } else if(difficulty === "Hard") {
    design = " border-danger bg-danger-dim text-danger";
    reward = 35;
  }

  function changeString(str) {
    if (!str) return "";
    return str.replace(/ /g, "_");
  }
  return (
    <div className="border border-border h-full flex flex-col ">
      <div className="  p-2 flex justify-between items-center border-b border-border bg-surface-2">
        <span className="uppercase text-text-primary text-xm ">
          activity_mission_protocol
        </span>
        <span className="uppercase text-text-secondary text-sm ">
          priority: high
        </span>
      </div>
      <div className="p-4 flex flex-col gap-4 w-full">
        <div className=" flex flex-col flex-start gap-4 pb-4  border-b-2 border-border ">
          <div className={`border ${design}  px-4 py-2 uppercase w-1/2`}>
            difficulty_stability : {difficulty}
          </div>
          <div className="uppercase text-xl font-semibold">
            {questionNumber}. {changeString(title)}
          </div>
          <div className="text-sm text-text-secondary">{description}</div>
          <div className="w-1/2 flex gap-5 items-center  ">
            <div className="flex flex-col flex-start ">
              <span className="text-xs text-text-muted  uppercase">
                success_rate
              </span>
              <span className="text-text-primary  font-mono font-bold">
                {acRate}%
              </span>
            </div>
            <div className="flex flex-col flex-start">
              <span className="text-xs text-text-muted  uppercase">
                avg_exec_time
              </span>
              <span className="text-text-primary  font-mono font-bold">
                {executionRate}MS
              </span>
            </div>

            <div className="flex flex-col flex-start">
              <span className="text-xs text-text-muted  uppercase">
                rewards
              </span>
              <span className="text-accent  font-bold">+{reward} XP</span>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <a
            href={`${link}`}
            target="_blank"
            className="uppercase whitespace-nowrap flex items-center justify-center px-4 py-6 bg-accent border-2 border-accent text-surface-2 gap-2 cursor-pointer hover:bg-text-primary hover:border-border active:scale-95"
          >
            <MdOutlineTerminal size={20} />{" "}
            <span>initialize_solver_uplink</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DailyProblem;
