import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import user from './modules/user'
import common from './modules/common'
import basicdata from './modules/basicdata'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView, // 导航切换控制
    settings, //
    user,
    common,
    basicdata // 基础数据
  },
  getters
})

export default store
