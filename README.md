# Poli
## 备份主要路由
## 锡柴前端
``` bash
    {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'list' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'role',
        meta: { title: '角色管理', icon: 'list' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        name: 'menu',
        meta: { title: '菜单管理', icon: 'list' }
      }
    ]
  }
```