import {get} from "../api";

export const cartService = {
    cartList(params){
        return get('/cart/cartlist',params)
    }
}