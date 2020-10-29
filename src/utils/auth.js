const imgId='img_info'
const imgId2='img_info2'
const TokenKey = 'token'
import Cookies from 'js-cookie'
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
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);//设置小于一天的时间
  Cookies.set(TokenKey, token);
  // let str=JSON.stringify(token),{ domain: '.picup.shop' }
  // return localStorage.setItem(TokenKey, token)//存储是按照字符串存着，取出来后需要JSON.parse
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const setCookie = (name, cvalue, clearDay = 3650) => {
  const d = new Date();
  d.setTime(d.getTime() + Number(clearDay) * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toGMTString();
  const value = encodeURI(cvalue);
  console.log(name + '=' + value + ';' + expires+`;path=/;domain=www.picup.shop`)
  document.cookie = name + '=' + value + ';' + expires+`;path=/;domain=www.picup.shop`;
};

export const getCookie = name => {
  const cname = name + '=';
  var carr = document.cookie.split(';');
  for (let i = 0; i < carr.length; i++) {
    let cvalue = carr[i];
    while (cvalue.charAt(0) === ' ') cvalue = cvalue.substring(1);
    if (cvalue.indexOf(cname) !== -1) {
      return decodeURI(cvalue.substring(cname.length, cvalue.length));
    }
  }
};

export const clearCookie = name => {
  setCookie(name, '', -1);
};
