<template>
    <div class="detail-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar
                    left-arrow
                    @click-left="router.go(-1)"
                >
                    <template #title>
                        <div class="nav">
                            <a href="#goods">
                                <span
                                    class="maodian act"
                                    ref="btn_goods"
                                    @click="btnGoods()"
                                    >商品</span
                                >
                            </a>
                            <a href="#taolun">
                                <span
                                    class="maodian"
                                    style="margin: 0 20px"
                                    ref="btn_taolun"
                                    @click="btnTaolun()"
                                    >讨论</span
                                >
                            </a>
                            <a href="#detail">
                                <span
                                    class="maodian"
                                    ref="btn_detail"
                                    @click="btnDetail()"
                                    >详情</span
                                >
                            </a>
                        </div>
                    </template>
                    <template #right>
                        <van-icon
                            name="share-o"
                            size="26"
                            color="#8B8B8B"
                            @click="showShare = true"
                        />
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 主体内容 -->
        <main>
            <!-- 商品轮播图 -->
            <div class="banner">
                <van-swipe>
                    <van-swipe-item v-for="(it, i) in goods_img" :key="it">
                        <img :src="it || ''" alt="" @click="preImg(it, i)" />
                    </van-swipe-item>
                    <template #indicator="{ active, total }">
                        <div class="custom-indicator">
                            {{ active + 1 || 0 }}/{{ total }}
                        </div>
                    </template>
                </van-swipe>
            </div>
            <!-- 商品价格 -->
            <div class="price">
                <div class="left">
                    <div class="t">
                        预估到手价￥<span>{{ goods_price }}</span>
                    </div>
                    <s class="b" v-if="goods_old_price">
                        原价￥<span>{{ goods_old_price }}</span>
                    </s>
                </div>
                <div class="right">
                    <span> 售完即止 </span>
                </div>
            </div>
            <!-- 商品名称，排行榜 -->
            <div class="title">
                <div class="top">
                    <div class="left">
                        {{ goods_name }}
                    </div>
                    <div class="right">
                        <van-icon
                            name="like-o"
                            size="20"
                            v-if="!is_collect_goods"
                            @click="collectGoodsEvt()"
                        />
                        <van-icon
                            name="like"
                            size="20"
                            @click="collectGoodsEvt()"
                            v-if="is_collect_goods"
                        />
                        <div class="want">
                            <span>{{ goods_want }}</span
                            >人想要
                        </div>
                    </div>
                </div>
                <hr />
                <div class="btm">
                    <div class="l">
                        <img src="../../image/icon_paihangbang.png" alt="" />
                        <span>{{ goods_desc }}</span>
                    </div>
                    <van-icon name="arrow" color="#B6B6B6" size="16" />
                </div>
            </div>
            <!-- 商品参数,发货，商家，保障等 -->
            <div class="content">
                <!-- 商品参数 -->
                <div class="params" @click="showParams()">
                    <div>
                        <span>参数</span>
                        <div class="con">
                            <div
                                class="item"
                                v-for="it in goods_params_show"
                                :key="it"
                            >
                                <div
                                    class="top"
                                    v-for="(val, key) in it"
                                    :key="val"
                                >
                                    {{ key }}
                                </div>
                                <div
                                    class="btm"
                                    v-for="(val, key) in it"
                                    :key="key"
                                >
                                    {{ val }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <van-icon name="arrow" color="#B6B6B6" size="16" />
                </div>
                <!-- 发货 -->
                <div class="fahuo">
                    <span>发货</span>
                    <span>现货，48小时内发货，部分地区包邮</span>
                    <span></span>
                </div>
                <!-- 商家 -->
                <div class="store">
                    <div class="card">
                        <div class="left">
                            <img :src="store_logo || ''" alt="" />
                            <div class="it">
                                <span>{{ store_name }}</span>
                                <div>
                                    <span>综合评分</span>
                                    <van-rate
                                        v-model="value"
                                        size="10"
                                        gutter="2"
                                        color="#fb619c"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" color="#ffffff" size="10" />
                        </div>
                    </div>
                </div>
                <!-- 保障 -->
                <div class="protect">
                    <hr />
                    <div class="con" @click="showParams2()">
                        <div class="left">
                            <div class="top">
                                <img
                                    src="../../image/icon_protect.png"
                                    alt=""
                                />
                                <span> 支持7天无理由(拆封后不支持) </span>
                            </div>
                            <div class="btm">
                                <van-icon
                                    name="info-o"
                                    color="#999"
                                    size="12"
                                />
                                <span> 商品及售后由商家提供 </span>
                            </div>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" color="#B6B6B6" size="16" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 用户晒图评论 -->
            <div class="remark" id="taolun">
                <div class="top">
                    <div class="left">
                        <span>晒图/讨论</span>
                        <span>{{ remarkNum }}</span
                        >条
                    </div>
                    <div class="right" @click="showReleaseRemark = true">
                        <span>发精评</span>
                        <span>+</span>
                    </div>
                </div>
                <div class="center">
                    <div class="left">
                        <img :src="'/apis' + remarkImageArr[0] || ''" alt="" />
                    </div>
                    <div class="right">
                        <div v-for="it in remarkImageArr.slice(1, 5)" :key="it">
                            <img :src="'/apis' + it || ''" alt="" />
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <span
                        @click="
                            router.push({
                                path: '/remark',
                                query: { goods_id: goodsId },
                            })
                        "
                        >查看全部讨论</span
                    >
                </div>
            </div>
            <!-- 商品详情 -->
            <div class="goods_detail" id="detail">
                <p>商品详情</p>
                <div class="detail">
                    <img
                        :src="it || ''"
                        alt=""
                        v-for="(it, index) in goods_detail"
                        :key="it"
                        @click="detailImgEvt(it, index)"
                    />
                </div>
            </div>
        </main>
        <!-- 底部按钮 -->
        <footer>
            <div @click="toServiceEvt()">
                <van-icon name="service-o" size="24" color="#717171" />
            </div>
            <div @click="router.push('/cart')">
                <van-icon name="cart-o" size="24" color="#717171" />
                <div>
                    <span>{{ cart_goods_num }}</span>
                </div>
            </div>
            <div @click="addCartEvt()">
                <van-button color="#7232dd" plain>加入购物车</van-button>
            </div>
            <div>
                <van-button
                    color="linear-gradient(to right, #fb7299, #e94b74)"
                    @click="
                        router.push({
                            path: '/pay',
                            query: {
                                goods_id: goodsInfo._id,
                                num: 1,
                                store_id: storeInfo._id,
                            },
                        })
                    "
                >
                    立即购买
                </van-button>
            </div>
        </footer>
        <!-- 弹出层--商品参数 -->
        <div class="pop1">
            <van-popup
                v-model:show="showBottom"
                position="bottom"
                :style="{ height: '80%' }"
            >
                <div class="head">
                    <div></div>
                    <div>详细参数</div>
                    <van-icon name="cross" color="#B6B6B6" size="20" />
                </div>
                <div class="main">
                    <div class="item" v-for="it in goods_params" :key="it">
                        <div class="name" v-for="(val, key) in it" :key="key">
                            {{ key }}
                        </div>
                        <div class="value" v-for="(val, key) in it" :key="key">
                            {{ val }}
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
        <!-- 弹出层--商品保障 -->
        <div class="pop2">
            <van-popup
                v-model:show="showBottom2"
                position="bottom"
                :style="{ height: '40%' }"
            >
                <div class="head">
                    <div></div>
                    <div></div>
                    <van-icon name="cross" color="#B6B6B6" size="20" />
                </div>
                <div class="main">
                    <p>此商品由商家提供发货、售后及开票服务。</p>
                    <p>
                        <van-icon name="passed" color="#fb619c" />
                        <span class="bold">关于运费</span>
                    </p>
                    <p>
                        单笔订单中可合并发货的商品实付总金额（含定金+尾款）满足包邮门槛即可包邮，包邮门槛会根据收货地址有所差异，具体运费以结算页为准。定金预售的商品运费将在补款发货时发生。
                    </p>
                    <p>
                        <van-icon name="passed" color="#fb619c" />
                        <span class="bold">支持7天无理由（拆封后不支持）</span>
                    </p>
                    <p>满足相应条件时，消费者可申请7天无理由退货</p>
                </div>
            </van-popup>
        </div>
        <!-- 弹出层--分享 -->
        <div class="pop3">
            <van-share-sheet v-model:show="showShare" :options="options" />
        </div>
        <!-- 弹出层--图片预览 -->
        <div class="pop4">
            <van-image-preview
                v-model:show="showImg"
                :images="images"
                :close-on-click-image="false"
                :startPosition="index_img"
            >
            </van-image-preview>
        </div>
        <!-- 弹出层--商品详情图片 -->
        <div class="pop5">
            <van-image-preview
                v-model:show="showDetailImg"
                :images="detailImages"
                :close-on-click-image="false"
                :startPosition="index_detail_img"
                :closeOnClickImage="true"
            ></van-image-preview>
        </div>
        <!-- 弹出层--发布评论 -->
        <div class="pop6">
            <van-popup
                v-model:show="showReleaseRemark"
                position="bottom"
                :style="{ height: '52%' }"
            >
                <div class="head">
                    <span>发表评论</span>
                    <van-icon name="cross" color="#B6B6B6" size="20" />
                </div>
                <div class="goods">
                    <img :src="goods_img[0]" alt="" />
                    <div>
                        <span>{{ goods_name }}</span>
                        <p>
                            品牌<span>{{ store_name }}</span>
                        </p>
                    </div>
                </div>
                <div class="input">
                    <van-cell-group inset>
                        <van-field
                            v-model="message"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="1000"
                            placeholder="快与同好分享你的感受及购物心得吧 ~"
                            show-word-limit
                            @input="textChangeEvt()"
                        />
                    </van-cell-group>
                </div>
                <div class="pic">
                    <van-uploader
                        v-model="fileList"
                        multiple
                        max-count="9"
                        upload-text="最多上传9张"
                    />
                    <span v-if="showTxt"
                        >发布40字以上趣味/专业评论 or
                        3张以上相关高清美图，就有机会成为精选✧(≖ ◡ ≖)</span
                    >
                </div>
                <div class="submit">
                    <div class="left">
                        <van-checkbox
                            v-model="check_dongtai"
                            checked-color="#fb619c"
                            >同步到动态</van-checkbox
                        >
                    </div>
                    <div class="right">
                        <span>友善讨论 社区留香</span>
                        <div class="send" @click="sendRemarkEt()" ref="isSend">
                            发送
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script setup>
// ===========================引入============================ //
import { useRouter, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import {
    getGoodsDetailApi,
    queryStoreApi,
    uploadRemarkImgApi,
    addRemarkApi,
    cancelCollectGoodsApi,
    collectGoodsApi,
    queryRemarkApi,
    browsingHistoryApi,
} from "../../apis/home.js";
import { scaleImage } from "../../utils/index.js";
import { useCommonStore } from "../../store";
import { showToast } from "vant";
import { queryUserInfoApi } from "../../apis/userApi.js";
import { cartAddApi, getCartApi } from "../../apis/cart.js";
import { chatAddApi } from "../../apis/chat.js";
// ===========================变量============================ //
const router = useRouter();
const route = useRoute();
const store = useCommonStore();
// 商品id
const goodsId = ref();
// 商品信息
const goodsInfo = ref();
// 商品图片
const goods_img = ref();
// 商品价格
const goods_price = ref();
// 商品原始价格
const goods_old_price = ref();
// 商品参数
const goods_params = ref();
// 商品参数展示
const goods_params_show = ref();
// 商品名称
const goods_name = ref();
// 商品想要
const goods_want = ref();
// 商品描述
const goods_desc = ref();
// 商品详情图片
const goods_detail = ref();
// 商家信息
const storeInfo = ref();
// 商家名称
const store_name = ref();
// 商家logo
const store_logo = ref();
// 弹出--参数
const showBottom = ref();
// 弹出--保障
const showBottom2 = ref();
// 评分
const value = ref(4);
// 头部切换
const btn_goods = ref();
const btn_taolun = ref();
const btn_detail = ref();
// 分享
const showShare = ref(false);
const options = [
    [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
    ],
    [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "小程序码", icon: "weapp-qrcode" },
    ],
];
/** 图片预览 */
// 图片显示
const showImg = ref(false);
// 原始图片数组
const org_images = ref([]);
// 用于显示的图片数组
const images = ref([]);
// 图片的开始索引
const index_img = ref();

/** 商品详情图片预览 */
// 图片显示
const showDetailImg = ref(false);
// 原始详情图片数组
const org_detail_images = ref([]);
// 用于显示的详情图片数组
const detailImages = ref([]);
// 详情图片的开始索引
const index_detail_img = ref();

/** 发布评论 */
// 弹出显示
const showReleaseRemark = ref(false);
// 上传图片数组
const fileList = ref();
// 文本信息
const message = ref();
// 提示文本
const showTxt = computed(() => {
    return fileList.value == null;
});
// 是否同步到动态--待实现
const check_dongtai = ref(true);
// 发送按钮是否可用
const is_sendmsg = ref(false);
// 发送按钮节点
const isSend = ref();
// 评论区图片数组
const remarkImageArr = ref([]);
// 评论条数
const remarkNum = ref();

// 是否收藏该商品
const is_collect_goods = ref(false);

// 购物车信息
const cartInfo = ref();
// 购物车商品数量
const cart_goods_num = ref();
// ===========================方法============================ //
/** 浏览商品记录 */
async function browingHistoryEvt() {
    let res = await browsingHistoryApi(
        route.query.goods_id,
        store.userInfo._id,
        Date.now()
    );
}
browingHistoryEvt();
/** 跳转到客服页面 */
async function toServiceEvt() {
    router.push({
        path: "/service",
        query: { store_id: storeInfo.value.store_id },
    });
    let obj = {
        user_id: store.userInfo._id,
        store_id: storeInfo.value._id,
    };
    let res = await chatAddApi(obj);
}
/** 查询购物车 */
async function queryCartEvt() {
    let res = await getCartApi(store.user_id);
    if (res.code !== 200) return;
    cartInfo.value = res.data;
    let num = 0;
    cartInfo.value.forEach((it) => {
        num += it.goods_num;
    });
    cart_goods_num.value = num;
}
queryCartEvt();
/** 加入购物车 */
async function addCartEvt() {
    let obj = {
        user_id: store.user_id,
        goods_id: goodsInfo.value._id,
        goods_name: goodsInfo.value.name,
        goods_num: 1,
        goods_price: goodsInfo.value.price,
    };
    let res = await cartAddApi(obj);
    if (res.code === 200) {
        showToast("加车成功");
        queryCartEvt();
    }
}
/** 改变评论图片 */
watch(
    () => route.query.goods_id,
    async function () {
        store.goods_id = route.query.goods_id;
        let d2 = await queryRemarkApi();
        if (d2.code === 200) {
            remarkNum.value = d2.remark.length;
            d2.remark.forEach((it) => {
                if (it.content[0].img.length) {
                    for (let i = 0; i < it.content[0].img.length; i++) {
                        remarkImageArr.value.push(it.content[0].img[i].path);
                    }
                }
            });
        }
    },
    {
        immediate: true,
    }
);
// 查询用户信息
async function queryUserInfo() {
    let res = await queryUserInfoApi();
    store.user_id = store.userInfo._id;
    if (res.code === 200) {
        let user_goods_collect = res.data.goods_collect || [];
        is_collect_goods.value = user_goods_collect.some((it) => {
            return it === goodsId.value;
        });
    }
}
queryUserInfo();
// 收藏商品
async function collectGoodsEvt() {
    // 收藏了该商品
    if (is_collect_goods.value) {
        let res = await cancelCollectGoodsApi();
        showToast("已取消收藏");
        is_collect_goods.value = false;
        let d = await getGoodsDetailApi(goodsId.value);
        if (d.code === 200) {
            goods_want.value = d.data.want.length || 0;
        }
    } else {
        let res = await collectGoodsApi();
        showToast("已加入收藏");
        is_collect_goods.value = true;
        let d = await getGoodsDetailApi(goodsId.value);
        if (d.code === 200) {
            goods_want.value = d.data.want.length || 0;
        }
    }
}
// 发送按钮是否可用
function textChangeEvt() {
    if (message.value.trim() !== "" || message.value !== "") {
        isSend.value.classList.add("act");
        is_sendmsg.value = true;
    } else {
        isSend.value.classList.remove("act");
        is_sendmsg.value = false;
    }
}
/** 发布评论 */
async function sendRemarkEt() {
    if (is_sendmsg.value === true) {
        /** 缓存信息 */
        // 缓存用户id
        store.user_id = store.userInfo._id;
        // 缓存商家id
        store.store_id = storeInfo.value.store_id;
        // 缓存商品id
        store.goods_id = goodsId.value;

        // 遍历上传的图片文件并添加到数组里面
        let imgArr = [];
        if (fileList.value) {
            for (let i = 0; i < fileList.value.length; i++) {
                let name = fileList.value[i].file.lastModified;
                let d = await scaleImage(fileList.value[i].file);
                let res = await uploadRemarkImgApi(d, name);
                imgArr.push(res);
            }
        }
        // 新增评论
        addRemarkApi({
            date: Date.now(),
            text: message.value || "",
            img: imgArr || [],
            like: [],
        }).then((d) => {
            showToast("你的评论已发表~");
            message.value = "";
            fileList.value = [];
            showReleaseRemark.value = false;
        });
    } else {
        return;
    }
}

// 图片预览
function preImg(item, index) {
    let tar_arr = [];
    for (let i = index; i < org_images.value.length; i++) {
        tar_arr.push(org_images.value[i]);
    }
    for (let j = 0; j < index; j++) {
        tar_arr.push(org_images.value[j]);
    }
    images.value = JSON.parse(JSON.stringify(tar_arr));
    index_img.value = index;
    showImg.value = true;
}
// 详情图片预览
function detailImgEvt(item, index) {
    let tar_arr = [];
    for (let i = index; i < org_detail_images.value.length; i++) {
        tar_arr.push(org_detail_images.value[i]);
    }
    for (let j = 0; j < index; j++) {
        tar_arr.push(org_detail_images.value[j]);
    }
    detailImages.value = JSON.parse(JSON.stringify(tar_arr));
    index_detail_img.value = index;
    showDetailImg.value = true;
}
// 弹出--参数
function showParams() {
    showBottom.value = true;
}
// 弹出--保障
function showParams2() {
    showBottom2.value = true;
}

/** 获取商品id */
watch(
    () => route.query.goods_id,
    function () {
        goodsId.value = route.query.goods_id;
        getGoodsDetailApi(goodsId.value).then((d) => {
            goodsInfo.value = d.data;
            // 商品图片
            goods_img.value = goodsInfo.value.img || "";
            images.value = goods_img.value;
            org_images.value = goods_img.value;
            // 商品价格
            goods_price.value = goodsInfo.value.price;
            // 商品原价
            if (goodsInfo.value.old_price === "暂无") {
                goods_old_price.value = "";
            } else {
                goods_old_price.value = goodsInfo.value.old_price;
            }
            // 商品参数
            goods_params.value = goodsInfo.value.params;
            goods_params_show.value = JSON.parse(
                JSON.stringify(goods_params.value.slice(0, 4))
            );
            // 商品名称
            goods_name.value = goodsInfo.value.name;
            // 商品想要
            goods_want.value = goodsInfo.value.want.length || 0;
            // 商品描述
            goods_desc.value = goodsInfo.value.the_charts_des;
            // 商品详情
            goods_detail.value = goodsInfo.value.details;
            org_detail_images.value = goods_detail.value;
            detailImages.value = goods_detail.value;
            // 商家信息
            queryStoreApi(goodsInfo.value.store_id).then((d1) => {
                if (d1.code === 200) {
                    storeInfo.value = d1.data;
                    // 商家名称
                    store_name.value = storeInfo.value.store_name;
                    // 商家logo
                    store_logo.value = storeInfo.value.store_logo;

                    /** 缓存信息 */
                    // 缓存用户id
                    store.user_id = store.userInfo._id;
                    // 缓存商家id
                    store.store_id = storeInfo.value.store_id;
                    // 缓存商品id
                    store.goods_id = goodsId.value;
                }
            });
        });
        // 查询评论信息
    },
    {
        immediate: true,
    }
);
// 头部样式切换
function btnGoods() {
    btn_goods.value.classList.remove("act");
    btn_taolun.value.classList.remove("act");
    btn_detail.value.classList.remove("act");
    btn_goods.value.classList.add("act");
}
function btnTaolun() {
    btn_goods.value.classList.remove("act");
    btn_taolun.value.classList.remove("act");
    btn_detail.value.classList.remove("act");
    btn_taolun.value.classList.add("act");
}
function btnDetail() {
    btn_goods.value.classList.remove("act");
    btn_taolun.value.classList.remove("act");
    btn_detail.value.classList.remove("act");
    btn_detail.value.classList.add("act");
}
// 测试
</script>
<style scoped lang="less">
@import "../../style/common.less";

.detail-box {
    height: 100vh;
    background-color: white;
    background-color: #e7e7e7;
    overflow: scroll;

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;

        .van-sticky {
            position: fixed;
        }

        .maodian {
            font-size: 0.8rem;
            color: #b6b6b6;
            font-weight: 400;
        }

        .act {
            font-weight: 600;
            color: black;
            text-decoration: underline #ff5687;
        }
    }

    /** 主体内容区域 */
    main {
        width: 100vw;
        overflow-y: scroll;

        /** 商品背景图 */
        .banner {
            width: 100vw;
            height: 48vh;

            .van-swipe {
                width: 100vw;
                height: 100%;

                .van-swipe-item {
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .custom-indicator {
                    position: absolute;
                    right: 20px;
                    bottom: 15px;
                    font-size: 0.7rem;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    padding: 1px 10px;
                    color: #fff;
                }
            }
        }

        /** 商品价格 */
        .price {
            width: 100vw;
            height: 60px;
            background-image: url(../../image/price_bg.png);
            background-size: 40vw 60px;
            background-repeat: no-repeat;
            background-position: 50vw center;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;

            .left {
                font-size: 14px;
                color: #ff5687;

                .t {
                    span:nth-child(1) {
                        font-size: 22px;
                        font-weight: bold;
                    }
                }

                .b {
                    color: black;
                }
            }

            .right {
                font-size: 14px;
                font-weight: 500;
                color: #ff5687;
            }
        }

        /** 商品名称 */
        .title {
            padding: 8px 12px 12px;
            background-color: white;
            border-radius: 0 0 12px 12px;

            .top {
                width: 100%;
                height: 53px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    font-size: 16px;
                    color: #212121;
                    font-weight: bold;
                    width: 75vw;
                    /** 换行省略 */
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                }

                .right {
                    text-align: center;

                    .van-icon-like-o:before {
                        font-weight: bold;
                    }

                    .van-icon-like:before {
                        font-weight: bold;
                        color: #fb619c;
                    }

                    .want {
                        font-size: 12px;
                        // color: #212121;
                    }
                }
            }

            hr {
                color: #e7e7e7;
                margin: 10px 0;
            }

            .btm {
                width: 100%;
                height: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .l {
                    display: flex;
                    align-content: center;

                    img {
                        width: 70px;
                        height: 20px;
                        display: inline-block;
                        vertical-align: top;
                    }

                    span {
                        font-size: 12px;
                        font-weight: 500px;
                        color: #000;
                        margin-left: 10px;
                        margin-top: 2px;
                    }
                }
            }
        }

        /** 商品参数，发货，商家 */
        .content {
            padding: 10px 0;
            background-color: white;
            width: 100vw;
            border-radius: 12px;
            margin-top: 12px;

            /** 参数 */
            .params {
                display: flex;
                padding: 10px 12px;
                font-size: 0.6rem;
                color: #999;
                align-items: center;
                justify-content: space-between;

                div {
                    display: flex;
                    align-items: center;

                    span {
                        display: inline-block;
                        width: 40px;
                        margin-right: 2px;
                    }

                    .con {
                        display: flex;
                        flex: 1;
                        justify-content: center;

                        .item {
                            height: 36px;
                            text-align: center;
                            border-right: 1px solid #e7e7e7;
                            padding: 0 8px;
                            max-width: 96px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .btm {
                                color: #212121;
                            }
                        }
                    }
                }
            }

            /** 发货 */
            .fahuo {
                padding: 10px 12px;
                height: 40px;
                margin-right: 2px;

                span:nth-child(1) {
                    line-height: 40px;
                    display: inline-block;
                    width: 40px;
                    font-size: 0.6rem;
                    color: #999;
                }

                span:nth-child(2) {
                    line-height: 40px;
                    font-size: 14px;
                    color: #212121;
                }
            }

            /** 商家 */
            .store {
                margin-top: 10px;
                padding: 10px 12px;

                .card {
                    align-items: center;
                    width: 48vw;
                    height: 40px;
                    border: 1px solid #e7e7e7;
                    border-radius: 6px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 4px;

                    .left {
                        display: flex;
                        align-items: center;

                        img {
                            width: 26px;
                            height: 26px;
                            border-radius: 4px;
                        }

                        .it {
                            margin-left: 8px;

                            span {
                                display: block;
                                font-size: 12px;
                                color: #212121;
                                margin-top: 5px;
                            }

                            div {
                                display: flex;

                                span {
                                    font-family: PingFang SC;
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 10px;
                                    color: #797f87;
                                    margin-top: 0;
                                }

                                .van-rate {
                                    margin-left: 2px;
                                    margin-top: 2px;
                                }
                            }
                        }
                    }

                    .right {
                        width: 16px;
                        height: 16px;
                        background-color: #e7e7e7;
                        border-radius: 8px;
                        position: relative;

                        .van-icon {
                            position: absolute;
                            top: 4px;
                            left: 4px;
                        }
                    }
                }
            }

            /** 保障 */
            .protect {
                padding: 0 12px;

                hr {
                    color: #e7e7e7;
                }

                .con {
                    padding: 10px 0 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        .top {
                            display: flex;

                            img {
                                width: 98px;
                                height: 14px;
                                display: block;
                            }

                            span {
                                vertical-align: middle;
                                font-size: 12px;
                                color: #212121;
                                margin-left: 20px;
                            }
                        }

                        .btm {
                            span {
                                font-size: 12px;
                                color: #999;
                            }
                        }
                    }
                }
            }
        }

        /** 晒图/评论 */
        .remark {
            background-color: white;
            border-radius: 12px;
            margin-top: 15px;
            padding: 0 12px;

            .top {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                align-items: center;

                .left {
                    font-size: 12px;
                    color: #999;

                    span:nth-child(1) {
                        font-size: 14px;
                        color: #111;
                        font-weight: 700;
                    }

                    span:nth-child(2) {
                        font-size: 12px;
                        color: #999;
                        margin-left: 10px;
                    }
                }

                .right {
                    span:nth-child(1) {
                        font-size: 13px;
                        font-style: inherit;
                        color: orange;
                    }

                    span:nth-child(2) {
                        font-size: 12px;
                        color: #bbb;
                        margin-left: 6px;
                    }
                }
            }

            .center {
                padding: 10px 0;
                display: flex;
                justify-content: space-between;

                .left {
                    width: 48%;

                    img {
                        width: 100%;
                        border-radius: 10px;
                    }
                }

                .right {
                    display: flex;
                    flex-wrap: wrap;
                    align-content: space-between;
                    width: 48%;

                    div {
                        width: 48%;
                        position: relative;

                        img {
                            flex-shrink: 0;
                            display: inline-block;
                            width: 100%;
                            border-radius: 10px;
                        }

                        .pic {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                            background: rgba(0, 0, 0, 0.3);
                            position: absolute;
                            left: 0;
                            top: 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            p {
                                margin-top: 4px;
                                font-size: 14px;
                                color: white;
                            }
                        }
                    }
                }
            }

            .btn {
                text-align: center;
                padding: 10px 0;

                span {
                    margin: 0 auto;
                    display: block;
                    font-size: 14px;
                    color: #717171;
                    border: 1px solid #b6b6b6;
                    width: 28vw;
                    padding: 2px 4px;
                    border-radius: 20px;
                }
            }
        }

        /** 商品详情 */
        .goods_detail {
            background-color: white;
            border-radius: 12px;
            margin-top: 15px;
            margin-bottom: 60px;
            padding: 0 0 16px 0;

            p {
                padding: 16px 0 12px 12px;
                font-size: 14px;
                font-weight: 700;
                color: #212121;
            }

            .detail {
                padding: 0 12px;

                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }

    /** 尾部按钮 */
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 60px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;

        div:nth-child(2) {
            position: relative;

            div {
                position: absolute;
                width: 25px;
                height: 15px;
                border-radius: 10px;
                background-color: #fb619c;
                text-align: center;
                line-height: 10px;
                left: 10px;
                top: -8px;

                span {
                    font-size: 12px;
                    color: white;
                }
            }
        }

        div:nth-child(3) {
            .van-button--normal {
                width: 30vw;
                height: 35px;
                border: 1px solid #fb619c !important;
                border-radius: 40px;
                color: #fb619c !important;
            }
        }

        div:nth-child(4) {
            .van-button--normal {
                width: 30vw;
                height: 35px;
                border-radius: 40px;
            }
        }
    }
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 1rem;
    color: #8b8b8b;
}

