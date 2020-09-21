import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
/**
 * Layout Layout of background page 后台页面的布局
 **/
import { Layout } from '@/layout/index' // 全部后台布局

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/register/index'),
  //   hidden: true
  // },
  {
    path: '/forgetPwd',
    component: () => import('@/views/system/forgetPwd'),
    hidden: true
  },
  {
    path: '/modifyPwd',
    component: () => import('@/views/system/modifyPwd'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'hash', // history
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
