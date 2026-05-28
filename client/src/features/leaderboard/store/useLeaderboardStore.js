import { create } from "zustand";

const useLeaderboardStore = create((set) => ({
    globalRankings:[],
    friendRankings:[],
    isLoading:false,
    error:null,

    setGlobalRankings:(globalRankings)=>set({globalRankings}),
    setFriendRankings:(friendRankings)=>set({friendRankings}),
    setIsLoading:(bool)=>set({isLoading:bool}),
    setError:(error)=>set({error:error}),

}));

export default useLeaderboardStore;