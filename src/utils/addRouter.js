/* eslint-disable */
/**
 * 生成路由
 * @param {Array} routerlist 格式化路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = []
  try {
    routerlist.forEach(item => {
      let e_new = {
        path: item.url,
        name: item.name,
        component: resolve => item.component === 'layout' ? require([`@/layout/layout.vue`], resolve) : require([`@/views/${item.component}.vue`], resolve)
      }
      if (item.children) {
        const children = addRouter(item.children)
        // 保存权限
        e_new = { ...e_new, children: children }
      }
      if (item.redirect) {
        e_new = { ...e_new, redirect: item.redirect }
      }
      if (item.icon !== '' && item.title !== '') {
        e_new = { ...e_new, meta: { title: item.title, icon: item.icon } }
      } else if (item.title !== '' && item.icon === '') {
        e_new = { ...e_new, meta: { title: item.title } }
      }
      router.push(e_new)
    })
  } catch (error) {
    console.error(error)
    return []
  }
  return router
}
