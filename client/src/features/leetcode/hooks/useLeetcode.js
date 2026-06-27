import {getDailyQuestions} from "../api/leetcode.api";
import useLeetStore from "../store/useLeetStore";


const useLeetcode = async() =>{
    const fetchDaily = async() =>{
        useLeetStore.getState().setIsLoading(true);
        try{
            const data = await getDailyQuestions();
            useLeetStore.getState().setDaily(data.data);
        }
    }

}