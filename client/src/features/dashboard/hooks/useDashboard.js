import React from "react";
import useAuth from "../../auth/hooks/useAuth";
const useDashBoard = () => {
  const {user,isLoading} = useAuth();
  return {
    xp: user?.xp || 0,
    level: user?.level || 0,
    streak: user?.streak || 0,
    maxStreak: user?.maxStreak || 0,
    leetcodeSolved: user?.leetcodeSolved || 0,
    currentXP: user?.currentXP ?? 0,
    requiredXP: user?.requiredXP ?? 100,
    isLoading
  };
};

export default useDashBoard;
