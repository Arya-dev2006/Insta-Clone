import { useContext } from "react";
import { AuthContext } from "../global.context";
import {login, register} from "../services/auth.api";

export const useAuth = () => {
    const {user,setUser,loading,setLoading} = useContext(AuthContext);
   

    const loginUser = async (userName,passWord)=>{
        setLoading(true);
        try {
            const response = await login(userName,passWord);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }  
       
        
}
    const registerUser = async (userName,email,passWord)=>{
        setLoading(true);
        try {
            const response = await register(userName,email,passWord);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }       
}
    return {user,loading,loginUser,registerUser};
}