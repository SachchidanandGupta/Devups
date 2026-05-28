import { useEffect } from "react";
import useAuth from "../../features/auth/hooks/useAuth";


 const useAppInit = () =>{
    const {fetchMe} = useAuth();
    useEffect(()=>{
         fetchMe();
          
    },[])
}

export default useAppInit;

