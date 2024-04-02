/**
 * @author zw
 * @description 首页接口
 */

import { SEARCH_ADD_HISTORY_URL, SEARCH_DELETEALL_HISTORY_URL, SEARCH_DELETE_HISTORY_URL, SEARCH_GOODS_STORE_URL, SEARCH_GOODS_URL, SEARCH_QUERY_HISTORY_URL, SEARCH_STORE_KEY_URL } from "../config/urls.cfg";
import { request } from "./ajax";

/** 新增搜索历史Api */
export function addSearchHistoryApi(txt, date) {
    return request({
        url: SEARCH_ADD_HISTORY_URL,
        method: 'POST',
        data: { txt, date },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询搜索历史Api */
export function getSearchHistoryApi() {
    return request({
        url: SEARCH_QUERY_HISTORY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 删除单个搜索历史Api */
export function deleteSearchHistoryApi(_id) {
    return request({
        url: SEARCH_DELETE_HISTORY_URL,
        method: 'POST',
        data: { _id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 删除所有搜索历史Api */
export function deleteAllSearchHistoryApi() {
    return request({
        url: SEARCH_DELETEALL_HISTORY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 商品搜索Api */
export function searchGoodsApi(txt, page, size) {
    return request({
        url: SEARCH_GOODS_URL,
        method: 'POST',
        data: { txt, page, size },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 关键字搜索商家Api */
export function searchStoreApi(value) {
    return request({
        url: SEARCH_STORE_KEY_URL,
        method: 'POST',
        data: { value },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 根据商家搜索商品Api */
export function searchGoodsStoreApi(store_id) {
    return request({
        url: SEARCH_GOODS_STORE_URL,
        method: 'POST',
        data: { store_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}