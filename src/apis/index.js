/**
 * Created by Yan on 2019-06-01
 **/
import https from './request'
/**
 * 上传图片
 **/
export const uploadImgApi=(data)=>  https.upPost('/webMatting/matting2',data);
/**
 * 链接抠图
 **/
export const copyUpload=(data)=> https.paramspost('/webMatting/mattingByUrl2',data)
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
export const sendCode=(data)=> https.get('/user/sendSms',data)
/**
 * 用户登录
 **/
export const userLogin=(data)=>https.get('/user/login',data)
/**
 * 获取apikey
 **/
export const userApikey=(data)=>https.get('/user/apikey',data)
/**
 * 重新刷新apikey
 **/
export const userRefreshApikey=(data)=>https.get('/user/refreshApikey',data)
/**
 * 获取用户信息
 **/
export const getUserInfo=(data)=>https.get('/user/userInfo',data)
/**
 * 获取订阅列表
 **/
// export const subscriptionPlans=(data)=>https.get('/order/subscriptionPlans',data)
export const subscriptionPlans=(data)=>https.get('/pay/findProductAll',data)
/**
 *我的订阅
 **/
export const userSubscribe=(data)=>https.get('/order/mySubscription',data)
/**
 * 修改密码
 **/
export const userResetPassword=(data)=>https.get('/user/changePassword',data)
/**
 * 通过token修改密码
 **/
export const userResetbyEmail=(data)=>https.get('/user/changePasswordByToken',data)
/**
 * 通过短信获取token修改密码
 **/
export const getResetPasswordToken=(data)=>https.get('/user/getResetPasswordToken',data)
/**
 *获取验证图
 **/
export const userGetCaptcha=(data)=>https.get('/getCaptcha',data)
/**
 *获取验证结果
 **/
export const userGetvalidate=(data)=>https.get('/validate',data)
/**
 * 手机号注册
 **/
export const userRegister=(data)=>https.get('/user/registerByMobile',data)
/**
 *获取邀请码
 **/
export const userGetInvitation=(data)=>{
    return https.get('/user/getInvitation',data)
}
/**
 *下单接口
 **/
export const userCreatePayment=(data)=> https.get('/pay/unifiedOrder',data)
/**
 * 上传背景保存
 **/
export const uploadossBg=(data)=> https.upPost('/oss/upload',data)
/**
 *图片修复
 **/
export const redirMatting=(data)=> https.upPost('/webMatting/predict',data)
