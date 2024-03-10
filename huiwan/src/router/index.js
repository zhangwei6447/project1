/**
 * @author zw
 * @time 2024-02-21 
 * @description 定义路由和实现路由拦截
 */

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import interceptor from "./interceptor";

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach(interceptor)

export default router