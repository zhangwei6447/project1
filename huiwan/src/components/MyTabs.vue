<!-- 底部组件 -->
<template>
    <div class="my-tabs">
        <div :class="['item', it.act && 'act', it.icon]" v-for="it in tabs" :key="it.txt" @click="toPage(it)">{{ it.txt }}
        </div>
    </div>
</template>
<!-- ********************************************** -->
<script setup>
import {  ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const route = useRoute()
const router = useRouter()
const tabs = ref([])
/** 暂时都为home */
setTimeout(() => {
    tabs.value = [
        { icon: 'home', act: true, txt: '首页', path: '/home' },
        { icon: 'types', act: false, txt: '分类', path: '/types' },
        { icon: 'cart', act: false, txt: '购物车', path: '/cart' },
        { icon: 'me', act: false, txt: '我的', path: '/mine' },
    ].map((it) => {
        it.act = it.path === route.path
        return it
    })
}, 30)
/** 点击跳转 */
function toPage(param) {
    router.push(param.path)
    tabs.value = tabs.value.map((item) => {
        item.act = param.path === item.path
        return item
    })
}


</script>
<!-- ********************************************** -->
<style lang="less" scoped>
@import "../style/common.less";

@h: 50px;
@p: .8rem;

.my-tabs {
    display: flex;
    position: relative;
    height: 54px;
    overflow-x: hidden;
    background-color: white;
    border-top: 1px solid @bc1;

    >.item {
        flex: 1;

        &::before {
            content: '';
            display: block;
            height: 30px;
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
        }

        text-align: center;
        font-size: .65rem;
        color: #bfbfbf;

        &.home::before {
            // background-image: url(/src/image/tabs/home-def.png);
            background-image: url(../image//bars/home-def.png);
        }

        &.types::before {
            // background-image: url(/src/image/tabs/type-def.png);
            background-image: url(../image//bars/type-def.png);
        }

        &.cart::before {
            // background-image: url(/src/image/tabs/cart-def.png);
            background-image: url(../image/bars/cart-def.png);
        }

        &.me::before {
            // background-image: url(/src/image/tabs/me-def.png);
            background-image: url(../image/bars/me-def.png);
        }

        &.act {
            color: #fb619c;

            &.home::before {
                // background-image: url(/src/image/tabs/home.png);
                background-image: url(../image/bars/home.png);
            }

            &.types::before {
                // background-image: url(/src/image/tabs/type.png);
                background-image: url(../image//bars/type.png);
            }

            &.cart::before {
                // background-image: url(/src/image/tabs/cart.png);
                background-image: url(../image/bars/cart.png);
            }

            &.me::before {
                // background-image: url(/src/image/tabs/me.png);
                background-image: url(../image/bars/me.png);
            }
        }
    }
}</style>