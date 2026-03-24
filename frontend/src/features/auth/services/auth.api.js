import axios from "axios";
const API_URL = axios.create({
    baseURL:'http://localhost:3000/api/auth',
    withCredentials:true,

})
export async function register(username,email,password) {
    try {
        const res = await API_URL.post('/register',{
            username,
            email,
            password,
        }
        )
        return res;
    } 
    
    catch (error) {
        console.log(error);
    }
}
export async function login(username,password) {
    try{const res = await API_URL.post('/login',{
        username,
        password,
    }
    )
    return res;}
    catch(error){
        console.log(error);
    }
}
export async function getMe() {
    try {
        const res = await API_URL.get('/get-me');
        return res;
    } catch (error) {
        console.log(error);
    }
}