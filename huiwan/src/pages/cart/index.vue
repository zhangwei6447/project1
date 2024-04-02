<template>
    <div class="cart-box">
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar @click-right="manageEvt()" :right-text="isManage?'完成':'管理'">
                    <template #title>
                        <p style="font-weight: normal;font-size: 16px;">购物车(<span>3</span>)</p>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <main>
            <!-- 商品卡片 -->
            <div class="goodsCard" v-for="item in cartInfo" :key="item">
                <div class="left">
                    <van-checkbox v-model="item.checked" checked-color="#fb619c" icon-size="16px"></van-checkbox>
                </div>
                <div class="center">
                    <img :src="item.img" alt="">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="goods_name">
                            <span>现货</span>
                            <span>{{ item.goods_name }}</span>
                        </p>
                        <p class="limit">
                            限购<span>{{ item.purchase_limit }}</span>件
                        </p>
                        <div class="btm">
                            <p>价格 ￥<span>{{ item.goods_price }}</span></p>
                            <p>
                                <span :class="[item.goods_num <= 1 && 'act']" ref="sub" @click="subEvt(item)">-</span>
                                <span>{{ item.goods_num }}</span>
                                <span ref="add" @click="addEvt(item)">+</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <van-sticky :offset-bottom="54">
            <footer>
                <div class="left">
                    <van-checkbox v-model="allSelect" checked-color="#fb619c" icon-size="16px"></van-checkbox>
                    <span>全选</span>
                </div>
                <div class="right" v-if="!isManage">
                    <span>合计:</span>
                    <span>￥</span>
                    <span>{{ total_price }}</span>
                    <p class="jiesuan" @click="settlementEvt()">结算(<span>{{ total_num }}</span>)</p>
                </div>
                <div class="right2" v-if="isManage">
                    <span>已选:</span>
                    <span>{{ total_num }}</span>
                    <p :class="[total_num<=0?'act':'']" @click="deleteCartEvt()">删除</p>
                </div>
            </footer>
        </van-sticky>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { computed, ref } from "vue";
import { deleteCartApi, getCartApi, getGoodsDetail2Api, updateCartApi } from "../../apis/cart";
import { useCommonStore } from "../../store";
import { showToast } from "vant";

// ===========================变量============================ //
const store = useCommonStore()
// 管理购物车
const isManage=ref(false)
// 购物车信息
const cartInfo = ref([])
// 减少商品节点
const sub = ref()
// 增加商品节点
const add = ref()
// 全选框
const allSelect = computed({
    get() {
        if (!cartInfo.value.length) {
            return false
        } else {
            let flag = cartInfo.value.map(it => {
                if (it.checked === false) {
                    return false
                } else {
                    return true
                }
            })
            return !flag.includes(false)
        }
    },
    set(newVal) {
        if (newVal) {
            cartInfo.value.map((value, _index, _array) => {
                value.checked = true
            })
        } else {
            cartInfo.value.map((value, _index, _array) => {
                value.checked = false
            })
        }
    }
})
// 总价
const total_price=computed(()=>{
    let price=0
    cartInfo.value.forEach(it=>{
        if(it.checked){
            price+=it.goods_num*it.goods_price
        }
    })
    return price
})
// 总数
const total_num=computed(()=>{
    let num=0
    cartInfo.value.forEach(it=>{
        if(it.checked){
            num+=it.goods_num
        }
    })
    return num
})
// ===========================方法============================ //
/** 删除购物车 */
async function deleteCartEvt(){
    cartInfo.value.forEach(async it=>{
        if(it.checked===true){
            let res= await deleteCartApi(it._id)
        }
    })
    showToast('删除商品成功')
    queryCart()
}
/** 切换管理 */
function manageEvt(){
    if(isManage.value){
        isManage.value=false
    }else{
        isManage.value=true
    }
}
/** 结算 */
function settlementEvt(){
    console.log(total_price.value);
}
/** 查询购物车信息 */
async function queryCart() {
    let res = await getCartApi(store.user_id)
    if (res.code === 200) {
        cartInfo.value = JSON.parse(JSON.stringify(res.data))
        cartInfo.value.forEach(async it => {
            let res2 = await getGoodsDetail2Api(it.goods_id)
            if (res2.code !== 200) return
            it.img = res2.data.img[0]
            it.purchase_limit = res2.data.purchase_limit
            it.checked = false
        })
    }
}
queryCart()
/** 商品减少事件 */
async function subEvt(item) {
    if (item.goods_num <= 1) {
        showToast('商品数量不能再减少啦')
        return
    }
    let obj = {
        user_id: store.user_id,
        _id: item._id,
        count: --item.goods_num
    }
    let res = await updateCartApi(obj)
}

