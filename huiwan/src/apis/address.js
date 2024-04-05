import { ADDRESS_ADD_URL, ADDRESS_DELETE_URL, ADDRESS_QUERY_ALL_URL, ADDRESS_QUERY_URL, ADDRESS_UPDATE_URL } from "../config/urls.cfg";
import { request } from "./ajax";

/** 新增地址Api */
export function addressAddApi(data) {
    return request({
        url: ADDRESS_ADD_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询个人所有地址Api */
export function addressQueryAllApi(user_id) {
    return request({
        url: ADDRESS_QUERY_ALL_URL,
        method: 'POST',
        data: { user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询单个地址Api */
export function addressQueryApi(_id) {
    return request({
        url: ADDRESS_QUERY_URL,
        method: 'POST',
        data: { _id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 修改地址Api */
export function addressUpdateApi(data) {
    return request({
        url: ADDRESS_UPDATE_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 删除地址Api */
export function addressDeleteApi(_id, user_id, is_default) {
    return request({
        url: ADDRESS_DELETE_URL,
        method: 'POST',
        data: { _id, user_id,is_default },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}