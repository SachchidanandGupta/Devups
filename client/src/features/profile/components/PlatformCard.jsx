import React from "react";
import { SiLeetcode, SiCodeforces, SiGithub } from "react-icons/si";

const PlatformCard = ({ platfromUsername, platfrom, style,setIsEditPopUpOpen,isOwnProfile }) => {
  const platfromIcon = [
    { platfromName: "github", icon: SiGithub },
    { platfromName: "codeforces", icon: SiCodeforces },
    { platfromName: "leetcode", icon: SiLeetcode },
  ];

  const IconComponent = platfromIcon.find(
    (item) => item.platfromName === platfrom,
  )?.icon;

  return (
    <div 
     onClick={()=>{
      if(isOwnProfile) setIsEditPopUpOpen(true)
     }}
    className="w-full border border-border uppercase p-4 hover:border-accent flex flex-col justify-start bg-surface-2 font-sans transition-colors min-w-0">
      <span className="text-text-secondary text-xs">{platfrom}_id</span>

      {platfromUsername ? (
        <span className="flex items-center gap-2 text-accent mt-2 truncate">
          {IconComponent && <IconComponent className={`shrink-0 ${style}`} />}
          <span className="truncate">{platfromUsername}</span>
        </span>
      ) : (
        <span className="flex items-center gap-2 text-text-muted mt-2 truncate">
          {IconComponent && <IconComponent className={`shrink-0 ${style}`} />}
          <span className="truncate">connect_{platfrom}</span>
        </span>
      )}

      <div className="w-full border-b border-border my-3"></div>

      {platfromUsername ? (
        <div className="flex flex-col gap-2">
          <span className="text-text-muted text-[10px] sm:text-xs">
            sys_status: optimal
          </span>
          <div className="w-full h-1.5 bg-accent"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-text-muted text-[10px] sm:text-xs">
            sys_status: bugged
          </span>
          <div className="w-full h-1.5 bg-accent-dim"></div>
        </div>
      )}
    </div>
  );
};

export default PlatformCard;
