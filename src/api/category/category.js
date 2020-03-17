import {get, post} from "../api";

export const categoryService = {
    category(params) {
        return get('/category', params)
    },
    categoryList(params){
        return get('/category/categoryList',params)
    }
}