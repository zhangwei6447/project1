<template>
    <div class="search-box" @scroll="scrollEvt">
        <!-- 头部 -->
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <div class="nav" style="width: 100%">
                            <van-search v-model="value" placeholder="商品、品牌、IP名" disabled @click="router.push('/search')" />
                        </div>
                    </template>
                    <template #right>
                        <span style="font-size: .65rem;">搜索</span>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容 -->
        <main>
            <div class="con">
                <nav>
                    <span>商品</span>
                    <span>盲盒</span>
                    <span>漫展演出</span>
                    <span>抢先看</span>
                    <span>电影</span>
                </nav>
                <div class="store" v-if="!!storeInfo">
                    <div class="left">
                        <img :src="storeInfo.store_logo" alt="">
                        <p>
                            <span>{{ storeInfo.store_username }}</span>
                            <span>共有{{ store_goodsInfo.length || 0 }}件在售商品</span>
                        </p>
                    </div>
                    <div class="right">
                        <span>去看看</span>
                        <van-icon name="arrow" size=".6rem" color="#8B8B8B" />
                    </div>
                </div>
            </div>
            <!-- 筛选栏 -->
            <van-sticky offset-top="44px">
                <div class="top">
                    <div class="item act" ref="select_zonghe" @click="zongheEvt()">
                        <span>综合</span>
                        <van-icon name="arrow-down" size="15px" />
                    </div>
                    <div class="item" ref="select_xinping" @click="newEvt()">
                        <span>新品</span>
                    </div>
                    <div class="item" ref="select_jiage" @click="priceEvt()">
                        <span>价格</span>
                        <p>
                            <van-icon name="arrow-up" size="12px" />
                            <van-icon name="arrow-down" size="12px" />
                        </p>
                    </div>
                    <div class="item">
                        <span>商品类型</span>
                        <van-icon name="arrow-down" size="15px" />
                    </div>
                    <div class="line"></div>
                    <div class="item">
                        <!-- <span>筛选</span> -->
                        <van-icon name="filter-o" size="18px" />
                    </div>
                </div>
            </van-sticky>
            <!-- 商品区域 -->
            <div class="rem">
                <div class="item" v-for="it in recommand" :key="it.goods_id"
                    @click="router.push({ path: '/detail', query: { goods_id: it.goods_id } })">
                    <img :src="it.img[0]" alt="">
                    <div class="title">{{ it.name }}</div>
                    <div class="price">
                        <p>¥ <span>{{ it.price }}</span></p>
                        <p>{{ it.want.length }}人想要</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div v-if="loading">加载中...</div>
                <div v-else-if="hasMore">上滑加载更多...</div>
                <div v-else>没有更多数据</div>
            </div>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchGoodsApi, searchGoodsStoreApi, searchStoreApi } from "../../apis/search";


// ===========================变量============================ //
const router = useRouter()
const route = useRoute()
// 商家
const storeInfo = ref()
// 商家的商品信息
const store_goodsInfo = ref([])
// 搜索值
const value = ref('')
// 搜索数据
const recommand = ref([])
// 页数
const page = ref(1)
// 加载状态
const hasMore = ref(true)
const loading = ref(true)
// 获取节点
const select_zonghe = ref()
const select_xinping = ref()
const select_jiage = ref()
// 价格排序状态
const price_state = ref()
price_state.value = 'top'
// 不同排序的数据
const orgin_goods=ref()
const time_goods=ref()
const price_goods=ref()
// ===========================方法============================ //
/** 排序 */
// 综合
function zongheEvt() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_zonghe.value.classList.add('act')
    recommand.value=JSON.parse(JSON.stringify(orgin_goods.value))
}
// 新品
function newEvt() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_xinping.value.classList.add('act')
    time_goods.value.sort((a, b) => b.ground_time - a.ground_time)
    recommand.value=JSON.parse(JSON.stringify(time_goods.value))
}
// 价格
function priceEvt() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_jiage.value.classList.add('act')
    if(price_state.value==='top'){
        price_goods.value.sort((a, b) => a.price - b.price)
        price_state.value='btm'
    }else{
        price_goods.value.sort((a, b) => b.price - a.price)
        price_state.value='top'
    }
    recommand.value=JSON.parse(JSON.stringify(price_goods.value))
}
/** 获取搜索页面传递的参数 */
watch(
    () => route.query.search_value,
    async function () {
        value.value = route.query.search_value
        getList()
        let res = await searchStoreApi(value.value)
        if (res.code === 200) {
            storeInfo.value = res.data
            let res1 = await searchGoodsStoreApi(storeInfo.value.store_id)
            if (res1.code === 200) {
                store_goodsInfo.value = res1.data
            }
        }

    },
    {
        immediate: true,
    }
)
/** 当页面滑动时，加载下一页，设置一个变量page */
async function getList() {
    let _res = await searchGoodsApi(value.value, page.value, 6)
    if (_res.code === 200) {
        hasMore.value = _res.data.total > page.value * 6
        recommand.value = [...recommand.value, ..._res.data.rows]
        orgin_goods.value=JSON.parse(JSON.stringify(recommand.value))
        time_goods.value=JSON.parse(JSON.stringify(recommand.value))
        price_goods.value=JSON.parse(JSON.stringify(recommand.value))
    }
    loading.value = false
}
/** 
 * 滚动事件  
 * + 是否到触发点100px -- hasBotton
 * + 是否处于加载中 -- loading
 * + 是否有更多数据 -- hasMore
 */
