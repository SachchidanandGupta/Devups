import { create} from "zustand";


const useFriendStore = create((set)=>({
    friends:[],
    pendingFriendRequests:[],
    isLoading:false,
    error:null,

    setFriends:((friend)=>set({friends:friend})),
    setPendingFriendRequests:((data)=>set({pendingFriendRequests:data})),
    setIsLoading:((bool)=>set({isLoading:bool})),
    setError:((error)=>set({error:error}))
}))

export default useFriendStore;