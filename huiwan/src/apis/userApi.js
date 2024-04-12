/**
 * @author zw
 * @description 关于用户接口
 */

import { ACCOUNT_LOGIN_URL, AUTO_LOGIN_URL, PHONE_LOGIN_URL, QUERY_USER_URL, SUGGEST_INFO_URL, UPDATE_PASSWORD_URL, USER_CODE_URL, USER_REGISTER_URL, QUERY2_USER_URL, USER_UPDATE_URL, QUERY_USERNAME_URL, USER_HEAD_URL } from "../config/urls.cfg";
import { request } from './ajax'

/** 用户免登录Api */
export function autoLoginApi() {
    return request({
        url: AUTO_LOGIN_URL,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 获取用户验证码Api */
export function userCodeApi(phone) {
    return request({
        url: USER_CODE_URL,
        data: { phone: phone + '' },
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 手机号登录Api */
export function phoneLoginApi(phone, code) {
    return request({
        url: PHONE_LOGIN_URL,
        data: { phone, code },
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 账号密码登录Api */
export function accountLoginApi(username, password) {
    return request({
        url: ACCOUNT_LOGIN_URL,
        data: { username, password },
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 获取协议Api */
export function suggestInfoApi() {
    return request({
        url: SUGGEST_INFO_URL,
        method: 'GET'
    })
}
/** 用户注册Api */
export function userRegisterApi(data) {
    return request({
        url: USER_REGISTER_URL,
        data,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 修改密码Api */
export function updatePasswordApi(password, newpassword) {
    return request({
        url: UPDATE_PASSWORD_URL,
        data: { password, newpassword },
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 查询用户信息--请求头Api */
export function queryUserInfoApi() {
    return request({
        url: QUERY_USER_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 查询用户信息--请求体Api */
export function queryUserInfoApi2(user_id) {
    return request({
        url: QUERY2_USER_URL,
        method: 'POST',
        data: { user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 修改用户信息Api */
export function updateUSerInfoApi(data) {
    return request({
        url: USER_UPDATE_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询用户名是否存在Api */
export function queryUsernameApi(_id, username) {
    return request({
        url: QUERY_USERNAME_URL,
        method: 'POST',
        data: { _id, username },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 上传用户头像Api */
export function uploadUserHeadApi(img_base64, img_name) {
    return request({
        url: USER_HEAD_URL,
        method: 'POST',
        data: { img_base64, img_name },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}