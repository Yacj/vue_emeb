import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: "首页",
        },
        component: () => import('../views/Home')
    },
    {
        path: '/category',
        name: 'category',
        meta: {
            title: '商品分类'
        },
        component: () => import('../views/category')
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            title: "购物车",
            needLogin: true
        },
        component: () => import('../views/cart')
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '我的',
            needLogin: true
        },
        component: () => import('../views/user')
    },
    {
        path: '/user/add_manage',
        name: 'add_manage',
        meta: {
            title: '地址列表',
            needLogin: true
        },
        component: () => import('../views/addmanage')
    },
    {
        path: '/user/addAddress',
        name: 'addAddress',
        meta: {
            title: '添加地址',
            needLogin: true
        },
        component: () => import('../views/addAddress')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录/注册'
        },
        component: () => import('../views/login')
    },
    {
      path:'/search',
      name:'search',
      meta:{
          title:'商品搜索'
      },
      component:()=>import('../views/search')
    },
    {
        path: "*",
        name: "not-defined",
        meta: {
            title: "页面找不到",
        },
        component: () => import('../views/404')
    }
]

const router = new VueRouter({
    routes
})

export default router
