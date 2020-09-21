import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'
// Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size 设置全局的样式库的默认大小
})
