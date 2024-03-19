/**
 * @author zw
 * @description ajax的封装
 */

import axios from "axios";
import { useCommonStore } from "../store";

/** 因为图片的服务器和请求服务器一个地址，那么可以把这个地址做成一个全局变量 */
window.baseURL = import.meta.env.MODE === 'development' ? '/apis' : 'http://localhost:8888';

const Ajax = axios.create({
    // baseURL: '/apis'
    baseURL: window.baseURL
})
/** 请求拦截 */
// use(onFulfilled?: ((value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise))
Ajax.interceptors.request.use(function (config) {
    /** 如果返回一个Promise，那么请求不会发送到后端 */
    // return Promise.reject({})
    /** 如果返回配置对象，那么会发送请求 -- 所以可以在这里添加数据 */
    config.headers.token = useCommonStore().token,
    config.headers.user_id = useCommonStore().user_id,
    config.headers.store_id = useCommonStore().store_id,
    config.headers.goods_id = useCommonStore().goods_id,
    config.headers.remark_id = useCommonStore().remark_id
    return config
})

/**
 * 封装一个完整的请求方法
 * @param {req} req
 * */
export function request(req) {
    return new Promise(resolve => {
        Ajax.request({
            method: req.method || 'get',
            url: req.url,
            params: req.params || {},
            data: req.data || {},
            headers:req.headers
        }).then(function ({ data }) {
            resolve(data)
        }).catch(function (e) {
            resolve(e)
        })
    })
}

