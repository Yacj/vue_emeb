import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* vant */
import vant from './vant/vant.js'

/* fast-click */
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

/* css */
import './assets/css/common.scss'

/*icon*/
import './assets/icons/iconfont.css'
import './assets/icons/iconfont'
/*swipe*/
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import {cookie} from "./assets/js/util";
Vue.use(VueAwesomeSwiper, /* { default global options } */)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.needLogin) {
    //页面是否登录
    if (cookie.getCookie("token")) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        path: '/login',
      })
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
