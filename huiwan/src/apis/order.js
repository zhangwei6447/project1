/**
 * @author zw
 * @description 首页接口
 */

import { ORDER_ADD_URL, ORDER_PAY_URL, ORDER_QUERY_URL, ORDER_RECEIVING_GOODS_URL, ORDER_UPDATE_URL, ORDER_CANCEL_URL } from "../config/urls.cfg";
import { request } from "./ajax";

/** 创建订单Api */
export function createOrderApi(data) {
    return request({
        url: ORDER_ADD_URL,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 订单支付Api */
export function payOrderApi(order_id) {
    return request({
        url: ORDER_PAY_URL,
        method: 'POST',
        data: { order_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 订单确认收货Api */
export function orderReceivingGoodsApi(order_id) {
    return request({
        url: ORDER_RECEIVING_GOODS_URL,
        method: 'POST',
        data: { order_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 查询订单Api */
export function queryOrderApi(user_id) {
    return request({
        url: ORDER_QUERY_URL,
        method: 'POST',
        data: { user_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 订单修改Api */
export function orderUpdateApi(receiving_address, order_id) {
    return request({
        url: ORDER_UPDATE_URL,
        method: 'POST',
        data: { receiving_address, order_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/** 取消订单Api */
export function cancelOrderApi(order_id) {
    return request({
        url: ORDER_CANCEL_URL,
        method: 'POST',
        data: { order_id },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}