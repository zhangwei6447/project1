<template>
    <div class="list-box" @scroll="scrollEvt">
        <header>
            <van-nav-bar :title="pageName" left-arrow @click-left="router.go(-1)">
                <template #right>
                    <van-icon name="search" size="26" color="#8B8B8B" />
                    <van-icon name="qr" size="26" color="#8B8B8B" />
                </template>
            </van-nav-bar>
        </header>
        <nav>
            <van-swipe class="my-swipe" indicator-color="#FB7299" ref="node">
                <van-swipe-item v-if="showType.length >= 0">
                    <div class="item" v-for="it in showType.slice(0, 5)" :key="it" @click="changeType(it.txt)">
                        <img :src="it.img" alt="">
                        <span>{{ it.txt }}</span>
                    </div>
                </van-swipe-item>
                <van-swipe-item v-if="showType.length >= 5">
                    <div class="item" v-for="it in showType.slice(5, 10)" :key="it" @click="changeType(it.txt)">
                        <img :src="it.img" alt="">
                        <span>{{ it.txt }}</span>
                    </div>
                </van-swipe-item>
                <van-swipe-item v-if="showType.length >= 10">
                    <div class="item" v-for="it in showType.slice(11, 15)" :key="it" @click="changeType(it.txt)">
                        <img :src="it.img" alt="">
                        <span>{{ it.txt }}</span>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </nav>
        <van-sticky>
            <div class="top">
                <div class="item act" @click="selectZonghe()" ref="select_zonghe">
                    <span>综合</span>
                    <van-icon name="arrow-down" size="15px" />
                </div>
                <div class="item" @click="selectXinping()" ref="select_xinping">
                    <span>新品</span>
                </div>
                <div class="item" @click="selectJiage()" ref="select_jiage">
                    <span>价格</span>
                    <p>
                        <van-icon name="arrow-up" size="12px" />
                        <van-icon name="arrow-down" size="12px" />
                    </p>
                </div>
                <div class="line"></div>
                <div class="item">
                    <span>魔力赏</span>
                    <van-icon name="arrow-down" size="15px" />
                </div>
                <div class="item">
                    <span>筛选</span>
                    <van-icon name="filter-o" size="18px" />
                </div>
            </div>
            <div :class="['btm']" v-if="lable.length">
                <div class="shouban">
                    <ul>
                        <li v-for="it in lable" :key="it" @click="labelSelectBtn(it)">{{ it }}</li>
                    </ul>
                </div>
            </div>
        </van-sticky>

        <div class="rem">
            <div class="item" v-for="it in recommand" :key="it.goods_id" @click="router.push({path:'/detail',query:{goods_id:it.goods_id}})">
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
    </div>
</template>
<script setup>
// ============================引入================================== //
import { ref, watch } from "vue";
import { listTypeApi, recommendTypeApi } from '../../apis/home.js'
import { useRoute, useRouter } from "vue-router";
// ============================变量================================ //
const router = useRouter()
const route = useRoute()
const recommand = ref([])
const page = ref(1)
const hasMore = ref(true)
const loading = ref(true)
//首页传递的值
const fromHomeParam = ref()
// 用于展示的数据
const showData = ref()
// 页面名称
const pageName = ref()
// 展示类型
const showType = ref([])
// lable标签
const lable = ref([])
/** 筛选 */
const select_zonghe = ref()
const select_xinping = ref()
const select_jiage = ref()
const price_state = ref()
price_state.value = 'top'
/** 原始商品数据 */
// 综合
const origin_goods = ref([])
// 最新
const time_goods = ref([])
// 标签
const label_goods = ref([])
// =============================方法================================= //
/** 当页面滑动时，加载下一页，设置一个变量page */
getList()
function getList() {
    setTimeout(() => {
        recommendTypeApi(page.value, 6, fromHomeParam.value).then(_res => {
            if (_res.code === 200) {
                hasMore.value = _res.data.total > page.value * 6
                recommand.value = [...recommand.value, ..._res.data.rows]
                origin_goods.value = JSON.parse(JSON.stringify(recommand.value))
                time_goods.value = JSON.parse(JSON.stringify(recommand.value))
                label_goods.value = JSON.parse(JSON.stringify(recommand.value))
            }
            loading.value = false
        })

    }, 30)
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
/**
 * 获取首页参数
 */
watch(
    () => route.query.goodsType,
    function () {
        fromHomeParam.value = route.query.goodsType
        listTypeApi().then(d => {
            if (d.code === 200) {
                for (let i = 0; i < d.data.length; i++) {
                    if (d.data[i].type_name === fromHomeParam.value) {
                        showData.value = d.data[i]
                        pageName.value = showData.value.type_name
                        showType.value = showData.value.data
                        lable.value = showData.value.lable
                    }
                }
            }
        })
    },
    {
        immediate: true,
    }
)
/**
 * 点击切换商品类型
 */
function changeType(type) {
    router.push({ path: '/detaillist', query: { goodsType: pageName.value, detailType: type } })
}
/**
 * 综合，新品，价格
 */
function selectZonghe() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_zonghe.value.classList.add('act')
    recommand.value = JSON.parse(JSON.stringify(origin_goods.value))
}
function selectXinping() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_xinping.value.classList.add('act')
    for (let i = 0; i < time_goods.value.length - 1; i++) {
        for (let j = i + 1; j < time_goods.value.length; j++) {
            if (time_goods.value[i].ground_time < time_goods.value[j].ground_time) {
                let temp = {}
                temp = time_goods.value[i]
                time_goods.value[i] = time_goods.value[j]
                time_goods.value[j] = temp
            }
        }
    }
    recommand.value = JSON.parse(JSON.stringify(time_goods.value))
}
function selectJiage() {
    select_zonghe.value.classList.remove('act')
    select_xinping.value.classList.remove('act')
    select_jiage.value.classList.remove('act')
    select_jiage.value.classList.add('act')
    if (price_state.value === 'btm') {
        for (let i = 0; i < recommand.value.length - 1; i++) {
            for (let j = i + 1; j < recommand.value.length; j++) {
                if (recommand.value[i].price < recommand.value[j].price) {
                    let temp = {}
                    temp = recommand.value[i]
                    recommand.value[i] = recommand.value[j]
                    recommand.value[j] = temp
                }
            }
        }
        price_state.value = 'top'
    } else {
        for (let i = 0; i < recommand.value.length - 1; i++) {
            for (let j = i + 1; j < recommand.value.length; j++) {
                if (recommand.value[i].price > recommand.value[j].price) {
                    let temp = {}
                    temp = recommand.value[i]
                    recommand.value[i] = recommand.value[j]
                    recommand.value[j] = temp
                }
            }
        }
        price_state.value = 'btm'
    }
}
/**
 * 通过标签筛选
 */
