import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const req1 = require.context('./sensor_svg', false, /\.svg$/)
const buttonsvg = require.context('./buttonsvg', false, /\.svg$/)
const menuIconList = require.context('./newsvg', true, /\.svg$/)
const iconList = menuIconList.keys().map(item => menuIconList(item))
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(req1)
requireAll(buttonsvg)
export default {
  // 获取图标icon-(*).svg名称列表, 例如[shouye, xitong, zhedie, ...]
  getNameList() {
    return iconList.map(item => item.default.id.replace('icon-', ''))
  }
}
