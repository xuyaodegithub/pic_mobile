import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        component:()=> import(/* webpackChunkName: "indexs" */ '@/views/index/h_index/index.vue'),
    }, {
        path: '/more',
        name: '更多产品',
        component:()=> import(/* webpackChunkName: "more" */ '@/views/index/more_product/index.vue'),
    }, {
        path: '/API',
        name: 'API',
        component:()=> import(/* webpackChunkName: "API" */ '@/views/index/API/index.vue'),
    }, {
        path: '/price',
        name: '定价',
        component:()=> import(/* webpackChunkName: "price" */ '@/views/index/price/index.vue'),
    }, {
        path: '/us',
        name: '关于我们',
        component:()=> import(/* webpackChunkName: "us" */ '@/views/index/about_us/index.vue'),
    }, {
        path: '/concat',
        name: '联系我们',
        component:()=> import(/* webpackChunkName: "concat" */ '@/views/index/concat_us/index.vue'),
    },{
        path: '/count',
        name: '我的账户',
        component:()=> import(/* webpackChunkName: "count" */ '@/views/index/user_count/index.vue'),
    },{
        path: '/change',
        name: '修改密码',
        component:()=> import(/* webpackChunkName: "change" */ '@/views/index/user_change/index.vue'),
    },{
        path: '/find',
        name: '找回密码',
        component:()=> import(/* webpackChunkName: "find" */ '@/views/index/user_findBack/index.vue'),
    },{
        path: '/login',
        name: '登录',
        component:()=> import(/* webpackChunkName: "login" */ '@/views/index/user_login/index.vue'),
    },{
        path: '/register',
        name: '注册',
        component:()=> import(/* webpackChunkName: "register" */ '@/views/index/user_register/index.vue'),
    },
]
const router=new VueRouter({
    routes: routes
})
router.beforeEach((to,from,next)=>{
    document.title=to.name;
    next()
})
export default router