function labelSelectBtn(param) {
    const arr=label_goods.value.filter(it => {
        return it.name.includes(param)
    })
    recommand.value = JSON.parse(JSON.stringify(arr))
}

</script>

<style lang="less" scoped>
@import '../../style/common.less';
@c5: #13c2c2;

.list-box {
    height: 100vh;
    background-color: white;
    overflow-y: scroll;

    header {
        width: 100%;
        height: 44px;

        .van-nav-bar {
            height: 44px;

            .van-nav-bar__content {
                height: 44px;

            }
        }
    }

    nav {
        width: 100vw;
        margin-top: 15px;
        padding: 0 .8rem;
        overflow-x: scroll;
        white-space: nowrap;
        margin-bottom: 4px;

        .item {
            width: 64px;
            display: inline-block;
            margin-right: 15px;
            text-align: center;

            &:nth-child(5n) {
                margin-right: 0;
            }

            img {
                display: block;
                margin: 0 auto;
                width: 53px;
                height: 55px;
            }

            span {
                display: block;
                text-align: center;
                margin-top: 4px;
                font-size: .7rem;
            }
        }
    }

    .rem {
        margin-top: 20px;
        display: flex;
        @w: 8px;
        flex-wrap: wrap;
        justify-content: space-between;

        >.item {
            flex: 0 0 calc(50% - 4px);
            position: relative;
            background-color: #ffffff;
            box-shadow: 0 0 8px rgba(0, 0, 0, .1);
            margin-bottom: @w;
            overflow: hidden;

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
                font-size: .7rem;
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
                margin: 10px;
                font-size: .8rem;
                color: #FF5687;

                span {
                    font-size: 1.1rem;
                }

                >p:nth-child(2) {
                    color: #999999;
                }
            }
        }
    }
}


::v-deep(.van-sticky) {
    width: 100vw;
    box-shadow: 5px 0 5px 0 #B6B6B6;
    background-color: white;

    &.isLabel {
        height: 44px;
    }

    .top {
        display: flex;
        padding: 0 10px;
        height: 44px;
        align-items: center;
        justify-content: space-around;

        .item {
            font-size: .9rem;
            color: #999999;
        }

        .line {
            width: 1px;
            height: 18px;
            background-color: #999999;
        }

        div:nth-child(3) {
            display: flex;

            p {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        .act {
            font-weight: 600;
            color: #FF5687;
        }
    }

    .btm {
        height: 50px;
        padding: 0 10px;

        div {
            ul {
                white-space: nowrap;
                overflow-x: scroll;

                li {
                    line-height: 36px;
                    padding: 4px 15px;
                    display: inline-block;
                    font-size: .8rem;
                    color: #212121;
                    background-color: #F4F4F4;
                    border-radius: 18px;
                    margin-right: 15px;
                }
            }
        }
    }

}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 1rem;
    color: #8B8B8B;
}


.van-nav-bar__title {
    font-size: .9rem;
    font-weight: normal;
}

.van-icon-qr:before,
.van-icon-search:before {
    margin-left: 10px;
    font-weight: 500;
}

.my-swipe .van-swipe-item {
    color: black;
    font-size: 20px;
    overflow: auto;
}

.van-swipe__indicators {
    bottom: 0px;
}

.van-swipe-item {
    height: 105px;
}

.footer {
    margin: 8px 0;
    text-align: center;
    color: #FF5687;
    font-size: .9rem;
}
</style>