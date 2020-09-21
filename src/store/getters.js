const getters = {
  sidebar: state => state.app.sidebar, // 侧边栏
  device: state => state.app.device, // 电脑还是手机
  visitedViews: state => state.tagsView.visitedViews, // 切换
  cachedViews: state => state.tagsView.cachedViews, // 切换
  token: state => state.user.token, // 令牌
  avatar: state => state.user.avatar, // 头像
  name: state => state.user.name, // 昵称
  introduction: state => state.user.introduction, // 介绍
  roles: state => state.user.roles, // 用户的权限等级
  userId: state => state.user.userId, // 用户ID
  permission_routes: state => state.permission.routes, // 生成路由
  addRoutes: state => state.permission.addRoutes, // 增加路由
  showSettings: state => state.settings.showSettings, // 是否显示setting icon
  CodeOptions: state => state.basicdata.CodeOptions // 检验类型
}
export default getters
