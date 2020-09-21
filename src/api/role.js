import request from '@/utils/request'
// 获取用户权限的路由
export function getRoutes() {
  return request({
    url: 'api/user/systemmenu',
    method: 'get'
  })
}
export function getRoles(query) {
  return request({
    url: 'apis/Role/GetRolesByPage',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return request({
    url: 'apis/Role/AddRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: 'apis/Role/UpdateRole',
    method: 'post',
    data
  })
}
export function delRole(data) {
  return request({
    url: 'apis/Role/DeleteRole',
    method: 'post',
    data
  })
}
export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
export function getAllRoles() {
  return request({
    url: 'apis/role/GetAllRoleCombobox',
    method: 'get'
  })
}
