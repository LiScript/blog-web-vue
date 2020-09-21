/**
 *
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 控制用户信息的全局变量
 *
 */
// import { Message } from 'element-ui'
import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { constantRoutes } from '@/router/index'

const state = {
  token: getToken(), // 令牌
  init: false, // 是否完成初始化 // 默认未完成
  RouterList: [], // 动态路由
  permission: [],
  userId: sessionStorage.getItem('userId') || '' // 用户ID
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    if (id) {
      sessionStorage.setItem('userId', id)
    } else {
      sessionStorage.removeItem('userId')
    }
    state.userId = id
  },
  set_init: (state, status) => {
    state.init = status
  },
  set_router: (state, RouterList) => {
    state.RouterList = RouterList
  },
  set_permission: (state, permission) => {
    state.permission = permission
  }
}

const actions = {
  // 用户登录 user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        if (res.errno === 0) {
          commit('SET_TOKEN', res.data.username)
          commit('SET_USERID', res.data.username)
          setToken(res.data.username)
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  // 用户退出登录 user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_USERID', null)
      commit('set_init', false)
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // 删除令牌 remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERID', null)
      removeToken()
      resolve()
    })
  },

  // 动态设置路由 此为设置设置途径
  setRouterList({ commit }, routerList) {
    commit('set_router', constantRoutes.concat(routerList)) // 进行路由拼接并存储
  },
  setPermission({ commit }, permissionlist) {
    commit('set_permission', permissionlist)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
