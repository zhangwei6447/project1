/**
 * @author zw
 * @time 2024-02-21 
 * @description 定义路由和实现路由拦截
 */


import Welcome from "../pages/login/index.vue";
const Conts=()=>import("../pages/login/Conts.vue");
const Change=()=>import("../pages/login/Change.vue");
const Register=()=>import("../pages/login/Register.vue");
const Login=()=>import("../pages/login/Login.vue");
const LoginTwo=()=>import("../pages/login/LoginTwo.vue");
const Home=()=>import("/src/pages/home/Home.vue");
const List=()=>import("/src/pages/home/List.vue");
const DetailList=()=>import("/src/pages/home/DetailList.vue")
const GoodsDetail=()=>import("../pages/goodsdetail/index.vue")
const Remark=()=>import("../pages/remark/index.vue")
const Cart=()=>import("../pages/cart/index.vue")
/**  */
export default [
    /**
     * nologin 免登录
     * layout 'blank-layout' 没有底部tabs组件
     */
    { path: '/', component: Welcome, meta: { nologin: true, layout: 'blank-layout' }, },
    {path: '/login', component: Login, meta: { nologin: true, layout: 'blank-layout' },},
    {path: '/conts', component: Conts, meta: { nologin: true, layout: 'blank-layout' },},
    {path: '/change', component: Change, meta: { nologin: true, layout: 'blank-layout' },},
    {path: '/register', component: Register, meta: { nologin: true, layout: 'blank-layout' },},
    {path: '/logintwo', component: LoginTwo, meta: { nologin: true, layout: 'blank-layout' },},
    { path: '/home', component: Home },
    { path: '/list', component: List, meta: { layout: 'blank-layout' },},
    { path: '/detaillist', component: DetailList, meta: { layout: 'blank-layout' },},
    { path: '/detail', component: GoodsDetail, meta: { layout: 'blank-layout' },},
    { path: '/remark', component: Remark, meta: { layout: 'blank-layout' },},
    { path: '/cart', component: Cart },
]