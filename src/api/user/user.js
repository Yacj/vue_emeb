import {get} from "../api";

export const userService = {
    userInfo(params){
        return get('/user/userInfo',params)
    },
    userMenu(params){
        return get('/user/userMenu',params)
    }
}