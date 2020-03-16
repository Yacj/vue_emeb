import{post} from "../api";
export const loginService = {
    login(params){
        return post('/login',params)
    }
}