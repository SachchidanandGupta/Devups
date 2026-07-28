import React from "react";
import { useNavigate } from "react-router";
const HostContestButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/contest/create")}
      className="uppercase text-accent font-bold border border-accent px-3 py-1.5 cursor-pointer hover:bg-accent hover:text-black active:bg-danger active:border-danger active:text-text-primary text-sm "
    >
      host_contest
    </button>
  );
};

export default HostContestButton;
