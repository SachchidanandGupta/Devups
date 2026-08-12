import { useEffect } from "react";
import useAuth from "../../features/auth/hooks/useAuth";
import useFriend from "../../features/friends/hooks/useFriend";
import useContest from "../../features/contest/hooks/useContest";
 const useAppInit = () =>{
    const {fetchMe} = useAuth();
    const {requestsPending} = useFriend();
    
    
    useEffect(()=>{
         fetchMe();
         requestsPending();
    },[])
}

export default useAppInit;

