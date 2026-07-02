import useLeaderboardStore from "../store/useLeaderboardStore";
import {
  getGlobalLeaderboard,
  getFriendLeaderboard,
} from "../api/leaderboard.api";
import { getSocket } from "../../../shared/hooks/useSocket";
import { useEffect } from "react";

const useLeaderboard = () => {
 
const globalRankings = useLeaderboardStore((state)=>state.globalRankings);
const friendRankings = useLeaderboardStore((state)=>state.friendRankings);
const isLoading = useLeaderboardStore((state)=>state.isLoading);
const error = useLeaderboardStore((state)=>state.error);
  const fetchGlobal = async () => {
    useLeaderboardStore.getState().setIsLoading(true);
    try {
      const data = await getGlobalLeaderboard();
      useLeaderboardStore.getState().setGlobalRankings(data.globalLeaderboard);
    } catch (err) {
      useLeaderboardStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useLeaderboardStore.getState().setIsLoading(false);
    }
  };
  const fetchFriends = async () => {
    useLeaderboardStore.getState().setIsLoading(true);
    try {
      const data = await getFriendLeaderboard();
      useLeaderboardStore.getState().setFriendRankings(data.friendLeaderboard);
    } catch (err) {
      useLeaderboardStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useLeaderboardStore.getState().setIsLoading(false);
    }
  };
   useEffect(() => {
    const socket = getSocket();
    if(!socket) return;
    socket.on("leaderboard:refresh",()=>{
        fetchGlobal();
        fetchFriends();
    })
    return () => socket.off("leaderboard:refresh");
  }, []);
  return {
    fetchFriends,
    fetchGlobal,
    globalRankings,
    friendRankings,
    error,
    isLoading
  };
};

export default useLeaderboard;
