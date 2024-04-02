<template>
    <div class="conts-box">
        <!-- 头部导航 -->
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar :title="pageName" left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <span style="font-size: .7rem;font-weight: normal;">会员购中心</span>
                    </template>
                    <template #right>
                        <van-icon name="bag-o" size="26" color="black" @click="showShare = true" />
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <!-- 用户头像名称 -->
            <div class="head">
                <div class="left">
                    <img :src="[('/apis' + store.userInfo.photo) || 'https://huiwan-resource.oss-cn-beijing.aliyuncs.com/appimg/%E9%A1%B9%E7%9B%AE%E5%9B%BE%E7%89%87/OIP-C.jpg']"
                        alt="">
                    <span>{{ store.userInfo.username }}</span>
                </div>
                <div class="right">
                    <van-icon name="setting-o" />
                </div>
            </div>
            <!-- 订单 -->
            <div class="order">
                <div class="top">
                    <span>我的订单</span>
                    <p>
                        <span>查看全部订单</span>
                        <van-icon name="arrow" style="font-size: .5rem;" />
                    </p>
                </div>
                <div class="btm">
                    <div class="item">
                        <van-icon name="pending-payment" badge="9" />
                        <span>待付款</span>
                    </div>
                    <div class="item">
                        <van-icon name="send-gift-o" />
                        <span>待发货</span>
                    </div>
                    <div class="item">
                        <van-icon name="logistics" />
                        <span>待收货</span>
                    </div>
                    <div class="item">
                        <van-icon name="chat-o" />
                        <span>待评价</span>
                    </div>
                    <div class="item">
                        <van-icon name="cash-back-record-o" />
                        <span>退款/售后</span>
                    </div>
                </div>
            </div>
            <!-- 收藏和浏览记录 -->
            <div class="collect">
                <!-- 左 -->
                <div class="left">
                    <div class="top">
                        <van-icon name="star-o" style="font-size: .6rem;font-weight: bold;" />
                        <span>我的收藏</span>
                        <span>(3)</span>
                    </div>
                    <div class="btm">
                        <div>
                            <img v-for="item in goods_img.slice(0, 2)" :key="item" :src="item" alt="">

                        </div>
                    </div>
                </div>
                <div class="center"></div>
                <!-- 右 -->
                <div class="right">
                    <div class="top">
                        <van-icon name="clock-o" style="font-size: .6rem;font-weight: bold;" />
                        <span>商品浏览</span>
                    </div>
                    <div class="btm">
                        <div>
                            <img v-for="item in browsing_img.slice(0, 2)" :key="item" :src="item" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 常用功能 -->
            <div class="common">
                <div class="title">
                    <span>常用功能</span>
                </div>
                <div class="con">
                    <div class="item">
                        <van-icon name="coupon-o" />
                        <span>我的课程</span>
                    </div>
                    <div class="item">
                        <van-icon name="calendar-o" />
                        <span>福利日历</span>
                    </div>
                    <div class="item" @click="router.push('/address')">
                        <van-icon name="location-o" />
                        <span>地址管理</span>
                    </div>
                    <div class="item">
                        <van-icon name="newspaper-o" />
                        <span>购买人信息</span>
                    </div>
                    <div class="item">
                        <van-icon name="description-o" />
                        <span>电子票</span>
                    </div>
                    <div class="item">
                        <van-icon name="edit" />
                        <span>建议反馈</span>
                    </div>
                    <div class="item">
                        <van-icon name="service-o" />
                        <span>在线客服</span>
                    </div>
                    <div class="item">
                        <van-icon name="point-gift-o" />
                        <span>盲盒</span>
                    </div>
                    <div class="item">
                        <van-icon name="gift-o" />
                        <span>福利站</span>
                    </div>
                    <div class="item">
                        <van-icon name="bulb-o" />
                        <span>原型大赛</span>
                    </div>
                    <div class="item">
                        <van-icon name="home-o" />
                        <span>工房集市</span>
                    </div>
                    <div class="item">
                        <van-icon name="orders-o" />
                        <span>服务单</span>
                    </div>
                    <div class="item">
                        <van-icon name="medal-o" />
                        <span>特权勋章</span>
                    </div>
                    <div class="item">
                        <van-icon name="diamond-o" />
                        <span>异想空间</span>
                    </div>
                    <div class="item">
                        <van-icon name="bar-chart-o" />
                        <span>平台资源</span>
                    </div>
                    <div class="item">
                        <van-icon name="cluster-o" />
                        <span>装机助手</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref } from "vue"
