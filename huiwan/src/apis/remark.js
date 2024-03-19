/**
 * @author zw
 * @description 首页接口
 */

import { REPLY_LIKE_URL, REMARK_LIKE_URL, REPLY_REMARK_URl, REMARK_CANCEL_LIKE_URL, REPLY_CANCEL_LIKE_URL, REMARK_REPORT_URL, REPLY_REPORT_URL } from "../config/urls.cfg";
import { request } from "./ajax";

/** 新增回复Api */
export function addReplyApi(data) {
    return request({
        url: REPLY_REMARK_URl,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 点赞--评论Api */
export function remarkLikeApi(remark_id, user_id) {
    return request({
        url: REMARK_LIKE_URL,
        method: 'POST',
        data: { remark_id, user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
/** 点赞--回复Api */
export function replyLikeApi(remark_id, reply_id, user_id) {
    return request({
        url: REPLY_LIKE_URL,
        method: 'POST',
        data: { remark_id, reply_id, user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}


/** 取消点赞--评论Api */
export function cancelRemarkLikeApi(remark_id, user_id) {
    return request({
        url: REMARK_CANCEL_LIKE_URL,
        method: 'POST',
        data: { remark_id, user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 取消点赞--回复Api */
export function cancelReplyLikeApi(remark_id, reply_id, user_id) {
    return request({
        url: REPLY_CANCEL_LIKE_URL,
        method: 'POST',
        data: { remark_id, reply_id, user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 举报--评论Api */
export function remarkReportApi(remark_id) {
    return request({
        url: REMARK_REPORT_URL,
        method: 'POST',
        data: { remark_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 举报--回复Api */
export function replyReplyApi(remark_id, reply_id) {
    return request({
        url: REPLY_REPORT_URL,
        method: 'POST',
        data: { remark_id, reply_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}