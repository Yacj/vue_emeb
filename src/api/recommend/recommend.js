import{get} from "../api";

export const recommendService = {
    recommend(params){
        return get('/recommend',params)
    }
}