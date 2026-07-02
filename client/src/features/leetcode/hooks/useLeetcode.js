import {getDailyQuestions} from "../api/leetcode.api";
import leetcodeStore from "../store/leetcodeStore";


const useLeetcode = () =>{
    const daily = leetcodeStore((state)=>state.daily);
    const isLoading = leetcodeStore((state)=>state.isLoading);
    const error = leetcodeStore((state)=>state.error);
    const fetchDaily = async() =>{
        leetcodeStore.getState().setIsLoading(true);
        try{
            const data = await getDailyQuestions();
            leetcodeStore.getState().setDaily(data.daily);
        }
        catch(err) {
             leetcodeStore.getState().setError(err.response?.data?.message || err.message);
        }finally{
            leetcodeStore.getState().setIsLoading(false);
        }
    }
  return {
    fetchDaily,
    daily,
    isLoading,
    error
  }
}

export default useLeetcode;