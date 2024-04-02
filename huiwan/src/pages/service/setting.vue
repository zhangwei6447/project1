<template>
    <div class="service-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar :title="pageName" left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <div class="nav">
                            <span>资料设置</span>
                        </div>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <!--  -->
            <div class="search item">
                <span>搜索聊天记录</span>
                <van-icon name="arrow" />
            </div>
            <!--  -->
            <div class="con">
                <div>
                    <span>置顶聊天</span>
                    <van-switch v-model="checked1" size=".65rem" />
                </div>
                <div>
                    <span>消息免打扰</span>
                    <van-switch v-model="checked2" size=".65rem" />
                </div>
                <div>
                    <span>加入黑名单</span>
                    <van-switch v-model="checked3" size=".65rem" />
                </div>
                <div>
                    <span>消息接收设置</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <!--  -->
            <div class="item" @click="clearEvt()">
                <span>清空聊天记录</span>
                <van-icon name="arrow" />
            </div>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showConfirmDialog, showToast } from 'vant';
import { chatClearApi } from "../../apis/chat";
import { useCommonStore } from "../../store";
// ===========================变量============================ //
const store = useCommonStore()
const router = useRouter()
const route = useRoute()
const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
// ===========================方法============================ //
/** 清空聊天记录 */
function clearEvt() {
    showConfirmDialog({
        title: '确定清除消息吗?',
        message: '清除后将无法回复哦',
    }).then(() => {
        chatClearApi(store.userInfo._id, route.query.store_id).then(d => {
            showToast('清除聊天成功')
        })
    }).catch(() => { })
}

</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.service-box {

    .rel();
    background-color: #f5f1f153;

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.078);

        .van-sticky {
            position: fixed;
        }
    }

    main {
        width: 100vw;
        overflow: scroll;
        margin-bottom: 60px;
        font-size: .65rem;

        .item {
            background-color: white;
            margin-top: 10px;
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .con {
            background-color: white;
            margin-top: 10px;
            padding: 0px 12px;
            overflow: hidden;


        }

        .con>div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // margin: 5px 0 ;
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
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


}
</style>