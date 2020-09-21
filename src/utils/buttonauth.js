/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return sessionStorage.getItem('permissions').indexOf(key) !== -1 || false
}
