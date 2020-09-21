/*
 * @Author: PoliFive
 * @Date: 2020-07-11 19:09:57
 * @LastEditTime: 2020-07-11 19:09:57
 * @LastEditors: PoliFive
 * @Description: 权限的相关配置
 * @FilePath: /WXDEV-WEB/src/permission.js
 */
import router from './router'
import store from './store'
import user from './store/modules/user'
import { getToken, removeToken } from './utils/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getRoutes } from './api/role'
import { addRouter } from './utils/addRouter'
import XEUtils from 'xe-utils'
// import MenuList from './assets/base.json'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log(getToken())
  if (getToken()) {
    if (to.path !== '/login') {
      if (user.state.init) {
        next()
      } else {
        gotoRouter(to, next)
      }
    } else {
      Message({ message: '您已经登录', type: 'info' })
      next('/')
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path !== '/login') {
        next('/login')
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
})

function gotoRouter(to, next) {
  getRoutes().then(res => {
    let list = res.data
    console.log('解析后端动态路由', list)
    list = XEUtils.sortBy(list, 'Sort')
    const asyncRouter = addRouter(list) // 进行递归解析
    return asyncRouter
  })
    .then(asyncRouter => {
      // 后置添加404页面,防止刷新404
      asyncRouter.push({
        path: '*',
        redirect: '/404',
        hidden: true
      })
      router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
      store.dispatch('user/setRouterList', asyncRouter) // 存储到vuex
      store.dispatch('permission/generateRoutes', asyncRouter)
      store.commit('user/set_init', true)
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
    .catch(e => {
      console.log(e)
      removeToken()
    })
}
