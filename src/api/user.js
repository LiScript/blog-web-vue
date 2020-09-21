import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}

export function register(query) {
  return request({
    url: 'apis/User/RegisterForSaaS',
    method: 'get',
    params: query
  })
}

export function getAuthMenu() {
  return request({
    url: 'apis/Role/GetSysMenu',
    method: 'get',
    params: { strSysLanguage: 'chinese' }
  })
}
export function getAuthCompany() {
  return request({
    url: 'apis/Organization/GetCurrentCompanyName',
    method: 'get'
  })
}
export function getUserList() {
  return request({
    url: 'apis/User/GetUserList',
    method: 'get'
  })
}
/**
 * 获取所有组织列表 get all organizations
 */
export function getAllOrgsTree() {
  return request({
    url: 'apis/Organization/GetAllOrgsTree',
    method: 'get'
  })
}
/**
 * 新增组织 add a new organization
 */
export function addOrg(data) {
  return request({
    url: 'apis/Organization/AddOrganization',
    method: 'post',
    data
  })
}
/**
 * 更新一条组织 update a organization
 */
export function updateOrg(data) {
  return request({
    url: 'apis/Organization/UpdateOrganization',
    method: 'post',
    data
  })
}
/**
 * 删除一条组织 delete a organization
 */
export function delOrg(data) {
  return request({
    url: 'apis/Organization/DeleteOrganization',
    method: 'post',
    data
  })
}
/** 更新一条用户信息 Update a user profile*/
export function updateUser(data) {
  return request({
    url: 'apis/User/ModifyUser',
    method: 'post',
    data
  })
}
/** 新增一条用户信息  New user information*/
export function addUser(data) {
  return request({
    url: 'apis/User/CreateUserForSaaS',
    method: 'post',
    data
  })
}
/** 获取用户列表 Get the list of users*/
export function getUserByPage(query) {
  return request({
    url: 'apis/User/GetPagedUsersInfo',
    method: 'get',
    params: query
  })
}
/** 删除一条用户信息 Delete a user message*/
export function delUser(data) {
  return request({
    url: 'apis/User/DeleteUser',
    method: 'post',
    data
  })
}
/** 修改一条用户的组织权限 Changes a user's organization permissions
 * strOrgIds:
 * userId:
*/
export function updateOrgRights(data) {
  return request({
    url: 'apis/User/ModifyUserOrgRights?strOrgIds=' + data.strOrgIds + '&userId=' + data.userId,
    method: 'post'
  })
}
/** 获取用户已授权的设备（已授权的组织下的）
Obtain the user's authorized equipment (under the authorized organization)
 * strUserId
 */
export function getDeviceAuthByUser(query) {
  return request({
    url: 'apis/Device/GetAuthDeviceByUserId',
    method: 'get',
    params: query
  })
}
/** 更新存储用户的设备授权 Updates device authorization for storage users
 * userId
 */
export function updateDeviceAuth(data, userId) {
  return request({
    url: 'apis/Device/SaveUserDevice?userId=' + userId,
    method: 'post',
    data
  })
}
/** 上传excel; upload excel file
 * userId
 */
export function uploadFile(params) {
  return request({
    url: 'apis/User/BatchImport',
    method: 'post',
    data: params,
    type: 'upload'
  })
}
/** strType：按用户权限内组织 Organized by user permissions
 * 0-当前企业下所有组织； All organizations under the current enterprise;
 * 1-权限内组织，包括全部子集； Organization within permissions, including all subsets
 * 2-仅权限内的本组织生成树，包括权限内子集 Organization spanning trees within permissions only, including subsets within permissions
 *
 * strUserId： 按用户权限
*/
export function getUserOrgs(params) {
  return request({
    url: 'apis/Organization/GetUserOrgs?strType=' + params.strType,
    method: 'get'
    // params: param
  })
}

/**
 * 通过原始密码更新密码
 * Update the password with the original password
 * type：'1'
 * UserId
 * NewPassword
 * OldPassword
*/
export function submitNewPwd(data) {
  return request({
    url: 'apis/User/PwdModify',
    method: 'post',
    data
  })
}
/**
 * 修改密码：获取验证码 Change password: get verification code
 * strUserId
 * strSMSTemplateCode:'SMSCodePwdModify'
*/
export function getSMSCode(data) {
  return request({
    url: 'apis/SMS/VerifyPhoneNo?strUserId=' + data.strUserId + '&strSMSTemplateCode=' + data.strSMSTemplateCode,
    method: 'post'
    // data
  })
}
/** 通过手机验证码登录 login by checkcode */
export function loginByCheckcode(data) {
  return request({
    url: 'apis/User/LoginBySmsForSaaS',
    method: 'post',
    data
  })
}
/**
 * 忘记密码 新密码提交
 Forgot password: new password submitted
 * @param {
   Type:'1',
   UserId:,
   NewPassword
 } data
 */
export function resetPassword(data) {
  return request({
    url: 'apis/User/PasswordReset',
    method: 'post',
    data
  })
}

export function getUsersForFlow() {
  return request({
    url: '/apis/User/GetUsersForFlow',
    method: 'get'
  })
}
