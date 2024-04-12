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
                                :badge="cartGoodsNum"
                                size=".9rem"
                                color="black"
                                @click="router.push('/cart')"
                            />
                            <van-icon
                                name="bag-o"
                                size=".9rem"
                                color="black"
                                @click="router.push('/home')"
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
                        <div
                            class="item"
                            v-if="item.order_status === '待支付'"
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
                        <!-- 全部--待发货 -->
                        <div
                            class="item"
                            v-if="item.order_status === '已支付'"
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
                                <button
                                    @click="showToast('已提醒商家尽快发货')"
                                >
                                    催发货
                                </button>
                            </div>
                        </div>
                        <!-- 全部--待收货 -->
                        <div
                            class="item"
                            v-if="item.order_status === '已发货'"
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
                                <button @click="showToast('已延长收货')">
                                    延长收货
                                </button>
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
                        <!-- 全部--退款/售后 -->
                        <div
                            class="item"
                            v-if="item.order_status === '已退款'"
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
                                <button @click="toServiceEvt(item)">
                                    联系商家
                                </button>
                            </div>
                        </div>
                        <!-- 全部--评价 -->
                        <div
                            class="item"
                            v-if="item.order_status === '已收货'"
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
                                <button
                                    @click="
                                        pop_repeat_order = true;
                                        transmit_repeat_goods = item;
                                        buy_goods_num = 1;
                                    "
                                >
                                    再来一单
                                </button>
                                <button
                                    @click="
                                        pop_remark = true;
                                        transmit_goods = item;
                                    "
                                    style="padding: 0 21px"
                                >
                                    评价
                                </button>
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
                                <button
                                    @click="showToast('已提醒商家尽快发货')"
                                >
                                    催发货
                                </button>
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
                                <button @click="showToast('已延长收货')">
                                    延长收货
                                </button>
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
                                <button @click="toServiceEvt(item)">
                                    联系商家
                                </button>
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
                                <button
                                    @click="
                                        pop_repeat_order = true;
                                        transmit_repeat_goods = item;
                                        buy_goods_num = 1;
                                    "
                                >
                                    再来一单
                                </button>
                                <button
                                    @click="
                                        pop_remark = true;
                                        transmit_goods = item;
                                    "
                                    style="padding: 0 21px"
                                >
                                    评价
                                </button>
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
        <!-- pop--评价 -->
        <div class="pop_remark">
            <van-popup
                v-model:show="pop_remark"
                position="bottom"
                :style="{ height: '100%' }"
            >
                <div class="con">
                    <div class="top">
                        <van-icon
                            name="arrow-left"
                            size=".8rem"
                            @click="pop_remark = false"
                        />
                        <span>真实、有趣的分享更受欢迎哦</span>
                        <span></span>
                    </div>
                    <div class="pic">
                        <van-uploader
                            v-model="upload_img"
                            multiple
                            max-count="4"
                            upload-text="添加图片"
                        />
                    </div>
                    <div class="content">
                        <div class="top">
                            <span
                                :class="[tag1 && 'act']"
                                @click="
                                    tag1 = true;
                                    tag2 = false;
                                    tag3 = false;
                                    remark_content = '外观材质：';
                                "
                                >外观材质</span
                            >
                            <span
                                :class="[tag2 && 'act']"
                                @click="
                                    tag2 = true;
                                    tag1 = false;
                                    tag3 = false;
                                    remark_content = '商品质量：';
                                "
                                >商品质量</span
                            >
                            <span
                                :class="[tag3 && 'act']"
                                @click="
                                    tag3 = true;
                                    tag1 = false;
                                    tag2 = false;
                                    remark_content = '购物心得：';
                                "
                                >购物心得</span
                            >
                        </div>
                        <div class="btm">
                            <van-field
                                v-model="remark_content"
                                rows="2"
                                autosize
                                type="textarea"
                                maxlength="1000"
                                placeholder="展开说说对商品的想法吧..."
                                show-word-limit
                                style="overflow: hidden; font-size: 0.6rem"
                            />
                        </div>
                    </div>
                    <div class="send">
                        <div class="goods">
                            <div class="left">
                                <img
                                    :src="transmit_goods.query_goods_img"
                                    alt=""
                                />
                            </div>
                            <div class="right">
                                <span>{{
                                    transmit_goods.query_goods_name
                                }}</span>
                                <span
                                    >规格：{{
                                        transmit_goods.query_goods_param
                                    }}</span
                                >
                            </div>
                        </div>
                        <div class="remark">
                            <div class="item">
                                <span>描述相符</span>
                                <van-rate v-model="rate1" size=".8rem" />
                            </div>
                            <div class="item">
                                <span>描述相符</span>
                                <van-rate v-model="rate2" size=".8rem" />
                            </div>
                            <div class="item">
                                <span>描述相符</span>
                                <van-rate v-model="rate3" size=".8rem" />
                            </div>
                        </div>
                        <div class="btn">
                            <button
                                :class="[!remark_content && 'act']"
                                @click="sendEvt()"
                            >
                                发布
                            </button>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
        <!-- pop--再来一单 -->
        <div class="pop_repeat">
            <van-popup
                v-model:show="pop_repeat_order"
                position="bottom"
                :style="{
                    height: '80%',
                    'border-radius': '16px 16px 0 0',
                    overflow: 'hidden',
                }"
            >
                <main>
                    <div class="head">
                        <div class="top">
                            <div class="left">
                                <img
                                    :src="transmit_repeat_goods.query_goods_img"
                                    alt=""
                                />
                                <div class="price">
                                    <p>
                                        <span>￥</span>
                                        <span>{{
                                            transmit_repeat_goods.query_goods_old_price
                                        }}</span>
                                        <span
                                            >实付价￥{{
                                                transmit_repeat_goods.query_goods_price
                                            }}</span
                                        >
                                    </p>
                                    <span
                                        >已优惠{{
                                            transmit_repeat_goods.query_goods_old_price -
                                            transmit_repeat_goods.query_goods_price
                                        }}元</span
                                    >
                                </div>
                            </div>
                            <div class="right">
                                <van-icon
                                    name="cross"
                                    style="font-size: 0.8rem; color: black"
                                />
                            </div>
                        </div>
                        <div class="btm" @click="pop_address = true">
                            <div class="left">
                                <van-icon
                                    name="location-o"
                                    size="1rem"
                                    color="#fb619c"
                                />
                                <p>
                                    <span
                                        >{{ defult_address.consignee }}
                                        {{
                                            defult_address.detail_address
                                        }}</span
                                    >
                                    <span>包邮 送运费险</span>
                                </p>
                            </div>
                            <div class="right">
                                <van-icon name="arrow" size=".6rem" />
                            </div>
                        </div>
                    </div>
                    <div class="con">
                        <div class="num">
                            <div class="left">
                                <span>数量</span>
                                <span
                                    >限购{{
                                        transmit_repeat_goods.query_goods_purchase_limit
                                    }}件</span
                                >
                            </div>
                            <div class="right">
                                <van-icon
                                    @click="
                                        if (buy_goods_num >= 2) {
                                            buy_goods_num--;
                                        }
                                    "
                                    name="minus"
                                    style="
                                        font-size: 0.6rem;
                                        width: 1rem;
                                        height: 0.8rem;
                                        border: 1px solid #838282;
                                        text-align: center;
                                        border-right: none;
                                    "
                                />
                                <span>{{ buy_goods_num }}</span>
                                <van-icon
                                    @click="
                                        if (
                                            buy_goods_num <
                                            transmit_repeat_goods.query_goods_purchase_limit
                                        ) {
                                            buy_goods_num++;
                                        }
                                    "
                                    name="plus"
                                    style="
                                        font-size: 0.6rem;
                                        width: 1rem;
                                        height: 0.8rem;
                                        border: 1px solid #838282;
                                        text-align: center;
                                        border-left: none;
                                    "
                                />
                            </div>
                        </div>
                        <div class="service">
                            <div class="left">
                                <span>服务保障</span>
                            </div>
                            <div class="right">
                                <span>更多服务</span>
                                <van-icon
                                    name="arrow"
                                    style="font-size: 0.6rem; margin-left: 6px"
                                />
                            </div>
                        </div>
                        <div class="fapiao">
                            <div class="left">
                                <span>开具发票</span>
                            </div>
                            <div class="right">
                                <span>本次不开具发票</span>
                                <van-icon
                                    name="arrow"
                                    style="font-size: 0.6rem; margin-left: 6px"
                                />
                            </div>
                        </div>
                        <div class="beizhu">
                            <div class="left">
                                <span>订单备注</span>
                            </div>
                            <div class="right">
                                <span>无备注</span>
                                <van-icon
                                    name="arrow"
                                    style="font-size: 0.6rem; margin-left: 6px"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <button @click="pop_repeat_pay = true">
                            立即支付 ￥{{
                                transmit_repeat_goods.query_goods_price *
                                buy_goods_num
                            }}
                        </button>
                    </div>
                </main>
            </van-popup>
        </div>
        <!-- 地址弹出 -->
        <div id="address">
            <van-popup
                round
                v-model:show="pop_address"
                position="bottom"
                :style="{ height: '85%' }"
                @open="check_address = 0"
            >
                <div class="top">
                    <span></span>
                    <span>收货地址</span>
                    <van-icon name="cross" />
                </div>
                <div class="center">
                    <div class="title">
                        <div class="left">
                            <span>常用地址</span>
                        </div>
                        <div class="right">
                            <div class="it">
                                <van-icon name="edit" color="#fb619c" />
                                <span
                                    v-if="!is_manage"
                                    @click="is_manage = true"
                                    >管理</span
                                >
                                <span
                                    v-if="is_manage"
                                    @click="is_manage = false"
                                    >完成</span
                                >
                            </div>
                            <div
                                class="it"
                                @click="router.push('/address/add')"
                            >
                                <van-icon name="plus" color="#fb619c" />
                                <span>新增</span>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <van-radio-group v-model="check_address">
                            <!-- 地址 -->
                            <div
                                class="it"
                                v-for="(item, index) in addressInfo"
                                :key="item"
                            >
                                <div class="item">
                                    <div class="left">{{ item.consignee }}</div>
                                    <div class="center">
                                        <div class="name">
                                            <span>{{ item.consignee }}</span>
                                            <span>{{ item.phone }}</span>
                                            <span v-if="item.is_default"
                                                >默认</span
                                            >
                                        </div>
                                        <div class="address">
                                            <span>{{ item.province }}</span>
                                            <span>{{ item.city }}</span>
                                            <span>{{ item.county }}</span>
                                            <span>{{
                                                item.detail_address
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <van-radio
                                            :name="index"
                                            icon-size=".85rem"
                                            checked-color="#fb619c"
                                            v-if="!is_manage"
                                            @click="tabAddressEvt(item, index)"
                                        />
                                        <van-icon
                                            name="edit"
                                            size=".85rem"
                                            color="#fb619c"
                                            v-if="is_manage"
                                        />
                                    </div>
                                </div>
                                <div class="delete" v-if="is_manage">
                                    <div class="left">
                                        <van-radio
                                            :name="index"
                                            icon-size=".85rem"
                                            checked-color="#fb619c"
                                        />
                                        <span>默认地址</span>
                                    </div>
                                    <div
                                        class="right"
                                        @click="deletePopEvt(item)"
                                    >
                                        删除
                                    </div>
                                </div>
                            </div>
                        </van-radio-group>
                    </div>
                </div>
                <div class="btm">
                    <van-button
                        @click="selectAddressEvt()"
                        color="linear-gradient(to right, #f989b4, #fc488d)"
                    >
                        确定
                    </van-button>
                </div>
            </van-popup>
        </div>
        <!-- 删除弹出框 -->
        <van-dialog
            v-model:show="delete_pop"
            title="删除地址"
            message="是否删除收货地址?"
            show-cancel-button
            @cancel="delete_pop = false"
            @confirm="deleteAddressEvt()"
            confirm-button-color="#fb619c"
        >
        </van-dialog>
        <!-- pop--再来一单--是否支付 -->
        <van-dialog
            v-model:show="pop_repeat_pay"
            title="支付订单"
            message="是否支付订单?"
            show-cancel-button
            @cancel="repeatPayCancelEvt()"
            @confirm="repeatPayEvt()"
            confirm-button-color="#fb619c"
        />
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { showToast } from "vant";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCartApi, getGoodsDetail2Api } from "../../apis/cart";
import {
    addRemarkApi,
    queryStore2Api,
    uploadRemarkImgApi,
} from "../../apis/home";
import {
    cancelOrderApi,
    createOrderApi,
    orderReceivingGoodsApi,
    payOrderApi,
    queryOrderApi,
} from "../../apis/order";
import { useCommonStore } from "../../store";
import { scaleImage } from "../../utils";
import { addressDeleteApi, addressQueryAllApi } from "../../apis/address";
import { chatAddApi } from "../../apis/chat";
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
// 弹出层--评价
const pop_remark = ref(false);
// 上传的图片
const upload_img = ref();
// 评价文本
const remark_content = ref("");
// 评价星星
const rate1 = ref(0);
const rate2 = ref(0);
const rate3 = ref(0);
// 分享--tag切换
const tag1 = ref(false);
const tag2 = ref(false);
const tag3 = ref(false);
// 评价--商品中间件
const transmit_goods = ref();
// 发布按钮是否可用
const is_ok = computed(() => {
    if (!remark_content.value) {
        return false;
    } else {
        return true;
    }
});
// 购物车
const cartList = ref();
// 购物车商品数量
const cartGoodsNum = ref(0);
// 再来一单--pop
const pop_repeat_order = ref(false);
// 再来一单--是否支付
const pop_repeat_pay = ref(false);
// 再来一单--商品中间件
const transmit_repeat_goods = ref();
// 购买数量
const buy_goods_num = ref(1);
// 地址弹出
const pop_address = ref(false);
// 地址信息
const addressInfo = ref();
// 默认地址
const defult_address = reactive({
    city: "",
    consignee: "",
    county: "",
    date: 0,
    detail_address: "",
    is_default: true,
    phone: "",
    province: "",
    user_id: "",
    __v: 0,
    _id: "",
});
// 是否是管理地址
const is_manage = ref(false);
// 删除弹出框
const delete_pop = ref(false);
// 删除地址中间件
const delete_address = ref();
// 切换地址中间件
const tab_address = ref();
// 选择地址
const check_address = ref();
// ===========================方法============================ //
/** 跳转到客服页面 */
async function toServiceEvt(item) {
    router.push({
        path: "/service",
        query: { store_id: item.remark_store_id },
    });
    let obj = {
        user_id: store.userInfo._id,
        store_id: item.store_id,
    };
    let res = await chatAddApi(obj);
}
/** 切换地址 */
function tabAddressEvt(item, index) {
    check_address.value = index;
    tab_address.value = item;
}
/** 删除弹出框 */
function deletePopEvt(item) {
    delete_address.value = item;
    delete_pop.value = true;
}
/** 删除地址 */
async function deleteAddressEvt() {
    let res = await addressDeleteApi(
        delete_address.value._id,
        store.userInfo._id,
        delete_address.value.is_default
    );
    queryAddressEvt();
}
/** 修改默认地址方法 */
function selectAddressEvt() {
    pop_address.value = false;
    // defult_address.consignee = "666";
    for (let key in defult_address) {
        defult_address[key] = tab_address.value[key];
    }
}
/** 查询默认地址信息 */
async function queryAddressEvt() {
    let res = await addressQueryAllApi(store.userInfo._id);
    if (res.code !== 200) return;
    addressInfo.value = res.data.sort((a, b) => b.date - a.date);
    addressInfo.value.forEach((it, index) => {
        if (it.is_default) {
            if (index !== 0) {
                let temp = addressInfo.value[0];
                addressInfo.value[0] = addressInfo.value[index];
                addressInfo.value[index] = temp;
            }
        }
    });
    check_address.value = "0";
    for (let key in defult_address) {
        defult_address[key] = res.data.filter(
            (it) => it.is_default === true
        )[0][key];
    }
}
queryAddressEvt();
/** 再来一单--取消支付 */
async function repeatPayCancelEvt() {
    pop_repeat_order.value = false;
    pop_repeat_pay.value = false;
    let obj = {
        user_id: store.userInfo._id,
        goods_id: transmit_repeat_goods.value.goods_id,
        store_id: transmit_repeat_goods.value.store_id,
        order_status: "待支付",
        goods_num: buy_goods_num.value,
        goods_price:
            transmit_repeat_goods.value.query_goods_price * buy_goods_num.value,
        receiving_address: defult_address._id,
    };
    let res = await createOrderApi(obj);
    orederList.length = 0;
    queryOrderEvt();
}
/** 再来一单--支付 */
async function repeatPayEvt() {
    pop_repeat_order.value = false;
    pop_repeat_pay.value = false;
    let obj = {
        user_id: store.userInfo._id,
        goods_id: transmit_repeat_goods.value.goods_id,
        store_id: transmit_repeat_goods.value.store_id,
        order_status: "已支付",
        goods_num: buy_goods_num.value,
        goods_price:
            transmit_repeat_goods.value.query_goods_price * buy_goods_num.value,
        receiving_address: defult_address._id,
    };
    let res = await createOrderApi(obj);
    orederList.length = 0;
    queryOrderEvt();
}
/** 查询购物车 */
async function queryCartEvt() {
    let res = await getCartApi(store.userInfo._id);
    if (res.code === 200) {
        cartList.value = res.data;
        cartList.value.forEach((it) => {
            cartGoodsNum.value += parseInt(it.goods_num);
        });
    }
}
queryCartEvt();
/** 发布事件 */
async function sendEvt() {
    if (!is_ok.value) return;
    store.store_id = transmit_goods.value.remark_store_id;
    store.goods_id = transmit_goods.value.remark_goods_id;
    // 遍历上传的图片文件并添加到数组里面
    let imgArr = [];
    if (upload_img.value) {
        for (let i = 0; i < upload_img.value.length; i++) {
            let name = upload_img.value[i].file.lastModified;
            let d = await scaleImage(upload_img.value[i].file);
            let res = await uploadRemarkImgApi(d, name);
            imgArr.push(res);
        }
    }
    let obj = {
        date: Date.now(),
        text: remark_content.value || "",
        img: imgArr || [],
        like: [],
    };
    let res2 = await addRemarkApi(obj);
    showToast("发布成功");
    if (res2.code === 200) {
        pop_remark.value = false;
    }
    setTimeout(() => {
        remark_content.value = "";
        upload_img.value = [];
    }, 10);
}
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
/** 处理商品规格 */
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
            it.query_goods_old_price = res2.data.old_price;
            it.query_goods_purchase_limit = res2.data.purchase_limit;
            it.remark_goods_id = res2.data.goods_id;
        }
        if (res3.code === 200) {
            it.query_store_img = res3.data.store_logo;
            it.query_store_name = res3.data.store_name;
            it.remark_store_id = res3.data.store_id;
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

/** 弹出层--评价 */
.pop_remark {
    .con {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-image: linear-gradient(
            to right,
            rgb(248, 241, 241),
            rgb(249, 236, 227)
        );
        .top {
            height: 7vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 12px;
            span {
                font-size: 0.6rem;
                color: #717070;
            }
        }
        .pic {
            height: 14vh;
            padding: 0 10px;
            overflow: scroll;
            .van-uploader {
                width: 100%;
                height: 100%;
                border-radius: 12px;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .content {
            overflow: hidden;
            background-color: white;
            margin-top: 15px;
            border-radius: 16px 16px 0 0;
            padding: 20px 10px;
            height: calc(100vh - 24vh);
            .top {
                display: flex;
                justify-content: start;
                span {
                    font-size: 0.55rem;
                    display: block;
                    margin-right: 10px;
                    border: 1px solid rgb(198, 198, 198);
                    border-radius: 10px;
                    color: black;
                    padding: 1px 6px;
                }
                .act {
                    background-color: #fbe6ee;
                    color: #fb619c;
                    border: 1px solid white;
                }
            }
        }
        .send {
            background-color: #fbfbfb;
            position: fixed;
            left: 0;
            bottom: 0;
            padding: 12px 16px;
            .goods {
                display: flex;
                align-items: center;

                .left {
                    img {
                        width: 1.6rem;
                        height: 1.6rem;
                        border-radius: 4px;
                    }
                }
                .right {
                    width: 100%;
                    margin-left: 12px;
                    span {
                        /* 设置不换行 */
                        overflow: hidden;
                        white-space: nowrap;
                        /* 设置换行时显示省略号 */
                        text-overflow: ellipsis;
                    }
                    span:nth-child(1) {
                        display: inline-block;
                        width: 70vw;
                        vertical-align: top;
                        font-size: 0.6rem;
                    }
                    span:nth-child(2) {
                        vertical-align: top;
                        display: inline-block;
                        font-size: 0.55rem;
                    }
                }
            }
            .remark {
                .item {
                    margin-bottom: 4px;
                    span {
                        font-size: 0.6rem;
                        font-weight: bold;
                        margin-right: 16px;
                    }
                }
            }
            .btn {
                margin-top: 16px;
                button {
                    width: 100%;
                    height: 30px;
                    font-size: 0.7rem;
                    border: none;
                    background-color: #fb619c;
                    border-radius: 20px;
                    color: white;
                }
                .act {
                    background-color: #fcb8d2;
                }
            }
        }
    }
}
/** pop--评价样式 */
::v-deep(.van-uploader__upload-text) {
    color: black !important;
}
::v-deep(.van-uploader__upload) {
    background-color: white;
}
::v-deep(.van-uploader__preview-image) {
    width: 3.2rem !important;
    height: 3.2rem !important;
}
::v-deep(.van-uploader__wrapper) {
    display: flex;
    align-items: center;
}

/** 弹出层--再来一单 */
.pop_repeat {
    main {
        background-color: rgb(234, 234, 234);
        width: 100vw;
        height: 100%;
        padding: 0 12px;
        .head {
            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                .left {
                    display: flex;
                    align-items: center;
                    img {
                        width: 2.4rem;
                        height: 2.4rem;
                        border-radius: 6px;
                    }
                    .price {
                        margin-left: 8px;
                        p {
                            display: flex;
                            align-items: center;
                            span:nth-child(1) {
                                font-size: 0.6rem;
                                color: #fb619c;
                            }
                            span:nth-child(2) {
                                font-size: 1rem;
                                color: #fb619c;
                            }
                            span:nth-child(3) {
                                margin-left: 4px;
                                font-size: 0.6rem;
                                font-weight: bold;
                                display: inline-block;
                                background-color: #fb619c;
                                color: white;
                                padding: 2px 6px;
                                border-radius: 16px;
                            }
                        }
                        span {
                            font-size: 0.6rem;
                            color: #fb619c;
                        }
                    }
                }
            }
            .btm {
                background-color: white;
                padding: 10px 6px;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    align-items: center;
                    p {
                        margin-left: 8px;
                        display: flex;
                        flex-direction: column;
                        span:nth-child(1) {
                            width: 75vw;
                            font-weight: bold;
                            font-size: 0.65rem;
                            /* 设置不换行 */
                            overflow: hidden;
                            white-space: nowrap;
                            /* 设置换行时显示省略号 */
                            text-overflow: ellipsis;
                        }
                        span:nth-child(2) {
                            margin-top: 4px;
                            font-size: 0.6rem;
                        }
                    }
                }
            }
        }

        .con {
            background-color: white;
            margin-top: 10px;
            border-radius: 10px;
            padding: 10px 6px;
            .num,
            .service,
            .fapiao,
            .beizhu {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                .left {
                    span {
                        font-size: 0.6rem;
                    }
                }
                .right {
                    span {
                        font-size: 0.6rem;
                        color: #908f8f;
                    }
                }
            }
            .num {
                .right {
                    display: flex;
                    align-items: center;
                    span:nth-child(2) {
                        display: inline-block;
                        border: 1px solid #838282;
                        width: 1.6rem;
                        height: 0.8rem;
                        text-align: center;
                        color: black;
                    }
                }
            }
        }

        .btn {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 16px 12px;
            button {
                background-color: #fb619c;
                border: none;
                color: white;
                font-size: 0.7rem;
                width: 100%;
                height: 30px;
                border-radius: 30px;
            }
        }
    }
}

/** 地址弹出 */
#address {
    ::v-deep(.van-popup--bottom) {
        border: 20px 20px 0 0;
        // position: relative;
        background-color: rgb(245, 242, 242);
        .top {
            height: 6vh;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 12px;
            // position: absolute;
            position: sticky;
            left: 0;
            top: 0;
            background-color: rgb(245, 242, 242);
            font-size: 0.8rem;
            color: #fb619c;
        }
        .btm {
            background-color: rgb(245, 242, 242);
            width: 100%;
            padding: 6px 12px;
            position: fixed;
            left: 0;
            bottom: 0;
        }
        .center {
            margin-bottom: 6vh;
            overflow: scroll;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.6rem;
                padding: 6px 8px;
                background-color: rgb(252, 249, 249);
                .right {
                    display: flex;
                    align-items: center;
                    .it:nth-child(1) {
                        margin-right: 15px;
                    }
                    span {
                        margin-left: 2px;
                        color: #fb619c;
                    }
                }
            }
            .content {
                background-color: rgb(245, 242, 242);
                .it {
                    background-color: white;
                    padding: 0px 12px;
                    margin-bottom: 12px;
                    .item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 0;

                        .left {
                            display: block;
                            width: 2rem;
                            height: 2rem;
                            background-color: #ffd6e6;
                            color: #fd4a8f;
                            font-size: 0.65rem;
                            font-weight: bold;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 2rem;
                        }
                        .center {
                            margin: 0;
                            width: 70vw;
                            .name {
                                display: flex;
                                align-items: center;
                                span:nth-child(1) {
                                    font-size: 0.65rem;
                                    font-weight: bold;
                                }
                                span:nth-child(2) {
                                    font-size: 0.6rem;
                                    margin-left: 6px;
                                    color: grey;
                                }
                                span:nth-child(3) {
                                    display: inline-block;
                                    text-align: center;
                                    padding: 1px 2px;
                                    margin-left: 6px;
                                    font-size: 0.45rem;
                                    color: #fd4a8f;
                                    border: 1px solid #fd4a8f;
                                }
                            }
                            .address {
                                font-size: 0.6rem;
                                margin-top: 4px;
                                line-height: 18px;
                                color: black;
                                span {
                                    display: inline-block;
                                    margin-right: 6px;
                                }
                                span:nth-child(4) {
                                    display: -webkit-box;
                                    overflow: hidden;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                    }
                    .delete {
                        padding: 10px 0;
                        border-top: 1px solid #e0e0e0;
                        font-size: 0.6rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .left {
                            display: flex;
                            span {
                                margin-left: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
    ::v-deep(.van-button) {
        width: 100%;
        height: 32px;
        border-radius: 20px;
    }
}
</style>