<template>
    <div class="popular-box">
        <header>
            <div class="head">
                <nav>
                    <van-icon
                        name="arrow-left"
                        size="1.1rem"
                        color="white"
                        @click="router.go(-1)"
                    />
                    <span>人气排行</span>
                    <van-icon
                        name="arrow-left"
                        size="1.1rem"
                        color="white"
                        style="opacity: 0"
                    />
                </nav>
                <div class="tip">
                    <van-icon
                        name="star"
                        size=".5rem"
                        color="#f6eacf"
                        style="margin-top: 2px"
                    />
                    <span
                        >排名以销售额、想要人数等指标综合计算得出，每日0点更新</span
                    >
                    <van-icon
                        name="star"
                        size=".5rem"
                        color="#f6eacf"
                        style="margin-top: 2px"
                    />
                </div>
            </div>
        </header>
        <main>
            <van-tabs
                v-model:active="active"
                swipeable
                lazy-render
                color="#f6eacf"
                title-active-color="white"
                title-inactive-color="grey"
                sticky
                offset-top="80px"
                :click-tab="tabEvt()"
            >
                <van-tab title="手办" name="手办">
                    <!-- item -->
                    <div
                        class="item"
                        v-for="(item, index) in goodsList"
                        :key="item"
                        @click="
                            router.push({
                                path: '/detail',
                                query: { goods_id: item.goods_id },
                            })
                        "
                    >
                        <img :src="item.img[0]" alt="" />
                        <div class="right">
                            <span>{{ item.name }}</span>
                            <div class="price">
                                <p>
                                    ￥<span>{{ item.price }}</span>
                                </p>
                                <span>{{ item.want.length || 0 }}人想要</span>
                            </div>
                        </div>
                        <div class="icon">
                            <van-icon
                                v-if="index === 0"
                                name="fire"
                                color="white"
                                size="1rem"
                            />
                            <span
                                v-if="index !== 0"
                                style="color: white; font-size: 0.8rem"
                                >{{ index + 1 }}</span
                            >
                        </div>
                    </div>
                </van-tab>
                <van-tab title="周边" name="周边">
                    <div
                        class="item"
                        v-for="(item, index) in goodsList"
                        :key="item"
                        @click="
                            router.push({
                                path: '/detail',
                                query: { goods_id: item.goods_id },
                            })
                        "
                    >
                        <img :src="item.img[0]" alt="" />
                        <div class="right">
                            <span>{{ item.name }}</span>
                            <div class="price">
                                <p>
                                    ￥<span>{{ item.price }}</span>
                                </p>
                                <span>{{ item.want.length || 0 }}人想要</span>
                            </div>
                        </div>
                        <div class="icon">
                            <van-icon
                                v-if="index === 0"
                                name="fire"
                                color="white"
                                size="1rem"
                            />
                            <span
                                v-if="index !== 0"
                                style="color: white; font-size: 0.8rem"
                                >{{ index + 1 }}</span
                            >
                        </div>
                    </div>
                </van-tab>
                <van-tab title="图书漫画" name="图书漫画">
                     <div
                        class="item"
                        v-for="(item, index) in goodsList"
                        :key="item"
                        @click="
                            router.push({
                                path: '/detail',
                                query: { goods_id: item.goods_id },
                            })
                        "
                    >
                        <img :src="item.img[0]" alt="" />
                        <div class="right">
                            <span>{{ item.name }}</span>
                            <div class="price">
                                <p>
                                    ￥<span>{{ item.price }}</span>
                                </p>
                                <span>{{ item.want.length || 0 }}人想要</span>
                            </div>
                        </div>
                        <div class="icon">
                            <van-icon
                                v-if="index === 0"
                                name="fire"
                                color="white"
                                size="1rem"
                            />
                            <span
                                v-if="index !== 0"
                                style="color: white; font-size: 0.8rem"
                                >{{ index + 1 }}</span
                            >
                        </div>
                    </div>
                </van-tab>
                <van-tab title="潮玩扭蛋" name="潮玩扭蛋">
                     <div
                        class="item"
                        v-for="(item, index) in goodsList"
                        :key="item"
                        @click="
                            router.push({
                                path: '/detail',
                                query: { goods_id: item.goods_id },
                            })
                        "
                    >
                        <img :src="item.img[0]" alt="" />
                        <div class="right">
                            <span>{{ item.name }}</span>
                            <div class="price">
                                <p>
                                    ￥<span>{{ item.price }}</span>
                                </p>
                                <span>{{ item.want.length || 0 }}人想要</span>
                            </div>
                        </div>
                        <div class="icon">
                            <van-icon
                                v-if="index === 0"
                                name="fire"
                                color="white"
                                size="1rem"
                            />
                            <span
                                v-if="index !== 0"
                                style="color: white; font-size: 0.8rem"
                                >{{ index + 1 }}</span
                            >
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { reactive, watch } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { popularApi } from "../../apis/popular";
// ===========================变量============================ //
const router = useRouter();
const route = useRoute();
/** 标签 */
const active = ref();
/** 商品数组 */
const goodsList = reactive([]);
// ===========================方法============================ //
function tabEvt() {
    queryGoodsEvt();
}
/** 查询商品排行榜 */
async function queryGoodsEvt() {
    let res = await popularApi(1, 10, active.value);
    if (res.code !== 200) return;
    goodsList.length = 0;
    res.data.rows.forEach((it) => {
        goodsList.push(it);
    });
    goodsList.sort((a, b) => b.want.length - a.want.length);
}
/** 监听传递来的类型 */
watch(
    () => route.query.name,
    function () {
        active.value = route.query.name;
        queryGoodsEvt();
    },
    {
        immediate: true,
    }
);
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import "../../style/common.less";
.popular-box {
    .rel();
    background-color: white;
    overflow: scroll;
    header {
        width: 100%;
        height: 80px;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgb(59, 66, 85);
        z-index: 10;
        .head {
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 16px;
                span {
                    font-size: 1rem;
                    color: rgb(246, 234, 207);
                }
            }
            .tip {
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                    color: rgb(246, 234, 207);
                    font-size: 0.5rem;
                    margin: 0 4px;
                    padding: 10px 0;
                }
            }
        }
    }
    main {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 16px;
            position: relative;
            margin: 10px 0;
            .icon {
                @size: 1.4rem;
                width: @size;
                height: @size;
                background-color: rgb(240, 217, 165);
                position: absolute;
                border-radius: 0 6px 6px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 10px;
                left: 0;
            }
            img {
                width: 3.6rem;
                height: 3.6rem;
                display: block;
                margin-right: 10px;
            }
            .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 3.6rem;
                span {
                    font-size: 0.7rem;
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        font-size: 0.7rem;
                        color: #fb619c;
                        span {
                            font-size: 0.9rem;
                        }
                    }
                    span:nth-child(2) {
                        font-size: 0.6rem;
                        color: rgb(164, 164, 164);
                    }
                }
            }
        }
        .item:nth-child(1) {
            margin-top: 0;
        }
    }
}

::v-deep(.van-tabs__nav--line) {
    background-color: rgb(59, 66, 85);
}
::v-deep(.van-tabs__content) {
    width: 100%;
    background-color: white;
    overflow: scroll;
    margin-top: 80px;
}
</style>