<template>
    <div class="types-box">
        <header>
            <van-nav-bar left-arrow @click-left="router.go(-1)">
                <template #title>
                    <van-search @search="onSearch()" shape="round" input-align="left" v-model="value"
                        placeholder="商品、品牌、IP名" disabled @click="router.push('/search')" />
                </template>
            </van-nav-bar>
        </header>

        <main>
            <aside>
                <div v-for='it in typesList' :class="['aside-item', act === it && 'active']" @click='clickEvt(it)'
                    :key="it">
                    {{ it }}
                </div>
            </aside>
            <div class="main-content" @scroll="scrollPage()" ref="theNode">
                <div class="content-item" v-for="(it, index) in list" :id="it.title" :key="it.title">
                    <p class="title">
                        <span class="l">{{ it.title }}</span>
                        <span v-if="(it.flag)" class="r" @click="toTop(it.title)">人气排行</span>
                    </p>
                    <div class="goods">
                        <div class="goods-item" v-for="oo in it.items" :key="oo.path"
                            @click="index <= 5 && toListPageEvt(it, oo)">
                            <img :src="oo.path" alt="">
                            <span>{{ oo.txt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTypesGoodsApi } from '../../apis/types';
// ===========================变量============================ //
const value = ref('')
const router = useRouter()

const typesList = ref([])
const act = ref('')
const list = ref([])
// ===========================方法============================ //
/** 跳转到分类页面 */
function toListPageEvt(type, detail_type) {
    router.push({ path: '/detaillist', query: { goodsType: type.title, detailType: detail_type.txt } })
}
// 获取type信息
getTypesGoodsApi().then((d) => {
    if (d.code == 200) {
        typesList.value = d.data.map((it) => it.title)
        act.value = typesList.value[0]
        list.value = d.data.map((it) => {
            it.flag = ["手办", '周边', '图书漫画', '潮玩扭蛋'].includes(it.title)
            return it
        })
        // console.log(list.value);
    }
})

// 点击列表事件
const theNode = ref()
function clickEvt(it) {
    let top = 0;
    for (let item of typesList.value) {
        if (item === it) {
            break
        } else {
            top += document.getElementById(item)?.clientHeight || 0;
        }
    }
    theNode.value.scrollTop = top;
    act.value = it
}


// 点击跳转事件
function toTop(name) {
    router.push({
        path: './popular',
        query: { name }
    })
}


/** 滚动触发事件 */
function scrollPage() {
    let it = 0;
    for (let item of typesList.value) {
        it += document.getElementById(item)?.clientHeight
        if (it > theNode.value.scrollTop) {
            act.value = item
            break
        }
    }
}

/** 搜索事件 */
function onSearch() {
    router.push({
        path: '../search',
        query: { value: value.value || 0 }
    })
}
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
.types-box {
    display: block;
    position: relative;
    height: 100%;
    overflow-x: hidden;
    background-color: #FAFAFA;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    header {
        ::v-deep(.van-nav-bar) {
            height: 44px;
            overflow: hidden;
            background-color: #fb619c;
            color: width;

            &::after {
                border: none;
            }


        }

        ::v-deep(.van-nav-bar__title) {
            width: calc(100% - 52px);
            max-width: 100%;
            overflow: hidden;
            margin-left: 40px;
        }

        ::v-deep(.van-search) {
            background: transparent;
            height: 44px;
            font-weight: normal;
            font-size: 1rem;
        }
    }

    main {
        height: calc(100% - 52px - 41px);
        flex: 1;

        aside {
            background-color: #EAEAEA;
            overflow: hidden;
            height: 100%;
            float: left;
            width: 100px;
            font-size: .7rem;

            .aside-item {
                height: 40px;
                line-height: 38px;

                padding-left: 20px;
                position: relative;

                &.active {
                    background-color: #FAFAFA;
                    color: #fb619c;

                    &::before {
                        content: ' ';
                        display: block;
                        position: absolute;
                        top: 12px;
                        left: 14px;
                        width: 2px;
                        height: 14px;
                        border-radius: 12px;
                        background-color: #e35e86;
                    }
                }
            }
        }

        .main-content {
            background-color: white;
            overflow-x: hidden;
            overflow-y: auto;
            margin-left: 100px;
            height: 100%;

            .content-item {
                padding-bottom: 20px;

                .title {
                    height: 40px;
                    line-height: 40px;
                    padding-left: 8px;
                    display: flex;
                    flex: 1;
                    justify-content: space-between;

                    .l {
                        float: left;
                        font-size: 14px;
                    }

                    .r {
                        float: right;
                        font-size: 12px;
                        color: #fb619c;
                        margin-right: 10px;
                    }
                }

                .goods {
                    display: flex;
                    flex-wrap: wrap;

                    .goods-item {
                        width: 33%;
                        flex: 0 0 33%;
                        height: 120px;
                        position: relative;

                        img {
                            position: relative;
                            left: 0;
                            right: 0;
                            margin: auto;
                            display: block;
                            width: calc(100% - 20px);
                            height: calc(100% - 40px);
                        }

                        span {
                            display: block;
                            text-align: center;
                            line-height: 20px;
                            font-size: 12px;
                            color: #B6B6B6;
                        }
                    }
                }
            }
        }
    }
}

::v-deep(.van-icon-arrow-left:before) {
    color: white;
    font-size: 1rem;
}

::v-deep(.van-search__content--round) {
    background-color: white;
}

::v-deep(.van-field__left-icon .van-icon, .van-field__right-icon .van-icon) {
    color: #b4b1b1;
}
</style>