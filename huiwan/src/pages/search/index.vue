<template>
    <div class="search-box">
        <!-- 头部 -->
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar :title="pageName" left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <div class="nav" style="width: 100%;background-color: red;">
                            <van-search v-model="value" placeholder="商品、品牌、IP名" />
                        </div>
                    </template>
                    <template #right>
                        <span style="font-size: .65rem;" @click="searchEvt()">搜索</span>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容 -->
        <main>
            <div class="top">
                <span>搜索历史</span>
                <span @click="clearEvt()">清空</span>
            </div>
            <div class="btm">
                <span v-for="item in searchHistory" :key="item"
                    @click="router.push({ path: '/searchResult', query: { search_value: item.txt } })">{{ item.txt
                    }}</span>
            </div>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //

import { ref } from "vue";
import { useRouter } from "vue-router";
import { addSearchHistoryApi, deleteAllSearchHistoryApi, getSearchHistoryApi } from "../../apis/search";

// ===========================变量============================ //
const router = useRouter()
// 搜索框的值
const value = ref()
// 搜索历史
const searchHistory = ref()
// ===========================方法============================ //
/** 清楚搜索历史 */
async function clearEvt() {
    let res = await deleteAllSearchHistoryApi()
    console.log(res);
    querySearchHistoryEvt()
}
/** 查询搜索历史 */
async function querySearchHistoryEvt() {
    let res = await getSearchHistoryApi()
    if (res.code === 200) {
        searchHistory.value = res.data || []
    }
    searchHistory.value.sort((a, b) => b.date - a.date)
}
querySearchHistoryEvt()
/** 搜索事件 */
async function searchEvt() {
    if (!value.value) return
    let res = await addSearchHistoryApi(value.value, Date.now())
    router.push({ path: '/searchResult', query: { search_value: value.value } })
}
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
.search-box {
    width: 100vw;
    height: 100vh;

    // 头部
    header {
        .nav {
            .van-search {
                height: 44px;
            }
        }
    }

    // 内容区域
    main {
        background-color: white;
        padding: 15px 12px 6px;

        .top {
            display: flex;
            justify-content: space-between;
            font-size: .6rem;

            span:nth-child(1) {
                color: #aba9a9;
            }

            span:nth-child(2) {
                color: #fb619c;
            }
        }

        .btm {
            margin-top: 10px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-around;

            span {
                font-size: .55rem;
                display: block;
                background-color: #f7f5f5;
                padding: 8px 10px;
                margin-right: 8px;
                border-radius: 8vw;
                margin-bottom: 12px;
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
    color: #8B8B8B;
}

::v-deep(.van-nav-bar__title) {
    max-width: none;
    width: 78%;

    .van-search__content {
        border-radius: 40px;
        height: 30px;
        display: flex;
        align-items: center;

        .van-field__left-icon .van-icon,
        .van-field__right-icon .van-icon {
            color: #B6B6B6;
        }

        .van-field__control[type=search] {
            font-size: .65rem;
            font-weight: normal;
        }

        .van-badge__wrapper {
            color: #B6B6B6;
        }
    }
}
</style>