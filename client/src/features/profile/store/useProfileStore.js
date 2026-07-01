import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: null,
  leetStats: null,
  leetCalander: null,
  heatMap: [],
  friends: [],
  activity: [],
  contestHistory: [],
  isLoading:false,
  error:null,
  setProfile:(data)=>set({profile:data}),
  setLeetStats:(data)=>set({leetStats:data}),
  setLeetCalander:(data)=>set({leetCalander:data}),
  setHeatMap:(data)=>set({heatMap:data}),
  setFriends:(data)=>set({friends:data}),
  setActivity:(data)=>set({activity:data}),
  setContestHistory:(data)=>set({contestHistory:data}),
  setIsLoading:(bool)=>set({isLoading:bool}),
  setError:(error)=>set({error:error})
}));

export default useProfileStore;