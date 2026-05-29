import { create} from "zustand";


const useFriendStore = create((set)=>({
    friends:[],
    isLoading:false,
    error:null,

    setFriends:((friend)=>set({friends:friend})),
    setIsLoading:((bool)=>set({isLoading:bool})),
    setError:((error)=>set({error:error}))
}))

export default useFriendStore;