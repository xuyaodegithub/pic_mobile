import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/apis'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfos:{},
  },
  mutations: {
    GET_USER_INFO(state,data){
      state.userInfos=data
    }
  },
  getters:{
    userInfos:state=>state.userInfos,
  },
  actions: {
    getUserInfos(context,data){
      getUserInfo(data).then(res=>{
        context.commit('GET_USER_INFO',res.data)
      })
  }
  },
  modules: {
  }
})
