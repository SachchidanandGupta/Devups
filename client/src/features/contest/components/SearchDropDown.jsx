import React from "react";

const SearchDropDown = ({ data, searchRef, onSelect }) => {
  return (
    <div
      ref={searchRef}
      className=" absolute mt-1 border border-accent w-full max-h-50 overflow-y-auto bg-surface flex flex-col font-sans  "
    >
      {data.map((item, index) => {
        const id = item.questionFrontendId;
        const title = item.title;
        const difficulty = item.difficulty;
        let textColorDifficulty = "text-text-primary";
        if (difficulty === "Easy") {
          textColorDifficulty = "text-accent";
        } else if (difficulty === "Medium") {
          textColorDifficulty = "text-warning";
        } else if (difficulty === "Hard") {
          textColorDifficulty = "text-danger";
        }
        return (
          <div
            key={item.titleSlug}
            onClick={() => onSelect(item)}
            className=" group flex items-center justify-between bg-text-muted border-b border-black p-2 hover:bg-accent cursor-pointer active:bg-danger "
          >
            <div className=" grid grid-cols-6 w-full h-8 overflow-hidden items-center ">
              <span className="text-text-primary text-md col-span-1 group-hover:text-black  group-active:text-text-primary  ">
                [{id}]
              </span>
              <span className="text-text-primary text-md col-span-5 group-hover:text-black text-nowrap  group-active:text-text-primary ">
                {title}
              </span>
            </div>
            <div className="w-full flex items-center justify-end">
              <span
                className={`${textColorDifficulty} text-md col-span-2 flex items-center justify-end group-hover:text-black  group-active:text-text-primary `}
              >
                {difficulty}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDropDown;
