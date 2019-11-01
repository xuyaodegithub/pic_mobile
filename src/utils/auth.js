const imgId='img_info'
const imgId2='img_info2'
const TokenKey = 'Admin-Token'

export const getFiled=(k)=>{
  const str=k ? imgId2 : imgId
  return window.localStorage.getItem(str)
}
export const setFiled=(data,k)=>{
  const str=k? imgId2 : imgId
  return window.localStorage.setItem(str,data)
}
export const reFiled=(k)=>{
  const str=k ? imgId2 : imgId
  return window.localStorage.removeItem(str)
}
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);//设置小于一天的时间
  // Cookies.set('foo', 'bar', {
  //   expires: inFifteenMinutes//不设置默认会话式储存，游览器关闭就删除
  // });
  let str=JSON.stringify(token)
  return sessionStorage.setItem(TokenKey, str)//存储是按照字符串存着，取出来后需要JSON.parse
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

