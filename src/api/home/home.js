/* 根据不同的模块 封装 不同的api请求 如 home模块 就是 home/home.js*/
import { get} from '../api'
export const homeService = {
    //  首页
    home(param) {
        return get('/home', param)
    },
}