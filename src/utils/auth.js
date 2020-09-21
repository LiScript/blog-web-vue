import Cookies from 'js-cookie'

const TokenKey = 'HMQPoliFive'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(val) {
  return Cookies.set(TokenKey, val)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
