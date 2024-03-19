/**
 * @author zw
 * @description 首页接口
 */

import { HOME_RECOMMEND_URL, HOME_TYPES_URL, LIST_TYPE_URL, RECOMMEND_TYPE_URL, RECOMMEND_DETAILTYPE_URL, GOODS_DETAIL_URL, QUERY_STORE_URL, UPLOAD_REMARKIMG_URL, REMARK_ADD_URL, QUERY_REMARK_URL, GOODS_WANT_URL, GOODS_CANCEL_WANT_URL } from "../config/urls.cfg";
import { request } from "./ajax";


/** 首页分类数据Api */
export function homeTypesApi() {
    return request({
        url: HOME_TYPES_URL,
        method: "GET"
    })
}

/** 首页推荐列表数据Api */
export function homeRecommendApi(page, size) {
    return request({
        url: HOME_RECOMMEND_URL,
        method: 'GET',
        params: { page, size }
    })
}

/** ListType数据Api */
export function listTypeApi() {
    return request({
        url: LIST_TYPE_URL,
        method: 'GET'
    })
}

/** 类型商品推荐Api */
export function recommendTypeApi(page, size, type) {
    return request({
        url: RECOMMEND_TYPE_URL,
        method: 'GET',
        params: { page, size, type }
    })
}

/** 详细类型商品推荐Api */
export function recommendDetailTypeApi(page, size, type, detailType) {
    return request({
        url: RECOMMEND_DETAILTYPE_URL,
        method: 'GET',
        params: { page, size, type, detailType }
    })
}

/** 获取商品详情Api */
export function getGoodsDetailApi(goods_id) {
    return request({
        url: GOODS_DETAIL_URL,
        method: 'GET',
        params: { goods_id }
    })
}

/** 查询商家Api */
export function queryStoreApi(store_id) {
    return request({
        url: QUERY_STORE_URL,
        method: 'GET',
        params: { store_id }
    })
}

/** 上传评论接口图片Api */
export function uploadRemarkImgApi(img_base64, img_name) {
    return request({
        url: UPLOAD_REMARKIMG_URL,
        method: 'POST',
        data: { img_base64, img_name },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 新增评论Api */
export function addRemarkApi(data) {
    return request({
        url: REMARK_ADD_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询评论Api */
export function queryRemarkApi() {
    return request({
        url: QUERY_REMARK_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 收藏商品Api */
export function collectGoodsApi() {
    return request({
        url: GOODS_WANT_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 取消收藏商品APi */
export function cancelCollectGoodsApi() {
    return request({
        url: GOODS_CANCEL_WANT_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}