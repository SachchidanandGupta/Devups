
import React from 'react'
import useAuthStore from "../../auth/store/authStore";


const useDashBoard = () => {
    const user = useAuthStore((state)=>state.user);
    console.log(user);
  return {
    xp:user?.xp || 0,
    level:user?.level || 0,
    streak:user?.streak || 0,
    maxStreak:user?.maxStreak || 0,
    leetcodeSolved:user?.leetcodeSolved || 0
  };
};

export default useDashBoard;