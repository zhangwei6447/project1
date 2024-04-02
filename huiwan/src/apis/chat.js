import { CHAT_ADD_URL, CHAT_CLEAR_URL, CHAT_QUERY_ALL_URL, CHAT_QUERY_URL } from "../config/urls.cfg";
import { request } from "./ajax";
/** 新增聊天Api */
export function chatAddApi(data) {
    return request({
        url: CHAT_ADD_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 查询和所有商家的聊天Api */
export function chatQueryAllApi(user_id) {
    return request({
        url: CHAT_QUERY_ALL_URL,
        method: 'GET',
        params: { user_id }
    })
}
/** 查询和单个商家的聊天Api */
export function chatQueryApi(user_id, store_id) {
    return request({
        url: CHAT_QUERY_URL,
        method: 'GET',
        params: { user_id, store_id }
    })
}
/** 清空聊天记录Api */
export function chatClearApi(user_id, store_id) {
    return request({
        url: CHAT_CLEAR_URL,
        method: 'POST',
        data: { user_id, store_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}