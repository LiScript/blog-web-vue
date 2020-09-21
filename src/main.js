import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import App from './App'
import store from './store'
import router from './router'
import '@babel/polyfill'
import './plugins' // 插件

import './styles/index.scss' // global css

import 'font-awesome/css/font-awesome.css'
import 'view-design/dist/styles/iview.css'
import './icons' // icon组件
import './permission' // permission control 权限的控制

import * as filters from './filters' // global filters 全局的过滤器
import elDragDialog from './directive/el-dragDialog' // base on element-ui
import TipLabel from './components/TipLabel/index'
import { isAuth } from '@/utils/buttonauth'
// register global utility filters. 自定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(elDragDialog)
Vue.use(TipLabel)
Vue.config.productionTip = false
Vue.prototype.isAuth = isAuth // 权限方法
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
