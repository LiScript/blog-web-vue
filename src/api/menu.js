import request from '@/utils/request'
// 获取所有菜单
export function getAllMenu() {
  return request({
    url: 'api/menu/getAllMenu',
    method: 'get'
  })
}

// 增加菜单
export function addMenu(data) {
  return request({
    url: 'api/menu/addMenu',
    method: 'post',
    data
  })
}

// 删除菜单
export function deleteMenu(query) {
  return request({
    url: `api/menu/delMenu?menuId=${query}`,
    method: 'post'
  })
}

// 更新菜单
export function updateMenu(data1, data2) {
  return request({
    url: `api/menu//updateMenu?id=${data1}`,
    method: 'post',
    data: data2
  })
}
