<template>
    <div class="home-box" @scroll="scrollEvt">
        <header>会员购</header>
        <div class="search" @click="router.push('/search')">搜一搜</div>
        <div class="types">
            <div class="item" v-for="it in types" :key="it.txt" @click="toType(it.txt)">
                <img :src="`/yszh` + it.path" alt="">
                <span>{{ it.txt }}</span>
            </div>
        </div>
        <div class="rem">
            <div class="item" v-for="it in recommand" :key="it.goods_id">
                <img :src="it.img[0]" alt="">
                <div class="title">{{ it.name }}</div>
                <div class="price">¥ <span>{{ it.price }}</span></div>
            </div>
        </div>
        <div class="footer">
            <div v-if="loading">加载中...</div>
            <div v-else-if="hasMore">上滑加载更多...</div>
            <div v-else>没有更多数据</div>
        </div>
    </div>
</template>
<!-- *********************************************************** -->
<script setup>
// ============================引入================================== //
import { ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import { homeRecommendApi, homeTypesApi } from '../../apis/home.js'
// ============================变量================================ //
const types = ref([])
const recommand = ref([])
const router = useRouter()
const route=useRoute()
const page = ref(1)
const hasMore = ref(true)
const loading = ref(true)
const toListParam=ref('')
// =============================方法================================= //
/** 获取types数据 */
homeTypesApi().then((d) => {
    if (d.code === 200) types.value = d.data
    // console.log(types.value);
})

/** 当页面滑动时，加载下一页，设置一个变量page */
getList()
async function getList() {
    let _res = await homeRecommendApi(page.value, 6)
    if (_res.code === 200) {
        hasMore.value = _res.data.total > page.value * 6
        recommand.value = [...recommand.value, ..._res.data.rows]
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

/**
 * 分类跳转
 */
function toType(goodsType) {
    toListParam.value=goodsType
    router.push({path:'/list',query:{goodsType:toListParam.value}})
}
</script>
<!-- *********************************************************** -->
<style lang="less" scoped>
// @import "../../style/common.less";
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

.rel(@hei: 100%; @dis: block; ) {
    display: @dis;
    position: relative;
    height: @hei;
    overflow-x: hidden;
}

.home-box {
    .rel();

    >header {
        display: block;
        line-height: 36px;
        padding-top: 10px;
        text-align: center;
        color: black;
        font-size: .9rem;
        font-weight: bold;
    }

    >.search {
        width: calc(100% - @p * 2);
        margin: 12px auto;
        line-height: 36px;
        // background-color: @g06;
        background-color: #F1F2F3;
        text-align: center;
        font-size: .7rem;
        color: @g10;
        border-radius: 18px;

        &::before {
            content: '';
            display: inline-block;
            vertical-align: bottom;
            height: 36px;
            width: 30px;
            background-size: 16px;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(../../image/search.png);
        }
    }

    >.types {
        display: flex;
        flex-wrap: wrap;

        >.item {
            flex: 0 0 25%;
            @w: 42px;

            >img {
                display: block;
                margin: auto;
                width: @w;
                height: @w;
            }

            >span {
                display: block;
                font-size: .65rem;
                color: black;
                text-align: center;
                margin-bottom: 12px;
            }
        }
    }

    >.rem {
        display: flex;
        @w: 8px;
        padding: 0 @w 0 @w * 2;
        flex-wrap: wrap;

        >.item {
            flex: 0 0 calc(50% - @w);
            position: relative;
            border-radius: 10px;
            background-color: @g01;
            margin-right: @w;
            box-shadow: 0 0 12px rgba(0, 0, 0, .1);
            margin-bottom: @w;
            overflow: hidden;

            >img {
                display: block;
                width: 100%;
                // height: 100px;
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
                display: block;
                margin: 10px;
                font-size: .8rem;
                color: #FF5687;

                span {
                    font-size: 1.1rem;
                }
            }
        }
    }
}

.footer {
    margin: 8px 0;
    text-align: center;
    color: #FF5687;
    font-size: .9rem;
}
</style>