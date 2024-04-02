import { CART_ADD_URL, CART_USERID_URL, GOODS_DETAIL2_URL, CART_UPDATE_URL, CART_DELETE_URL } from "../config/urls.cfg";
import { request } from "./ajax";
/** 加入购物车Api */
export function cartAddApi(data) {
    return request({
        url: CART_ADD_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 获取购物车Api */
export function getCartApi(user_id) {
    return request({
        url: CART_USERID_URL,
        method: 'GET',
        params: { user_id }
    })
}

/** 获取商品详情Api */
export function getGoodsDetail2Api(_id) {
    return request({
        url: GOODS_DETAIL2_URL,
        method: 'GET',
        params: { _id }
    })
}

/** 修改购物车Api */
export function updateCartApi(data) {
    return request({
        url: CART_UPDATE_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 删除购物车Api */
export function deleteCartApi(_id) {
    return request({
        url: CART_DELETE_URL,
        method: 'POST',
        data: { _id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}