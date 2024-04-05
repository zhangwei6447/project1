<template>
    <div class="order-box">
        <!-- 头部 -->
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <div
                            class="nav"
                            style="width: 100%; background-color: red"
                        >
                            <van-search
                                v-model="value"
                                placeholder="搜索我的订单"
                            />
                        </div>
                    </template>
                    <template #right>
                        <div class="right">
                            <van-icon
                                name="cart-o"
                                badge="9"
                                size=".9rem"
                                color="black"
                            />
                            <van-icon
                                name="bag-o"
                                size=".9rem"
                                color="black"
                                @click="showShare = true"
                                style="margin-left: 16px"
                            />
                        </div>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容 -->
        <main>
            <van-tabs
                v-model:active="activeName"
                sticky
                offset-top="44px"
                title-active-color="#fb619c"
                line-height="2px"
            >
                <van-tab title="全部" name="a">
                    <div class="all" v-for="item in orederList" :key="item">
                        <!-- 全部--item -->
                        <!-- ********************************** -->
                        <!-- 全部--待付款 -->
                        <div class="item" v-if="item.order_status === '待支付'">
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>等待买家付款</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格：{{
                                            item.query_goods_param
                                        }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span>订单即将关闭，建议尽快付款</span>
                            </div>
                            <div class="price">
                                <span
                                    >需付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>取消订单</button>
                                <button>修改信息</button>
                                <button>继续付款</button>
                            </div>
                        </div>
                        <!-- 全部--待发货 -->
                        <div class="item" v-if="item.order_status === '已支付'">
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>等待商家发货</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格：{{
                                            item.query_goods_param
                                        }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span>等待商家发货中，请耐心等待</span>
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>延长收货</button>
                                <button>查看物流</button>
                                <button>确认收货</button>
                            </div>
                        </div>
                        <!-- 全部--待收货 -->
                        <div class="item" v-if="item.order_status === '已发货'">
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span v-if="!item.is_delivered"
                                        >商家已发货</span
                                    >
                                    <span v-if="item.is_delivered"
                                        >商品已送达</span
                                    >
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span v-if="!item.is_delivered"
                                    >商品正在运输中，请耐心等待</span
                                >
                                <span v-if="item.is_delivered"
                                    >商品已送达，请尽快到指定地点取货</span
                                >
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>延长收货</button>
                                <button>查看物流</button>
                                <button>确认收货</button>
                            </div>
                        </div>
                        <!-- 全部--退款/售后 -->
                        <div class="item" v-if="item.order_status === '已退款'">
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span style="color: grey">退款</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_img }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span style="color: black; margin-top: 20px"
                                        >退款：￥{{ item.goods_price }}</span
                                    >
                                </div>
                            </div>
                            <div class="order">
                                <span style="color: black; margin: 0"
                                    >退款成功 退款成功￥{{
                                        item.goods_price
                                    }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>删除记录</button>
                                <button>钱款去向</button>
                                <button>联系商家</button>
                            </div>
                        </div>
                        <!-- 全部--评价 -->
                        <div class="item" v-if="item.order_status === '已收货'">
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>交易成功</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>查看物流</button>
                                <button>再来一单</button>
                                <button style="padding: 0 21px">评价</button>
                            </div>
                        </div>
                        <!-- ********************************** -->
                    </div>
                </van-tab>
                <van-tab title="待付款" name="b">
                    <div class="all">
                        <!-- 待付款--item -->
                        <div
                            class="item"
                            v-for="item in orederList.filter(
                                (it) => it.order_status === '待支付'
                            )"
                            :key="item"
                        >
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>等待买家付款</span>
                                </div>
                            </div>
                            <div
                                class="center"
                                @click="
                                    router.push({
                                        path: '/pay/continue',
                                        query: {
                                            goods_id: item.goods_id,
                                            num: item.goods_num,
                                            store_id: item.store_id,
                                            order_id: item.order_id,
                                        },
                                    })
                                "
                            >
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格：{{
                                            item.query_goods_param
                                        }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span>订单即将关闭，建议尽快付款</span>
                            </div>
                            <div class="price">
                                <span
                                    >需付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button
                                    @click="
                                        cancel_order = true;
                                        transmit_order_id = item.order_id;
                                    "
                                >
                                    取消订单
                                </button>
                                <button
                                    @click="
                                        router.push({
                                            path: '/pay/continue',
                                            query: {
                                                goods_id: item.goods_id,
                                                num: item.goods_num,
                                                store_id: item.store_id,
                                                order_id: item.order_id,
                                            },
                                        })
                                    "
                                >
                                    修改信息
                                </button>
                                <button
                                    @click="
                                        pay_continue = true;
                                        transmit_order_id = item.order_id;
                                    "
                                >
                                    继续付款
                                </button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待发货" name="c">
                    <div class="all">
                        <!-- 待发货--item -->
                        <div
                            class="item"
                            v-for="item in orederList.filter(
                                (it) => it.order_status === '已支付'
                            )"
                            :key="item"
                        >
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>等待商家发货</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格：{{
                                            item.query_goods_param
                                        }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span>等待商家发货中，请耐心等待</span>
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <!-- <button>延长收货</button>
                                <button>查看物流</button>
                                <button>确认收货</button> -->
                                <button @click="showToast('已提醒商家尽快发货')">催发货</button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待收货" name="d">
                    <div class="all">
                        <!-- 待收货--item -->
                        <div
                            class="item"
                            v-for="item in orederList.filter(
                                (it) => it.order_status === '已发货'
                            )"
                            :key="item"
                        >
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span v-if="!item.is_delivered"
                                        >商家已发货</span
                                    >
                                    <span v-if="item.is_delivered"
                                        >商品已送达</span
                                    >
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="order">
                                <van-icon name="clock-o" size=".6rem" />
                                <span v-if="!item.is_delivered"
                                    >商品正在运输中，请耐心等待</span
                                >
                                <span v-if="item.is_delivered"
                                    >商品已送达，请尽快到指定地点取货</span
                                >
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>延长收货</button>
                                <button>查看物流</button>
                                <button
                                    @click="
                                        confirm_receipt = true;
                                        transmit_order_id = item.order_id;
                                    "
                                >
                                    确认收货
                                </button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="退款/售后" name="e">
                    <div class="all">
                        <!-- 退款/售后--item -->
                        <div
                            class="item"
                            v-for="item in orederList.filter(
                                (it) => it.order_status === '已退款'
                            )"
                            :key="item"
                        >
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span style="color: grey">退款</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_img }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span style="color: black; margin-top: 20px"
                                        >退款：￥{{ item.goods_price }}</span
                                    >
                                </div>
                            </div>
                            <div class="order">
                                <span style="color: black; margin: 0"
                                    >退款成功 退款成功￥{{
                                        item.goods_price
                                    }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>删除记录</button>
                                <button>钱款去向</button>
                                <button>联系商家</button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="评价" name="f">
                    <div class="all">
                        <!-- 评价--item -->
                        <div
                            class="item"
                            v-for="item in orederList.filter(
                                (it) => it.order_status === '已收货'
                            )"
                            :key="item"
                        >
                            <div class="top">
                                <div class="left">
                                    <van-icon
                                        name="shop-o"
                                        style="font-size: 0.6rem"
                                    />
                                    <span>{{ item.query_store_name }}</span>
                                    <van-icon
                                        name="arrow"
                                        style="font-size: 0.6rem"
                                    />
                                </div>
                                <div class="right">
                                    <span>交易成功</span>
                                </div>
                            </div>
                            <div class="center">
                                <img :src="item.query_goods_img" alt="" />
                                <div class="cen">
                                    <span>{{ item.query_goods_name }}</span>
                                    <span
                                        >规格:
                                        {{ item.query_goods_param }}</span
                                    >
                                    <span>付款后,48小时内发货</span>
                                    <span>7天无理由退货</span>
                                </div>
                                <div class="r">
                                    <p>
                                        ￥<span>{{
                                            item.query_goods_price
                                        }}</span>
                                    </p>
                                    <span>x {{ item.goods_num }}</span>
                                </div>
                            </div>
                            <div class="price">
                                <span
                                    >实付款<span style="font-size: 0.5rem"
                                        >￥</span
                                    >{{ item.goods_price }}</span
                                >
                            </div>
                            <div class="btm">
                                <button>查看物流</button>
                                <button>再来一单</button>
                                <button style="padding: 0 21px">评价</button>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </main>
        <!-- pop--弹出层 -->
        <!-- pop--继续付款 -->
        <van-dialog
            v-model:show="pay_continue"
            title="订单支付"
            message="是否支付订单?"
            show-cancel-button
            @cancel="pay_continue = false"
            @confirm="continuePayEvt()"
            confirm-button-color="#fb619c"
        >
        </van-dialog>
        <!-- pop--取消订单 -->
        <van-dialog
            v-model:show="cancel_order"
            title="取消订单"
            message="是否取消订单?"
            show-cancel-button
            @cancel="cancel_order = false"
            @confirm="cancelOrderEvt()"
            confirm-button-color="#fb619c"
        >
        </van-dialog>
        <!-- pop--确认收货 -->
        <van-dialog
            v-model:show="confirm_receipt"
            title="确认收货"
            message="是否确认收货?"
            show-cancel-button
            @cancel="confirm_receipt = false"
            @confirm="confirmReceiptEvt()"
            confirm-button-color="#fb619c"
        >
        </van-dialog>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //

