/**
 * @author zw
 * @description 定义通用的状态数据管理库
 */
import { defineStore } from "pinia";
import { initState } from "./persiste";
let _initState = initState()
const useCommonStore = defineStore(
    'huiwan-common',
    {
        state() {
            return {
                token: _initState.token || '',
                userInfo: _initState.userInfo || {},
                address: _initState.address || '',
                user_id: _initState.user_id || '',
                store_id: _initState.store_id || '',
                goods_id: _initState.goods_id || '',
                remark_id:_initState.remark_id || ''
            }
        }
    }
)
export default useCommonStore