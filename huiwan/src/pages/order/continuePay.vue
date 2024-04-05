<template>
    <div class="address-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <span style="font-size: 0.7rem; font-weight: normal"
                            >继续付款</span
                        >
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <!-- 地址 -->
            <div class="address" @click="showBottom = true">
                <div class="left">
                    <div class="l">
                        <van-icon
                            name="location-o"
                            size="1rem"
                            color="#fb619c"
                        />
                    </div>
                    <div
                        class="r"
                        style="padding-right: 20px; margin-left: 10px"
                    >
                        <div class="top">
                            {{ defult_address.consignee }}
                            {{ defult_address.detail_address }}
                        </div>
                        <div class="btm" style="margin-top: 4px">
                            包邮<span> 可选运费险 </span>预计24小时内发货
                        </div>
                    </div>
                </div>
                <div class="right">
                    <van-icon name="arrow" size=".6rem" />
                </div>
            </div>
            <!-- 商品 -->
            <div class="top">
                <!--  -->
                <div class="goods">
                    <img :src="goodsInfo.img" alt="" />
                    <div class="right" style="padding-right: 10px">
                        <div class="name">
                            <span>现货</span>
                            <span>{{ goodsInfo.name }} </span>
                        </div>
                        <div
                            class="size"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            "
                        >
                            <span>规格: {{ goodsInfo.tag }}</span>
                            <span>x {{ route.query.num }}</span>
                        </div>
                        <div class="tag">
                            <van-icon name="info-o" />
                            <span>不可使用优惠券</span>
                        </div>
                        <div class="price">
                            <span>价格：￥</span>
                            <span>{{ goodsInfo.price }}</span>
                        </div>
                    </div>
                </div>
                <div class="youhui" style="margin-top: 15px">
                    <div class="l">优惠券</div>
                    <div class="r" style="margin-top: 0">
                        <span>暂无可用</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
            <!-- 支付方式 -->
            <div class="pay_style">
                <div class="title">
                    <span>选择支付方式</span>
                </div>
                <div class="style">
                    <van-radio-group v-model="pay_style">
                        <div class="item">
                            <van-radio name="1" icon-size=".85rem" />
                            <img src="../../image/pay/支付宝支付.png" alt="" />
                            <span>支付宝</span>
                        </div>
                        <div class="item">
                            <van-radio name="2" icon-size=".85rem" />
                            <img src="../../image/pay/微信支付.png" alt="" />
                            <span>微信支付</span>
                        </div>
                        <div class="item">
                            <van-radio name="3" icon-size=".85rem" />
                            <img
                                src="../../image/pay/银联支付支付.png"
                                alt=""
                            />
                            <span>银联支付</span>
                        </div>
                        <div class="item">
                            <van-radio name="4" icon-size=".85rem" />
                            <img src="../../image/pay/花呗支付.png" alt="" />
                            <span>花呗支付</span>
                        </div>
                        <div class="item">
                            <van-radio name="5" icon-size=".85rem" />
                            <img src="../../image/pay/一网通支付.png" alt="" />
                            <span>一网通支付</span>
                        </div>
                        <div class="item">
                            <van-radio name="6" icon-size=".85rem" />
                            <img src="../../image/pay/qq支付.png" alt="" />
                            <span>QQ支付</span>
                        </div>
                    </van-radio-group>
                </div>
            </div>
        </main>
        <!-- 底部按钮 -->
        <footer>
            <div class="top">
                <van-checkbox
                    v-model="agree"
                    checked-color="#fb619c"
                ></van-checkbox>
                <span>同意</span>
                <span @click="router.push('/conts')"
                    >《预售支付协议&荟玩电商平台用户服务协议》</span
                >
            </div>
            <div class="btm">
                <div class="left">
                    <span>￥</span>
                    <span>{{ settlement_price }}</span>
                </div>
                <button @click="pay_pop = true">提交订单</button>
            </div>
        </footer>
        <!-- 地址弹出 -->
        <van-popup
            round
            v-model:show="showBottom"
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
                            <span v-if="!is_manage" @click="is_manage = true"
                                >管理</span
                            >
                            <span v-if="is_manage" @click="is_manage = false"
                                >完成</span
                            >
                        </div>
                        <div class="it" @click="router.push('/address/add')">
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
                                        <span v-if="item.is_default">默认</span>
                                    </div>
                                    <div class="address">
                                        <span>{{ item.province }}</span>
                                        <span>{{ item.city }}</span>
                                        <span>{{ item.county }}</span>
                                        <span>{{ item.detail_address }}</span>
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
                                <div class="right" @click="deletePopEvt(item)">
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
        <!-- 提交订单 -->
        <van-dialog
            v-model:show="pay_pop"
            title="订单支付"
            message="是否支付订单?"
            show-cancel-button
            @cancel="pay_pop = false"
            @confirm="payOkEvt()"
            confirm-button-color="#fb619c"
        >
        </van-dialog>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { showToast } from "vant";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addressDeleteApi, addressQueryAllApi } from "../../apis/address";