.van-nav-bar__title {
    font-size: 0.9rem;
    font-weight: normal;
}

/** 弹出层--参数 */
.pop1 {
    .van-popup--bottom {
        width: 100vw;
        border-radius: 12px 12px 0 0;
        padding: 18px 12px 0px 12px;
        overflow-y: scroll;

        .head {
            display: flex;
            justify-content: space-between;

            div:nth-child(2) {
                font-size: 16px;
                color: #212121;
                font-weight: bolder;
            }
        }

        .main {
            margin-top: 40px;

            .item {
                display: flex;
                margin-bottom: 20px;

                .name {
                    width: 62px;
                    margin-right: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    color: #999;
                }

                .value {
                    flex: 1;
                    font-size: 14px;
                    color: #212121;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}

/** 弹出--保障 */
.pop2 {
    .van-popup--bottom[data-v-23c47698] {
        width: 100vw;
        border-radius: 8px 8px 0 0;
        padding: 18px 12px 0px 12px;

        .head {
            display: flex;
            justify-content: space-between;
        }

        .main {
            font-size: 12px;
            color: #212121;

            .bold {
                font-size: 14px;
                font-weight: 500;
            }

            p:nth-child(2),
            p:nth-child(4) {
                margin-top: 24px;

                span {
                    margin-left: 6px;
                }
            }

            p:nth-child(3),
            p:nth-child(5) {
                margin-top: 10px;
            }
        }
    }
}

/** 发布评论 */
.pop6 {
    ::v-deep(.van-popup) {
        width: 100vw;
        border-radius: 12px 12px 0 0;
        padding: 0 12px;

        .head {
            margin-top: 10px;
            padding: 10px 0;
            display: flex;
            justify-content: space-between;

            span {
                font-size: 0.85rem;
            }
        }

        .goods {
            margin-top: 5px;
            display: flex;
            background-color: rgba(230, 226, 226, 0.964);
            border-radius: 8px;

            img {
                border-radius: 8px 0 0 8px;
                width: 2.4rem;
                height: 2.4rem;
                border-radius: 0.2rem;
            }

            div {
                margin-left: 8px;
                padding: 2px 6px 2px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 0.7rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                span {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                p {
                    color: #999;

                    span {
                        margin-left: 10px;
                    }
                }
            }
        }

        .input {
            margin: 15px 0;

            .van-cell-group--inset {
                margin: 0;

                .van-field {
                    padding: 0;
                }
            }
        }

        .pic {
            display: flex;

            .van-uploader {
                // overflow-x: scroll;
                flex: 1;
                display: flex;
                // width: 4.2rem;
                // height: 4.2rem;

                .van-uploader__wrapper {
                    .van-uploader__preview {
                        .van-image van-uploader__preview-image {
                            img {
                                width: 4.2rem;
                                height: 4.2rem;
                            }
                        }
                    }
                }
            }

            span {
                // position: absolute;
                margin-top: 4px;
                margin-left: 10px;
                font-size: 0.64rem;
                color: #bbb;
            }
        }

        .submit {
            padding: 15px 0;

            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                .van-checkbox__icon {
                    border-radius: 0;
                }

                span {
                    color: #696868;
                    font-size: 0.6rem;
                }
            }

            .right {
                display: flex;
                align-items: center;

                span {
                    font-size: 0.8rem;
                    color: #bbb;
                }

                div {
                    color: white;
                    background-color: rgba(251, 97, 156, 0.5);
                    margin-left: 15px;
                    width: 20vw;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-size: 0.8rem;
                    border-radius: 15px;

                    &.act {
                        background-color: rgba(251, 97, 156);
                    }
                }
            }
        }
    }
}
</style>