function scrollEvt(evt) {
    let _tar = evt.target
    const hasBotton = _tar.scrollHeight - _tar.clientHeight - _tar.scrollTop <= 100
    if (hasBotton && !loading.value && hasMore.value) {
        loading.value = true
        page.value += 1
        getList()
    }
}
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@h: 50px;
@p: .8rem;
/** 定义全局的方法和变量、颜色等 */
@c0: #e6fffb;
@c1: #b5f5ec;
@c2: #87e8de;
@c3: #5cdbd3;
@c4: #36cfc9;
@c5: #13c2c2;
@c6: #08979c;
@c7: #006d75;
@c8: #00474f;
@c9: #002329;

@g01: #ffffff;
@g02: #fafafa;
@g03: #f5f5f5;
@g04: #f0f0f0;
@g05: #d9d9d9;
@g06: #bfbfbf;
@g07: #8c8c8c;
@g08: #595959;
@g09: #434343;
@g10: #262626;
@g11: #1f1f1f;
@g12: #141414;
@g13: #000000;

@bg1: #f86d31;
@star: #fbc43e;

@pagePadding: .7rem;

.search-box {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;

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
        width: 100vw;
        height: calc(100% - 44px);
        background-color: #f6f2f2;
        // overflow-y: scroll;

        .con {
            padding: 15px 12px 0px;
            background-color: white;

            nav {
                display: flex;
                justify-content: space-between;
                padding: 0 12px;

                span {
                    font-size: .7rem;
                    color: #212121;
                }

            }

            .store {
                margin: auto;
                margin-top: 15px;
                width: 95%;
                border-radius: 12px;
                background-color: #f4f4f4;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 8px;

                .left {
                    display: flex;
                    align-items: center;

                    img {
                        display: block;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 2px;
                    }

                    p {
                        margin-left: 6px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 2.5rem;
                        padding: 6px 0;

                        span:nth-child(1) {
                            display: block;
                            font-size: .7rem;
                            font-weight: 600;
                        }

                        span:nth-child(2) {
                            display: block;
                            font-size: .6rem;
                            color: #8B8B8B;
                        }
                    }
                }

                .right {
                    span {
                        font-size: .6rem;
                        color: #8B8B8B;
                        margin-right: 2px;
                    }
                }
            }
        }

        .rem {
            padding: 0px 10px 0;
            margin-top: 6px;
            display: flex;
            @w: 8px;
            flex-wrap: wrap;
            justify-content: space-between;

            >.item {
                flex: 0 0 calc(50% - 4px);
                position: relative;
                background-color: #ffffff;
                // box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                margin-bottom: @w;
                overflow: hidden;
                border-radius: 5px;

                >img {
                    display: block;
                    width: 100%;
                }

                >.title {
                    height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-size: .65rem;
                    color: black;
                    line-height: 20px;
                    padding: 4px 10px;
                    display: -webkit-box;
                }

                >.tags {
                    height: 24px;
                    overflow: hidden;
                    padding: 4px 10px;

                    >.tag {
                        display: inline-block;
                        vertical-align: super;
                        border: solid 1px @c5;
                        color: @c5;
                        font-size: .6rem;
                        height: 16px;
                        line-height: 26px;
                        border-radius: 4px;
                        margin-right: 8px;

                        span {
                            display: inline-block;
                            transform: scale(0.7) translateY(-9px);
                        }
                    }
                }

                >.price {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 10px;
                    font-size: .65rem;
                    color: #FF5687;

                    span {
                        font-size: .9rem;
                    }

                    >p:nth-child(2) {
                        font-size: .65rem;
                        color: #999999;
                    }
                }
            }
        }
    }
}

.footer {
    margin: 8px 0;
    text-align: center;
    color: #FF5687;
    font-size: .8rem;
}

// 粘性筛选栏
::v-deep(.van-sticky) {
    width: 100vw;
    // box-shadow: 5px 0 5px 0 #B6B6B6;
    background-color: white;

    &.isLabel {
        height: 38px;
    }

    .top {
        display: flex;
        padding: 0 10px;
        height: 38px;
        align-items: center;
        justify-content: space-around;
        // align-items: center;

        .item {
            font-size: .7rem;
            color: #999999;
            display: flex;
            // flex-direction: column;
            align-items: center;
        }

        .line {
            width: 1px;
            height: 18px;
            background-color: #999999;
        }

        div:nth-child(3) {
            display: flex;

            p {
                margin-left: 2px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        .act {
            // font-weight: 600;
            color: #FF5687;
        }
    }


}

// 头部导航
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: .8rem;
    // color: #8B8B8B;
    color: black;
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