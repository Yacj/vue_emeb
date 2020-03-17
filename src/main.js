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
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import {cookie} from "./assets/js/util";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.needLogin) {
    //页面是否登录
    if (cookie.getCookie("token")) {
      next(); //表示已经登录
    } else {
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
