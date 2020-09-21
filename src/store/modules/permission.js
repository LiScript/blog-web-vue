/**
 *
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 控制权限的全局变量
 *
 */
import { constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, accessedRoutes) {
    commit('SET_ROUTES', accessedRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
