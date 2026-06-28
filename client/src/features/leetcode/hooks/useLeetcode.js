import {getDailyQuestions} from "../api/leetcode.api";
import leetcodeStore from "../store/leetcodeStore";


const useLeetcode = () =>{
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
    fetchDaily
  }
}

export default useLeetcode;