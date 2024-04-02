/**
 * @author zw
 * @description 首页接口
 */

import { MAIN_TYPES_URL } from "../config/urls.cfg";
import { request } from "./ajax";

/** 新增回复Api */
export function getTypesGoodsApi() {
    return request({
        url: MAIN_TYPES_URL,
        method: 'GET'
    })
}