import { getGoodsDetail2Api } from "../../apis/cart";
import { useCommonStore } from "../../store";
import { orderUpdateApi } from "../../apis/order";
// ===========================变量============================ //
const router = useRouter();
const route = useRoute();
const store = useCommonStore();
// 同意协议
const agree = ref();
// 支付方式
const pay_style = ref("1");
// 底部弹出
const showBottom = ref(false);
// 选择地址
const check_address = ref();
// 商品信息
const goodsInfo = reactive({
    img: "",
    name: "",
    tag: "",
    price: "",
    purchase_limit: "",
});
// 购买数量
const goods_num = ref();
// 结算价格
const settlement_price = computed(() => goodsInfo.price * goods_num.value);
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
// 支付订单
const pay_pop = ref(false);
// ===========================方法============================ //
/** 支付确认事件 */
async function payOkEvt() {
    let res = await orderUpdateApi(defult_address._id, route.query.order_id);
    router.go(-1);
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
    showBottom.value = false;
    defult_address.consignee = "666";
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
/** 查询商品信息 */
watch(
    () => route.query.goods_id,
    async function () {
        goods_num.value = route.query.num;
        /** 查询商品信息 */
        let res = await getGoodsDetail2Api(route.query.goods_id);
        if (res.code !== 200) return;
        goodsInfo.img = res.data.img[0];
        goodsInfo.name = res.data.name;
        for (let key in res.data.params[0]) {
            goodsInfo.tag = `${key}:${res.data.params[0][key]}`;
        }
        goodsInfo.price = res.data.price;
        goodsInfo.purchase_limit = res.data.purchase_limit;
    },
    {
        immediate: true,
    }
);
// 商品数量减少
function subEvt() {
    if (goods_num.value <= 1) return;
    --goods_num.value;
}
// 商品数量增加
function addEvt() {
    if (goods_num.value < goodsInfo.purchase_limit) {
        goods_num.value++;
    } else {
        showToast(`每人限购${goodsInfo.purchase_limit}件`);
    }
}
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import "../../style/common.less";

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
        margin-bottom: 16vh;
        .address {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 015px 12px;
            background-color: white;
            .left {
                display: flex;
                align-items: center;
                .r {
                    margin-left: 4px;
                    .top {
                        font-size: 0.7rem;
                        font-weight: bold;
                        padding: 0;
                        margin: 0;
                    }
                    .btm {
                        font-size: 0.6rem;
                        span {
                            color: rgb(8, 199, 145);
                        }
                    }
                }
            }
            .right {
            }
        }
        .top {
            margin-top: 10px;
            padding: 15px 12px;
            background-color: white;

            .goods {
                display: flex;
                align-items: center;

                img {
                    width: 3.8rem;
                    height: 3.8rem;
                    border-radius: 4px;
                }

                .right {
                    margin-left: 10px;

                    .name {
                        line-height: 12px;

                        span:nth-child(1) {
                            font-size: 0.5rem;
                            background-color: gainsboro;
                            padding: 2px 3px;
                        }

                        span:nth-child(2) {
                            margin-left: 4px;
                            font-size: 0.7rem;
                            overflow: hidden;
                            -webkit-line-clamp: 2;
                            text-overflow: ellipsis;
                        }
                    }

                    .size {
                        margin-top: 8px;
                        font-size: 0.55rem;
                        color: gray;
                    }

                    .tag {
                        font-size: 0.55rem;
                        color: gray;
                    }

                    .price {
                        margin-top: 4px;
                        font-size: 0.6rem;
                        span:nth-child(2) {
                            font-size: 0.7rem;
                            font-weight: bold;
                        }
                    }
                }
            }

            .buy {
                margin-top: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    span:nth-child(1) {
                        font-size: 0.6rem;
                    }
                    span:nth-child(2) {
                        margin-left: 4px;
                        font-size: 0.55rem;
                    }
                }
                .right {
                    span:nth-child(1),
                    span:nth-child(3) {
                        display: inline-block;
                        width: 1.2rem;
                        height: 1.2rem;
                        border: 1px solid #fb619c;
                        border-radius: 50%;
                        text-align: center;
                        color: #fb619c;
                        cursor: pointer;
                        user-select: none;
                    }
                    span:nth-child(2) {
                        margin: 0 8px;
                        font-size: 0.8rem;
                    }
                    .act {
                        background-color: #e0e0e0;
                        border: none !important;
                        color: grey !important;
                    }
                }
            }
            .youhui {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .l {
                    font-size: 0.6rem;
                }
                .r {
                    font-size: 0.6rem;
                    font-weight: bold;
                    margin-top: 20px;
                    span {
                        margin-right: 4px;
                    }
                }
            }
        }
        .pay_style {
            margin-top: 10px;
            padding: 15px 12px;
            background-color: white;
            .title {
                span {
                    font-size: 0.65rem;
                }
            }
            .style {
                .item {
                    padding-left: 15px;
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    img {
                        width: 1.2rem;
                        height: 1.2rem;
                        margin-left: 15px;
                    }
                    span {
                        margin-left: 10px;
                        font-size: 0.6rem;
                    }
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
        padding: 16px 12px;
        padding-bottom: 24px;

        .top {
            display: flex;
            align-items: center;

            span {
                font-size: 0.55rem;
            }

            span:nth-child(3) {
                color: #fb619c;
            }
        }

        .btm {
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
                color: #fb619c;
                font-size: 0.65rem;
                font-weight: bold;

                span:nth-child(2) {
                    font-size: 0.9rem;
                }
            }

            button {
                background-color: #fc3a84;
                border: none;
                color: white;
                font-size: 0.6rem;
                font-weight: bold;
                padding: 6px 20px;
                border-radius: 16px;
            }
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

/** 尾部 */
::v-deep(.van-checkbox__icon) {
    font-size: 0.6rem;
    margin-right: 5px;
}

/** 弹出层 */
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
</style>