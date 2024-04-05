<template>
    <div class="address-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.push('/mine')">
                    <template #title>
                        <span style="font-size: .7rem;font-weight: normal;">地址管理</span>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <!-- 默认地址 -->
            <div class="item" v-for="it in first_Info" :key="it">
                <div class="top">
                    <span style="font-size: .5rem;padding: 1px 1px;text-align: center;
                    color: #fb619c;
                    border: 1px solid #fb619c;">默认</span>
                    <span>{{ it.province }}</span>
                    <span>{{ it.city }}</span>
                    <span>{{ it.county }}</span>
                </div>
                <div class="center">
                    <span>{{ it.detail_address }}</span>
                    <van-icon @click="router.push({ path: '/address/edit', query: { _id: it._id } })" name="edit"
                        style="margin-left: 20px;color: #fb619c;" />
                </div>
                <div class="btm">
                    <span>{{ it.consignee }}</span>
                    <span>{{ it.phone.slice(0, 3) }}****{{ it.phone.slice(7) }}</span>
                </div>
            </div>
            <!-- 其它地址 -->
            <div class="item" v-for="item in addressInfo" :key="item">
                <div class="top">
                    <span style="font-size: .5rem;padding: 1px 1px;text-align: center;
                    color: #fb619c;
                    border: 1px solid #fb619c;" v-if="item.is_default">默认</span>
                    <span>{{ item.province }}</span>
                    <span>{{ item.city }}</span>
                    <span>{{ item.county }}</span>
                </div>
                <div class="center">
                    <span>{{ item.detail_address }}</span>
                    <van-icon @click="router.push({ path: '/address/edit', query: { _id: item._id } })" name="edit" style="margin-left: 20px;color: #fb619c;" />
                </div>
                <div class="btm">
                    <span>{{ item.consignee }}</span>
                    <span>{{ item.phone.slice(0, 3) }}****{{ item.phone.slice(7) }}</span>
                </div>
            </div>

        </main>
        <!-- 底部按钮 -->
        <footer>
            <button @click="router.push('/address/add')">添加新地址</button>
        </footer>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref } from "vue"
import { useRouter } from "vue-router";
import { useCommonStore } from "../../store";
import { addressQueryAllApi } from '../../apis/address'
// ===========================变量============================ //
const router = useRouter()
const store = useCommonStore()
// 地址信息
const addressInfo = ref()
// 
const first_Info = ref()

// ===========================方法============================ //

async function queryAddressInfoEvt() {
    let res = await addressQueryAllApi(store.userInfo._id)
    if (res.code !== 200) return
    addressInfo.value = res.data
    addressInfo.value.forEach((it, i) => {
        if (it.is_default === true) {
            addressInfo.value.splice(i, 1)
        }
    })
    addressInfo.value.sort((a, b) => b.date - a.date)
}
queryAddressInfoEvt()
// 
async function queryAddressInfoEvt2() {
    let res = await addressQueryAllApi(store.userInfo._id)
    if (res.code !== 200) return
    first_Info.value = res.data.filter(it => it.is_default === true)
}
queryAddressInfoEvt2()

</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.address-box {
    .rel();
    background-color: rgb(246, 245, 245);

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;

        .van-sticky {
            position: fixed;
        }
    }

    /** 内容区域 */
    main {
        margin-bottom: 9vh;

        .item {
            padding: 10px 12px;
            background-color: white;

            .top {
                display: flex;
                align-items: center;

                span {
                    font-size: .6rem;
                    color: rgb(157, 156, 156);
                    margin-right: 10px;
                }

            }

            .center {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 0;

                span {
                    font-size: .7rem;
                    font-weight: bold;
                }
            }

            .btm {
                span {
                    font-size: .6rem;
                    color: rgb(157, 156, 156);
                }

                span:nth-child(1) {
                    margin-right: 10px;
                }
            }
        }
    }

    /** 底部按钮 */
    footer {
        background-color: white;
        position: fixed;
        width: 100vw;
        left: 0;
        bottom: 0;
        padding: 8px 12px;

        button {
            width: 100%;
            height: 4.2vh;
            text-decoration: none;
            border: none;
            background-color: #f26fa1;
            border-radius: 20px;
            color: white;
            font-size: .6rem;
            text-align: center;
            line-height: 4.2vh;
        }
    }
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
    border: none;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 1rem;
    color: black;
    border: none;
}
</style>