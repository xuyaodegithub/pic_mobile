import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
import '@/style/iconfont/iconfont.css'
import store from '@/store'
new Vue({
    store,
    router,
    render: h => h(index)
}).$mount('#headCutout')
