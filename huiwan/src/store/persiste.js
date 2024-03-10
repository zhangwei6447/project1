/**
 * @author zw
 * @time 2024-02-21 
 * @description state数据初始化和持久化
 */

// import { PiniaPluginContext, StateTree } from "pinia";
import { PINIA_CACHE_KEY } from "../config/common.cfg";
import { decodeApi, encodeApi } from "../utils/cryption";

/**
 * 初始化state
 * @returns any
*/

export function initState() {
    let cache = sessionStorage.getItem(PINIA_CACHE_KEY)
    if (!cache) {
        return {}
    } else {
        try {
            return JSON.parse(decodeApi(cache))
        }
        catch {
            return {}
        }
    }
}
/**
 * 持久化方法
 * @param {params: PiniaPluginContext} param0 
 */

export default function persisteStatePlugin({ store }) {
    store.$subscribe(function (_, _state) {
        sessionStorage.setItem(PINIA_CACHE_KEY, encodeApi(JSON.stringify(_state)))
    })
}
