import { CART_ADD_URL, CART_USERID_URL, GOODS_DETAIL2_URL } from "../config/urls.cfg";
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