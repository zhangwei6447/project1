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
            }
        }
    }
)
export default useCommonStore