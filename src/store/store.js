import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token:'',
  userName:'',
  isEdit:false,//是否可编辑false不可 true可编辑
  detailId:'',//编辑页面需要携带的id
  systemNo:'',//系统编号
  menuNo:{},//菜单
}


const mutations = {
  changeMenu(state,v){
    state.menuNo=v
  },
  changeSys(state,v){
    state.systemNo=v
  },
  changeId(state,v){
    state.detailId=v
  },
  changeEdit(state,v){
    state.isEdit=v
  },
  saveToken(state,t){
    state.token=t
    window.sessionStorage.setItem('token',t)
  },
  saveUserName(state,v){
    state.userName=v
  }
}
const getters = {

}
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
