import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

// 创建 store 实例
const store = new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})

export default store