import { showToast } from "vant";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getGoodsDetail2Api } from "../../apis/cart";
import { queryStore2Api } from "../../apis/home";
import {
    cancelOrderApi,
    orderReceivingGoodsApi,
    payOrderApi,
    queryOrderApi,
} from "../../apis/order";
import { useCommonStore } from "../../store";
// ===========================变量============================ //
const router = useRouter();
const route = useRoute();
const store = useCommonStore();
// 搜索框的值
const value = ref();
// tab选项卡
const activeName = ref("a");
// 订单列表
const orederList = reactive([]);
// 继续支付
const pay_continue = ref(false);
// 取消订单
const cancel_order = ref(false);
// order_id--订单中间件
const transmit_order_id = ref();
// 确认收货
const confirm_receipt = ref(false);
// ===========================方法============================ //
/** 确认收货 */
async function confirmReceiptEvt() {
    let res = await orderReceivingGoodsApi(transmit_order_id.value);
    if (res.code !== 200) return;
    if (res.msg === "商品还未送达") {
        showToast("商品还未送达");
    } else {
        showToast("已确认收货");
        orederList.length = 0;
        queryOrderEvt();
    }
}
/** 取消订单 */
async function cancelOrderEvt() {
    orederList.length = 0;
    let res = await cancelOrderApi(transmit_order_id.value);
    queryOrderEvt();
}
/** 继续支付 */
async function continuePayEvt() {
    orederList.length = 0;
    let res = await payOrderApi(transmit_order_id.value);
    queryOrderEvt();
}
/** 商品规格 */
function goodsParamEvt(obj) {
    for (let key in obj) {
        return `${key}:${obj[key]}`;
    }
}
/** 查询订单 */
async function queryOrderEvt() {
    let res = await queryOrderApi(store.userInfo._id);
    if (res.code !== 200) return;
    res.data.forEach((it) => {
        orederList.push(it);
    });
    orederList.sort((a, b) => b.create_time - a.create_time);
    orederList.forEach(async (it) => {
        let res2 = await getGoodsDetail2Api(it.goods_id);
        let res3 = await queryStore2Api(it.store_id);
        if (res2.code === 200) {
            it.query_goods_img = res2.data.img[0];
            it.query_goods_name = res2.data.name;
            it.query_goods_param = goodsParamEvt(res2.data.params[0]);
            it.query_goods_price = res2.data.price;
        }
        if (res3.code === 200) {
            it.query_store_img = res3.data.store_logo;
            it.query_store_name = res3.data.store_name;
        }
    });
}
queryOrderEvt();
/** 检测来自我的页面的跳转 */
watch(
    () => route.query.tab,
    function () {
        activeName.value = route.query.tab;
    },
    {
        immediate: true,
    }
);
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
.order-box {
    width: 100vw;
    height: 100vh;
    overflow: scroll;

    // 头部
    header {
        .nav {
            .van-search {
                height: 44px;
                padding-left: 0;
            }
        }

        .right {
            display: flex;
            align-items: center;
        }
    }

    // 内容区域
    main {
        margin-bottom: 10px;

        .all {
            .item {
                margin-top: 8px;
                padding: 8px 12px;
                background-color: white;
                overflow: hidden;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .left {
                        span {
                            font-size: 0.6rem;
                            margin: 0 4px;
                        }
                    }

                    .right {
                        span {
                            font-size: 0.6rem;
                            color: orangered;
                        }
                    }
                }

                .center {
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;

                    img {
                        width: 3.6rem;
                        height: 3.6rem;
                        border-radius: 8px;
                    }

                    .cen {
                        font-size: 0.6rem;
                        display: flex;
                        flex-direction: column;
                        margin: 0 12px;
                        flex: 1;

                        span {
                            display: inline-block;
                            width: 48vw;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-top: 3px;
                        }

                        span:nth-child(1) {
                            margin-top: 0;
                            font-weight: bold;
                        }

                        span:nth-child(2) {
                            color: #8d8b8b;
                        }

                        span:nth-child(3) {
                            color: rgb(255, 167, 3);
                        }

                        span:nth-child(4) {
                            color: #fb619c;
                            font-size: 0.5rem;
                            width: 20vw;
                            border: 1px solid #fb619c;
                            text-align: center;
                        }
                    }

                    .r {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;

                        p {
                            font-size: 0.5rem;

                            span {
                                font-size: 0.65rem;
                                font-weight: bold;
                                color: black;
                                margin-top: 0px;
                            }
                        }

                        span {
                            margin-top: 4px;
                            font-size: 0.6rem;
                            color: #838282;
                        }
                    }
                }

                .order {
                    width: 100%;
                    background-color: #f1eeee;
                    border-radius: 4px;
                    padding: 6px 12px;
                    display: flex;
                    align-items: center;
                    margin-top: 8px;

                    span {
                        font-size: 0.6rem;
                        color: orangered;
                        margin-left: 8px;
                    }
                }

                .price {
                    margin-top: 6px;
                    display: flex;
                    justify-content: flex-end;

                    span {
                        font-size: 0.75rem;
                        font-weight: bold;
                    }
                }

                .btm {
                    margin-top: 8px;
                    display: flex;
                    justify-content: flex-end;

                    button {
                        font-size: 0.65rem;
                        padding: 5px 8px;
                        border: 0.01rem solid rgb(201, 198, 198);
                        background-color: white;
                        border-radius: 16px;
                        margin-left: 10px;
                    }

                    button:nth-child(3) {
                        color: orangered;
                        border: 0.01rem solid orangered;
                    }
                }
            }
        }
    }
}

// 头部导航
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 。8rem;
    color: #8b8b8b;
}

::v-deep(.van-nav-bar__title) {
    max-width: none;
    width: 68%;
    margin: 0 auto;
    margin-left: 13%;
    padding: 0;

    .van-search__content {
        border-radius: 40px;
        height: 30px;
        display: flex;
        align-items: center;

        .van-field__left-icon .van-icon,
        .van-field__right-icon .van-icon {
            color: #b6b6b6;
        }

        .van-field__control[type="search"] {
            font-size: 0.65rem;
            font-weight: normal;
        }

        .van-badge__wrapper {
            color: #b6b6b6;
        }
    }
}

/** 数字提示 */
::v-deep(.van-badge--top-right) {
    background-color: #fb619c;
    color: white;
    font-weight: normal;
    width: 0.6rem;
    height: 0.6rem;
    display: block;
    border-radius: 50%;
    font-size: 0.5rem;
}

/** 内容部分 */
::v-deep(.van-tabs__content) {
    overflow: scroll;
}

::v-deep(.van-tab--grow) {
    font-weight: normal;
    font-size: 0.65rem;
}

::v-deep(.van-tabs__line) {
    background-color: #fb619c;
}
</style>