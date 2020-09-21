import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 60000 // request timeout
})

service.interceptors.request.use(config => {
  const token = 'Bearer ' + getToken()
  config.headers['Authorization'] = token // 请求头带上token
  if (config.type) {
    // 上传图片时，设置的content-type //upload file
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  // console.log(response)
  if (response.data.Success === false) {
    Message.error(response.data.Message)
  } else {
    return response.data
  }
}, error => {
  return Promise.reject(error)
})

export default service
