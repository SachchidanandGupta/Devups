import React from "react";
import TopBar from "../../../shared/components/TopBar";
import { useState } from "react";
import InputField from "../../auth/components/InputField";
const CreateContest = () => {
  const [selected, setSelected] = useState(""); 
  const [contestData,setContestData] = useState({
    contestName:null,
    contestStartTime:null,
    contestDuration:null,
  });

  const handleInput = (e) =>{
    const {name,value} = e.target;
    setContestData((prev)=>({
         ...prev,
         [name]:value.trim() === "" || null ? undefined : value
    }))
  }
  const options = ["1.5","2","3","4","6"];

  return (
    <div>
      <TopBar pageField={"create_session"} />
      <div className="w-full p-4 flex flex-col gap-4 font-mono">
        <div className="border border-border flex flex-col gap-4 p-4">
          <div className="flex justify-between items-center uppercase">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-accent animate-pulse"></div>
              <span className="text-accent ">contest_basics_node</span>
            </div>
            <span className="text-text-muted text-xs">id: cf-9002-x</span>
          </div>
          <form action="">
            <div className="grid grid-cols-3 gap-4 items-center justify-between">
               <div className="col-span-1"></div>
               <div className="col-span-1"></div>
               <div className="col-span-1"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
