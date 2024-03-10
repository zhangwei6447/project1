/**
 * @author zw
 * @time 2024-02-21 
 * @description 定义路由和实现路由拦截
 */

// import { NavigationGuardNext, RouteLocation } from "vue-router";
import { useCommonStore } from "../store";

export default function interceptor(to, _, next) {
    if (to.meta.nologin) {
        next()
    } else {
        let token = useCommonStore().token
        if (token) {
            next()
        } else {
            next('/')
        }
    }
}