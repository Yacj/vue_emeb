import {get} from "../api";

export const addressService = {
    addressList(params){
        return get('/address/list',params)
    }
}