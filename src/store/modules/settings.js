/**
 *
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 控制布局的全局变量
 *
 */

const state = {
  showSettings: false, // 显示配置菜单
  tagsView: true, // 切换
  fixedHeader: true, // 固定头部
  sidebarLogo: false // 侧边栏logo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

