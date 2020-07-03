import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
import store from '@/store'
// const  context=require.context('@/components/h_header',false,/\.vue/)
// context.keys().map(item=>{
//     let com= context(item).default;
//     console.log(com.name);
//     Vue.component(com.name,com);
// })
new Vue({
    store,
    router,
    render: h => h(index)
}).$mount('#app')