/** 商品增加事件 */
async function addEvt(item) {
    if (item.goods_num >= item.purchase_limit) {
        showToast(`最多购买${item.purchase_limit}件哦`)
        return
    }
    let obj = {
        user_id: store.user_id,
        _id: item._id,
        count: ++item.goods_num
    }
    let res = await updateCartApi(obj)
}


</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
.cart-box {
    width: 100vw;
    height: 100vh;

    header {
        width: 100vw;
        height: 44px;
    }

    main {
        border-radius: 0 0 12px 12px;
        overflow: scroll;
        width: 100vw;
        height: calc(100vh - 7.5rem);
        padding: 0 12px;
        background-color: white;

        .goodsCard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: white;
            border-bottom: 1px solid #dad5d5;
            padding-bottom: 20px;


            .center {
                margin: 0 12px;

                img {
                    display: block;
                    width: 4.2rem;
                    height: 4.2rem;
                }
            }

            .right {
                display: flex;
                flex-direction: column;

                .top {
                    .goods_name {
                        line-height: 14px;

                        span:nth-child(1) {
                            font-size: 10px;
                            padding: 1px 2px;
                            background-color: #e0dada;
                            border-radius: 4px;
                            color: #373636;
                        }

                        span:nth-child(2) {
                            margin-left: 8px;
                            font-size: .69rem;
                        }
                    }

                    .limit {
                        text-align: right;
                        font-size: .53rem;
                        color: #fb619c;
                        margin-top: 12px;
                    }

                    .btm {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 6px;

                        p:nth-child(1) {
                            font-size: .65rem;
                            color: #fb619c;

                            span {
                                font-size: 1rem;
                                font-weight: 500;
                            }
                        }

                        p:nth-child(2) {
                            display: flex;
                            align-items: center;

                            span:nth-child(1) {
                                display: block;
                                border-radius: 50%;
                                text-align: center;
                                width: 1rem;
                                height: 1rem;
                                line-height: .8rem;
                                border: 1px solid #B6B6B6;
                            }

                            span:nth-child(2) {
                                margin: 0 6px;
                                font-size: .75rem;
                            }

                            span:nth-child(3) {
                                display: block;
                                border-radius: 50%;
                                text-align: center;
                                width: 1rem;
                                height: 1rem;
                                line-height: .9rem;
                                border: 1px solid #B6B6B6;
                            }

                            .act {
                                background-color: #e6e4e4;
                            }
                        }

                    }
                }


            }
        }
    }



}

::v-deep(.van-sticky) {

    footer {
        background-color: white;
        position: fixed;
        bottom: 50px;
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        height: 2.8rem;
        width: 100vw;

        .left {
            display: flex;
            align-items: center;

            span {
                font-size: .75rem;
                margin-left: 6px;
            }
        }

        .right {
            display: flex;
            align-items: center;
            font-size: .75rem;

            span:nth-child(2) {
                color: #fb619c;
                margin-left: 6px;
            }

            span:nth-child(3) {
                color: #fb619c;
                font-size: .8rem;
                margin-right: 6px;
                font-size: 1rem;
            }

            p {
                display: flex;
                align-items: center;
                background: linear-gradient(270deg, #fb7299, #fb7299);
                color: white;
                padding: 6px 8px;
                border-radius: 60px;
                box-shadow: rgba(255, 100, 145, 0.7) 0 1px 4px 0;
            }
        }

        .right2{
            display: flex;
            align-items: center;
            font-size: .75rem;

            span:nth-child(2) {
                margin-left: 6px;
            }

            p {
                margin-left: 6px;
                display: flex;
                align-items: center;
                color: black;
                padding: 6px 8px;
                border-radius: 60px;
                border: 1px solid #B6B6B6;
            }
            .act{
                background-color: #e7e2e2;
                border: none;
                color: #8a8888;

            }
        }
    }
}

::v-deep(.van-nav-bar__text) {
    color: black;
}
</style>