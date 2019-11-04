/**
 * Created by Yan on 2019-06-01
 **/
import https from './request'
/**
 * 上传图片
 **/
export const uploadImgApi=(data)=>  https.upPost('/webMatting/matting2',data);
/**
 * 获取活动人数
 **/
export const activePeople=(data)=>https.get('/imageCompose/serverInfo',data);
/**
 * 获取排队中图片信息
 **/
export const getMattingInfo=(data)=> https.get('/webMatting/getMattingInfo',data);
/**
 * 页面授权初始化
 **/
export const wxConfig=(data)=>https.get('/weixinMp/getWxJsConfig',data);
/**
 * 获取原图
 **/
export const downloadMattedImage=(data)=> https.get('/webMatting/getMattedImage',data);
/**
 * 手机号快速登录
 **/
export const loginByMobile=(data)=> https.get('/user/quickLoginByMobile',data);
/**
 * 发送验证码
 **/
export const sendCode=(data)=>{
  return https.get('/user/sendSms',data)
}
/**
 * 用户登录
 **/
export const userLogin=(data)=>{
  return https.get('/user/login',data)
}
/**
 * 获取apikey
 **/
export const userApikey=(data)=>{
  return https.get('/user/apikey',data)
}
/**
 * 重新刷新apikey
 **/
export const userRefreshApikey=(data)=>{
  return https.get('/user/refreshApikey',data)
}
/**
 * 获取用户信息
 **/
export const getUserInfo=(data)=>{
  return https.get('/user/userInfo',data)
}
/**
 * 获取订阅列表
 **/
export const subscriptionPlans=(data)=>{
  return https.get('/order/subscriptionPlans',data)
}
/**
 *我的订阅
 **/
export const userSubscribe=(data)=>{
  return https.get('/order/mySubscription',data)
}
/**
 * 修改密码
 **/
export const userResetPassword=(data)=>{
  return https.get('/user/changePassword',data)
}
/**
 * 通过token修改密码
 **/
export const userResetbyEmail=(data)=>{
  return https.get('/user/changePasswordByToken',data)
}