import { useRouter } from "vue-router";
import { getGoodsDetailApi } from "../../apis/home";
import {  queryUserInfoApi2 } from "../../apis/userApi";
import { useCommonStore } from "../../store";
// ===========================变量============================ //
const router = useRouter()
const store = useCommonStore()
// 我的收藏--商品图片数组
const goods_img = ref([])
// 浏览记录--商品图片数组
const browsing_img = ref([])

// ===========================方法============================ //


/** 我的收藏 */
function myCollect() {
    if (!store.userInfo.goods_collect) return
    store.userInfo.goods_collect.forEach(async item => {
        let res = await getGoodsDetailApi(item)
        if (res.code !== 200) return
        goods_img.value.push(res.data.img[0])
        goods_img.value.reverse()
    })
}
myCollect()
/** 浏览记录 */
function browsingHistoryEvt() {
    queryUserInfoEvt()
    if (!store.userInfo.browsing_history) return
    store.userInfo.browsing_history.sort((a,b)=>b.date-a.date).forEach(async item => {
        let res = await getGoodsDetailApi(item.goods_id)
        if (res.code !== 200) return
        browsing_img.value.push(res.data.img[0])
    })
}
browsingHistoryEvt()
/** 查询用户信息重新存储store */
async function queryUserInfoEvt(){
    let res=await queryUserInfoApi2(store.userInfo._id)
    if(res.code!==200) return
    store.userInfo=res.data
}
queryUserInfoEvt()
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.conts-box {
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

        /** 头像和昵称 */
        .head {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: white;

            .left {
                display: flex;
                align-items: center;

                img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                }

                span {
                    margin-left: 10px;
                    font-size: .65rem;
                    font-weight: bold;

                }
            }

            .right {
                display: flex;
                align-items: center;
            }
        }

        /** 订单 */
        .order {
            background-color: white;
            margin-top: 6px;
            padding: 0 12px;
            padding-bottom: 15px;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;

                span {
                    font-size: .6rem;
                    font-weight: bold;
                }

                p {
                    display: flex;
                    align-items: center;

                    span {
                        font-size: .5rem;
                        font-weight: normal;
                        margin-right: 2px;
                    }
                }
            }

            .btm {
                padding: 0 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    span {
                        margin-top: 4px;
                        font-size: .6rem;
                    }
                }
            }
        }

        /** 收藏和浏览记录 */
        .collect {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            margin-top: 6px;
            padding: 10px 12px;

            .left,
            .right {
                // flex: 1;
                width: 45%;

                .top {
                    display: flex;
                    align-items: center;

                    span:nth-child(2) {
                        font-size: .6rem;
                        font-weight: bold;
                        margin-left: 4px;
                    }

                    span:nth-child(3) {
                        font-size: .6rem;
                        margin-left: 3px;
                    }
                }

                .btm {
                    margin-top: 10px;

                    div {
                        width: 3.6rem;
                        height: 3.6rem;
                        display: flex;
                    }

                    img {

                        width: 3.6rem;
                        height: 3.6rem;
                        border-radius: 4px;
                    }

                    img:nth-child(2) {
                        margin-left: 8px;
                    }
                }
            }

            .center {
                width: 1px;
                height: 3rem;
                background-color: rgb(243, 241, 241);
                margin-top: 1rem;
            }
        }

        /** 常用功能 */
        .common {
            background-color: white;
            margin-top: 6px;
            padding: 10px 12px 18px;

            .title {
                span {
                    font-size: .6rem;
                    font-weight: bold;
                }
            }

            .con {
                display: flex;
                flex-wrap: wrap;

                .item {
                    margin-top: 15px;
                    width: 25%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .van-icon {
                        font-size: 1.2rem;
                    }

                    span {
                        margin-top: 2px;
                        font-size: .6rem;
                    }
                }
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

/** 数字提示 */
::v-deep(.van-badge--top-right) {
    background-color: white;
    border: 1px solid #fb619c;
    color: #fb619c;
    font-weight: normal;
}
</style>