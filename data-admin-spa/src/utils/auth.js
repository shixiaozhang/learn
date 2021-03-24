import Cookies from 'js-cookie'

const TokenKey = 'Admin-Access-Token'
const RefreshTokenKey = 'Admin-Refresh-Access-Token'
const Username = 'Username'
const Role='Role'
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken () {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken (token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeRefreshToken () {
  return Cookies.remove(RefreshTokenKey)
}

export function getUsername () {
  return Cookies.get(Username)
}

export function setUsername (name) {
  return Cookies.set(Username, name)
}

export function removeUsername () {
  return Cookies.remove(Username)
}

export function getRole(){
  return Cookies.get(Role)
}

export function setRole(roleName){
   Cookies.set(Role, roleName)
}

export function removeRole () {
  return Cookies.remove(Role)
}
