<template>
    <div class="service-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <div class="nav">
                            <span>商家</span>
                            <span>{{ store_name }}</span>
                        </div>
                    </template>
                    <template #right>
                        <van-icon name="setting-o" size=".9rem" color="#8B8B8B"
                            @click="router.push({ path: '/service/setting', query: { store_id: storeInfo._id } })" />
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <div class="msg">
                <div class="item" v-for="(item, index) in chatInfo.content" :key="item">
                    <div class="center">
                        <!-- <span>2023年08月27日 14:34</span> -->
                        <span>{{ formatTimestampToDate(chatInfo.content[index].date) }}</span>
                    </div>
                    <div class="left" v-if="item.send_user_id !== store.userInfo._id">
                        <div class="l">
                            <img :src="store_logo" alt="">
                        </div>
                        <div class="r">
                            <span>{{ store_name + '客服' }}</span>
                            <div class="con">
                                <span>{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right" v-if="item.send_user_id === store.userInfo._id">
                        <div class="l">
                            <div class="con">
                                <span>{{ item.text }}</span>
                            </div>
                            <img :src="'/apis' + store.userInfo.photo" alt="">
                        </div>
                    </div>
                </div>
                <!-- ------------- -->
            </div>
        </main>
        <!-- 底部 -->
        <van-action-bar>
            <div class="action_bar">
                <div class="top">
                    <van-icon class="act1" name="photo-o" size="1rem" />
                    <van-icon class="act1" name="add-o" size="1rem" />
                    <van-field v-model="value" placeholder="请输入用户名" />
                    <button :class="[value !== '' && 'act2']" @click="sendEvt()">发送</button>
                </div>
            </div>
            <div class="pic">

            </div>
            <div class="order">

            </div>
        </van-action-bar>

    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router";
import { queryStoreApi } from "../../apis/home";
import { chatAddApi, chatQueryApi } from "../../apis/chat";
import { useCommonStore } from "../../store";
import { formatTimestampToDate } from '../../utils/index'
// ===========================变量============================ //
const router = useRouter()
const route = useRoute()
const store = useCommonStore()
// 文本框的值
const value = ref('')
// 商家信息
const storeInfo = ref({})
// 商家名称
const store_name = ref('')
// 商家logo
const store_logo = ref('')
// 聊天消息
const chatInfo = ref({})
// ===========================方法============================ //
/** 发送消息 */
async function sendEvt() {
    if (value.value === '') return
    let obj = {
        user_id: store.userInfo._id,
        store_id: storeInfo.value._id,
        date: Date.now(),
        text: value.value,
        send_user_id: store.userInfo._id
    }
    let res = await chatAddApi(obj)
    queryChatInfoEvt()
    value.value=''
}
/** 查询商家信息 */
watch(
    () => route.query.store_id,
    function () {
        queryStoreApi(route.query.store_id).then(d => {
            if (d.code !== 200) return
            // 商家信息
            storeInfo.value = d.data
            // 商家名称
            store_name.value = storeInfo.value.store_name
            // 商家logo
            store_logo.value = storeInfo.value.store_logo
            queryChatInfoEvt()
        })
    },
    {
        immediate: true
    }
)
/** 查询聊天消息 */
function queryChatInfoEvt() {
    chatQueryApi(store.userInfo._id, storeInfo.value._id).then(d1 => {
        if (d1.code === 200) {
            chatInfo.value = d1.data
        }
    })
}


</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.service-box {

    .rel();
    background-color: #fbf6f6;

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

        .van-sticky {
            position: fixed;
        }
    }

    main {
        width: 100vw;
        overflow: scroll;
        padding: 6px 12px 0;
        margin-bottom: 60px;
        // margin-bottom: 300px;

        .msg {
            .item {
                .center {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 8px;

                    span {
                        font-size: .55rem;
                        color: #a3a1a1;
                    }
                }

                .left {
                    display: flex;
                    margin-bottom: 8px;

                    .l {
                        img {
                            width: 1.5rem;
                            height: 1.5rem;
                            border-radius: 50%;
                        }
                    }

                    .r {
                        color: #212121;
                        margin-left: 8px;
                        display: flex;
                        flex-direction: column;

                        span {
                            font-size: .6rem;
                        }

                        .con {
                            span {
                                margin-top: 4px;
                                display: inline-block;
                                font-size: .7rem;
                                background-color: white;
                                border-radius: 8px;
                                padding: 8px 8px;
                                max-width: 78vw;
                            }
                        }

                    }
                }

                .center {}

                .right {
                    margin-bottom: 8px;

                    .l {
                        display: flex;
                        justify-content: flex-end;

                        .con {
                            span {
                                color: rgb(83, 129, 197);
                                display: inline-block;
                                font-size: .7rem;
                                background-color: rgb(185, 236, 246);
                                border-radius: 8px;
                                padding: 8px 8px;
                                max-width: 78vw;
                            }
                        }

                        img {
                            margin-left: 8px;
                            width: 1.5rem;
                            height: 1.5rem;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: .9rem;
    color: #8B8B8B;
}

::v-deep(.van-nav-bar__title) {
    font-size: .7rem;
    font-weight: normal;
    margin-left: 58px !important;

    span:nth-child(1) {
        color: #8B8B8B;
        font-size: .55rem;
        border: 1px solid #8B8B8B;
        padding: 1px 2px;
        margin-right: 4px;
        border-radius: 3px;
        text-align: center;
    }
}

/** 底部 */
::v-deep(.van-action-bar) {

    display: flex;
    flex-direction: column;

    // height: 300px;
    .action_bar {
        width: 100vw;
        height: 50px;
        display: block;

        .top {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;

            .van-field {
                width: 60vw;
                padding: 0;
                background-color: #f3f1f1;
                border-radius: 20px;

                .van-field__value {
                    margin: 0;
                    padding: 0;
                    height: 28px;
                    padding: 0 0 0 10px;
                    line-height: 28px;
                    font-size: .7rem;
                }
            }

            button {
                font-size: .7rem;
                border: none;
                color: #a3a1a1;
                background-color: #dbd8d8;
                padding: 4px 8px;
                text-align: center;
                border-radius: 20px;
            }

            .act1 {
                color: #ff5687;
            }

            .act2 {
                color: white;
                background-color: #ff5687;
            }
        }
    }

    .pic {
        // width: 100vw;
        // height: 250px;
        // background-color: red;
    }
}
</style>