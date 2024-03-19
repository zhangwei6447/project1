<template>
    <div class="remark-box">
        <!-- 头部导航 -->
        <header>
            <van-sticky :offset-top="0">
                <van-nav-bar :title="pageName" left-arrow @click-left="router.go(-1)">
                    <template #title>
                        <span class="maodian" ref="btn_goods">晒图/讨论</span>
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- nav导航部分 -->
        <nav>
            <div :class="[!isPic && 'act']" @click="allEvt()">全部</div>
            <div :class="[isPic && 'act']" @click="picEvt()">有图<span>{{ have_pic_remark_num }}</span></div>
        </nav>
        <!-- 内容区域 -->
        <main>
            <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
                <div class="item" v-for="it in remarkArr" :key="it">
                    <!-- 头部区域 -->
                    <div class="top">
                        <div class="left">
                            <img :src="'/apis' + it.content[0].userHead" alt="">
                            <div>
                                <span>{{ it.content[0].username }}</span>
                                <span>{{ it.content[0].date }}</span>
                            </div>
                        </div>
                        <div class="right">
                            <van-icon name="ellipsis" size="16" color="#717171" />
                            <div>
                                <span v-if="!!it.content[0].like.length">{{ it.content[0].like.length }}</span>
                                <van-icon name="good-job" size="16" color="#fb619c" @click="remarkCancelZanEvt(it._id)"
                                    v-if="it.content[0].isLike" />
                                <van-icon name="good-job" size="16" color="#8B8B8B" @click="remarkZanEvt(it._id)"
                                    v-if="!it.content[0].isLike" />
                            </div>
                        </div>
                    </div>
                    <div class="btm">
                        <!-- 赞--星星 -->
                        <div class="zan">
                            <span>超级赞</span>
                            <van-rate v-model="value" size="10" gutter="1.5" color="#fb619c" />
                        </div>
                        <!-- 评论内容 -->
                        <div class="txt" @click="replyRemarkEvt(it.user_id, it._id, it.content[0].username)">
                            <van-text-ellipsis rows="4" :content="it.content[0].text" expand-text="展开"
                                collapse-text="收起"></van-text-ellipsis>
                        </div>
                        <!-- 图片区域 -->
                        <div class="pic">
                            <van-grid :border="false" :column-num="3" :gutter="0">
                                <van-grid-item style="padding: 0;" class="single_img_test"
                                    v-for="i in it.content[0].img" :key="i">
                                    <van-image :src="'/apis' + i.path" />
                                </van-grid-item>
                            </van-grid>
                        </div>
                        <!-- 回复 -->
                        <div class="reply">
                            <!-- 回复数量 -->
                            <div class="item2"
                                v-for="item in ((isShowMoreReply === true) ? it.reply : it.reply.slice(0, 2))"
                                :key="item">
                                <div class="top">
                                    <div class="left">
                                        <img :src="'/apis' + item.userHead" alt="">
                                        <div>
                                            <span>{{ item.username }}</span>
                                            <span>{{ item.date }}</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <van-icon name="ellipsis" size="16" color="#717171" />
                                        <div>
                                            <span v-if="!!item.like.length">{{ item.like.length }}</span>
                                            <van-icon name="good-job" class="act" size="16" color="#fb619c"
                                                @click="replyZanEvt(it._id, item._id)" v-if="item.isLike" />
                                            <van-icon name="good-job" class="act" size="16" color="#8B8B8B"
                                                @click="cancelReplyZanEvt(it._id, item._id)" v-if="!item.isLike" />
                                        </div>
                                    </div>
                                </div>
                                <div class="btm" @click="replyOthersEvt(item.user_id, it._id, item.username)">
                                    回复 @<span>{{ item.reply_username }}</span>:<van-text-ellipsis rows="4"
                                        :content="item.text" expand-text="展开" collapse-text="收起"></van-text-ellipsis>
                                </div>
                            </div>
                            <!-- 展示未显示的回复 -->
                            <div class="expand" v-if="!isShowMoreReply && it.reply.length > 2" @click="showMoreReply()">
                                展开<span>{{ it.reply.length - 2 }}</span>条回复
                            </div>
                            <!-- 收起回复 -->
                            <div class="retract" @click="retractReply()" v-if="isShowMoreReply && it.reply.length > 2">
                                收起回复
                            </div>
                        </div>
                    </div>
                </div>
            </van-pull-refresh>

        </main>
        <!-- 底部按钮 -->
        <footer>
            <div>
                <van-icon name="service-o" size="24" color="#717171" />
            </div>
            <div>
                <van-icon name="cart-o" size="24" color="#717171" />
            </div>
            <div @click="addCartEvt()">
                <van-button color="#7232dd" plain>加入购物车</van-button>
            </div>
            <div>
                <van-button color="linear-gradient(to right, #fb7299, #e94b74)">
                    立即购买
                </van-button>
            </div>
        </footer>
        <!-- 弹出--回复 -->
        <div class="pop1">
            <van-popup v-model:show="showReply_popup" position="bottom" :style="{ height: '32%' }">
                <div class="head">
                    <p>回复<span>{{ reply_username }}</span></p>
                    <van-icon name="cross" color="#B6B6B6" size="20" />
                </div>
                <div class="input">
                    <van-cell-group inset>
                        <van-field v-model="message" rows="4" autosize type="textarea" maxlength="1000"
                            show-word-limit />
                    </van-cell-group>
                </div>
                <div class="submit">
                    <div class="left">
                    </div>
                    <div class="right">
                        <span>友善讨论 社区留香</span>
                        <div :class="['send', message.length >= 3 && 'act']" @click="sendRemarkEt()">发送</div>
                    </div>
                </div>
            </van-popup>
        </div>
        <!-- 浮动气泡 -->
        <van-floating-bubble v-model:offset="offset" icon="edit" @click="showPop2Evt()" axis="lock"
            style="border: 2px solid #fb619c;background-color: white;color: #fb619c;width: 35px;height: 35px;font-size: 10px;"
            v-if="showBubble" />
        <!-- 弹出--发布评论 -->
        <div class="pop2">
            <van-popup v-model:show="showReleaseRemark" position="bottom" :style="{ height: '52%' }" @close="closePop2Evt()">
                <div class="head">
                    <span>发表评论</span>
                    <van-icon name="cross" color="#B6B6B6" size="20" />
                </div>
                <div class="goods">
                    <img :src="goodsInfo.img[0]" alt="">
                    <div>
                        <span>{{ goodsInfo.name }}</span>
                        <p>品牌<span>{{ storeInfo.store_name }}</span></p>
                    </div>
                </div>
                <div class="input">
                    <van-cell-group inset>
                        <van-field v-model="message2" rows="2" autosize type="textarea" maxlength="1000"
                            placeholder="快与同好分享你的感受及购物心得吧 ~" show-word-limit @input="textChangeEvt()" />
                    </van-cell-group>
                </div>
                <div class="pic">
                    <van-uploader v-model="fileList" multiple max-count="9" upload-text="最多上传9张" />
                    <span v-if="showTxt">发布40字以上趣味/专业评论 or 3张以上相关高清美图，就有机会成为精选✧(≖ ◡ ≖)</span>
                </div>
                <div class="submit">
                    <div class="left">
                        <van-checkbox v-model="check_dongtai" checked-color="#fb619c">同步到动态</van-checkbox>
                    </div>
                    <div class="right">
                        <span>友善讨论 社区留香</span>
                        <div class="send" @click="sendRemarkEvt2()" ref="isSend">发送</div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script setup>
// ===========================引入============================ //
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommonStore } from '../../store';
import { addRemarkApi, getGoodsDetailApi, queryRemarkApi, queryStoreApi, uploadRemarkImgApi } from '../../apis/home';
import { queryUserInfoApi2 } from '../../apis/userApi';
import { addReplyApi, cancelRemarkLikeApi, cancelReplyLikeApi, remarkLikeApi, replyLikeApi } from '../../apis/remark'
import { showToast } from 'vant';
import { scaleImage } from '../../utils';
import { cartAddApi } from '../../apis/cart';
// ===========================变量============================ //
const router = useRouter()
const route = useRoute()
const store = useCommonStore()
// 评论星星数
const value = ref(5)
// 下拉刷新变量--boolean
const isLoading = ref()
// 商品id
const goods_id = ref()
// 评论信息
const remarkArr = ref()
// 展示更多回复
const isShowMoreReply = ref(false)
// 弹出--回复
const showReply_popup = ref()
// 回复字数
const message = ref('')
// 发送时的user_id
const send_user_id = ref()
// 回复的uername
const reply_username = ref('')
// 是否有图片
const isPic = ref()
// 有图片的评论数量
const have_pic_remark_num = ref(0)
// 是否显示气泡
const showBubble = ref(true)
// 气泡位置
const offset = ref({ x: -20, y: 500 });
// 弹出--发布评论
const showReleaseRemark = ref(false)
// 商品信息
const goodsInfo = ref()
// 商家信息
const storeInfo = ref()
// 发布评论文字
const message2 = ref()
// 评论图片
const fileList = ref()
// 图片提示文字展示
const showTxt = ref()
// 同步到动态
const check_dongtai = ref()
// 发送评论节点
const isSend = ref()
// 发送按钮是否可用
const is_sendmsg = ref(false)
// ===========================方法============================ //
/** 加入购物车 */
async function addCartEvt(){
    let obj={
        user_id:store.user_id,
        goods_id:goodsInfo.value._id,
        goods_name:goodsInfo.value.name,
        goods_num:1,
        goods_price:goodsInfo.value.price,
    }
    let res=await cartAddApi(obj)
    if(res.code===200){
        showToast('加车成功')
    }
}
/** 弹出--评论框 */
function showPop2Evt() {
    showReleaseRemark.value = true
    showBubble.value=false
}
/**  */
function closePop2Evt(){
    showBubble.value=true
}
/** 发送按钮是否可用 */
function textChangeEvt() {
    if (message2.value.trim() !== '' || message2.value !== '') {
        isSend.value.classList.add('act')
        is_sendmsg.value = true
    } else {
        isSend.value.classList.remove('act')
        is_sendmsg.value = false
    }
}
/** 发布评论2  */
async function sendRemarkEvt2() {
    if (is_sendmsg.value === true) {
        /** 缓存信息 */
        // 缓存用户id
        store.user_id = store.userInfo._id
        // 缓存商家id
        store.store_id = storeInfo.value.store_id
        // 缓存商品id
        store.goods_id = goodsInfo.value.goods_id

        // 遍历上传的图片文件并添加到数组里面
        let imgArr = []
        if (fileList.value) {
            for (let i = 0; i < fileList.value.length; i++) {
                let name = fileList.value[i].file.lastModified
                let d = await scaleImage(fileList.value[i].file)
                let res = await uploadRemarkImgApi(d, name)
                imgArr.push(res)
            }
        }
        // 新增评论
        addRemarkApi({ date: Date.now(), text: message2.value || '', img: imgArr || [], like: [] }).then(d => {
            showToast('你的评论已发表~')
            message2.value = ''
            fileList.value = []
            showReleaseRemark.value = false
            requestData()
        })
    } else {
        return
    }
}
/** 全部 */
function allEvt() {
    isPic.value = false
    requestData()
}
/** 有图 */
function picEvt() {
    isPic.value = true
    remarkArr.value = remarkArr.value.filter(it => {
        return it.content[0].img.length !== 0
    })
}
/** 弹出--回复楼主 */
function replyRemarkEvt(user_id, remark_id, username) {
    reply_username.value = username
    showReply_popup.value = true
    send_user_id.value = user_id
    store.remark_id = remark_id
}
/** 弹出--回复其他人 */
function replyOthersEvt(user_id, remark_id, username) {
    reply_username.value = username
    showReply_popup.value = true
    send_user_id.value = user_id
    store.remark_id = remark_id
}
/** 发送--评论 */
async function sendRemarkEt() {
    if (message.value.length >= 3) {
        let obj = {
            date: Date.now(),
            text: message.value,
            like: [],
            is_report_num: 0,
            is_delete: false,
            user_id: store.userInfo._id,
            reply_user_id: send_user_id.value
        }
        let res = await addReplyApi(obj)
        if (res.code === 200) {
            message.value = ''
            showReply_popup.value = false
            showToast('回复成功')
            requestData()
        }
    }
}
/** 展示更多回复 */
function showMoreReply() {
    isShowMoreReply.value = true
}
/** 收起回复 */
function retractReply() {
    isShowMoreReply.value = false
}
/** 请求参数赋值 */
async function requestData() {
    let res = await queryRemarkApi()
    if (res.code === 200) {
        remarkArr.value = JSON.parse(JSON.stringify(res.remark))
        // 计算有图片的评论条数
        let num = 0
        remarkArr.value.forEach(it => {
            if (it.content[0].img.length !== 0) {
                num++
            }
        })
        have_pic_remark_num.value = num
        // 评论按照时间排序
        remarkArr.value.sort((a, b) => b.content[0].date - a.content[0].date)
        // 回复按照时间排序
        remarkArr.value.forEach(it => {
            it.reply.sort((a, b) => b.date - a.date)
        })
        // 修改数组数据
        remarkArr.value.forEach(async it => {
            // 拿到用户头像
            let userInfo = await queryUserInfoApi2(it.user_id)
            if (userInfo.code === 200) {
                it.content[0].userHead = userInfo.data.photo
                it.content[0].username = userInfo.data.username
                it.content[0].date = formatTimestampToDate(it.content[0].date)
                let isLike = it.content[0].like.some(it => {
                    return it === store.user_id
                })
                it.content[0].isLike = isLike
            }
            it.reply.forEach(async i => {
                let userInfo2 = await queryUserInfoApi2(i.user_id)
                if (userInfo2.code === 200) {
                    i.userHead = userInfo2.data.photo
                    i.username = userInfo2.data.username
                    i.date = formatTimestampToDate(it.content[0].date)
                }
                let userInfo3 = await queryUserInfoApi2(i.reply_user_id)
                if (userInfo3.code === 200) {
                    i.reply_username = userInfo3.data.username
                }
                let isLike = i.like.some(i2 => {
                    return i2 === store.user_id
                })
                i.isLike = isLike
            })
        })
    }

}
// 监听页面参数
watch(
    () => route.query.goods_id,
    async function () {
        goods_id.value = route.query.goods_id
        store.goods_id = goods_id.value
        requestData()
        // 获取商品详细信息
        let res = await getGoodsDetailApi(goods_id.value)
        if (res.code === 200) {
            goodsInfo.value = res.data
            let res1 = await queryStoreApi(goodsInfo.value.store_id)
            if (res1.code === 200) {
                storeInfo.value = res1.data
            }
        }
        // console.log(goodsInfo.value);
        // console.log(storeInfo.value);
    },
    {
        immediate: true
    }
)
/** 评论--点赞 */
async function remarkZanEvt(remark_id) {
    let msg = await remarkLikeApi(remark_id, store.user_id)
    requestData()
}
/** 评论--取消点赞 */
async function remarkCancelZanEvt(remark_id) {
    let msg = await cancelRemarkLikeApi(remark_id, store.user_id)
    requestData()
}
/** 回复--点赞 */
async function replyZanEvt(remark_id, reply_id) {
    let msg = await cancelReplyLikeApi(remark_id, reply_id, store.user_id)
    requestData()
}
/** 回复--取消点赞 */
async function cancelReplyZanEvt(remark_id, reply_id) {
    let msg = await replyLikeApi(remark_id, reply_id, store.user_id)
    requestData()
}

/** 计算时间戳 */
function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/** 下拉刷新 */
function onRefresh() {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
}
</script>
<style scoped lang="less">
.remark-box {
    height: 100vh;
    background-color: white;
    overflow: scroll;

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;

        .van-sticky {
            position: fixed;
        }

        .maodian {
            font-size: .8rem;
            color: black;
            font-weight: 400;
        }
    }

    /** nav导航栏 */
    nav {
        width: 100vw;
        height: 44px;
        padding: 6px 12px;
        display: flex;
        align-items: center;
        border-top: 1px solid #ebe8e8;
        border-bottom: 1px solid #ebe8e8;

        div {
            display: block;
            font-size: 12px;
            border: 1px solid #e1e1e1;
            padding: 2px 10px;
            border-radius: 12px;
            text-align: center;
            margin-right: 2vw;

            span {
                margin-left: 5px;
            }
        }

        .act {
            color: rgb(251, 97, 156);
            border: 1px solid #fb619c;
            background-color: rgba(251, 97, 156, .1);
        }
    }

    /** 内容区域 */
    main {
        width: 100vw;
        padding: 8px 12px 0;
        overflow-y: scroll;
        margin-bottom: 60px;

        .item {
            margin-bottom: 15px;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;

                    img {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        // border: 1px solid red;
                    }

                    div {
                        margin-left: 8px;
                        display: flex;
                        flex-direction: column;

                        span:nth-child(1) {
                            font-size: .65rem;
                            color: #fb619c;
                        }

                        span:nth-child(2) {
                            margin-top: 2px;
                            font-size: 12px;
                            color: #cecbcb;
                        }
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    div {
                        display: flex;
                        margin-left: 30px;

                        span {
                            margin-top: 1px;
                            margin-right: 5px;
                            font-size: .65rem;
                            color: #8B8B8B;
                        }
                    }
                }
            }

            .btm {
                margin-left: 1.5rem;
                padding-left: 8px;

                .zan {
                    display: flex;
                    align-items: center;
                    margin-top: 2px;

                    span {
                        font-size: .5rem;
                        margin-right: 4px;
                    }

                }

                .txt {
                    margin-top: 4px;
                    font-size: .65rem;

                    .van-text-ellipsis {
                        line-height: .9rem;
                        letter-spacing: .5px;

                        ::v-deep(.van-text-ellipsis__action) {
                            color: #fb619c !important;
                        }
                    }
                }
            }

            // 图片区域
            .pic {
                margin-top: 4px;

                .van-grid {
                    .van-grid-item {
                        flex-basis: 31.333% !important;
                    }

                    .single_img {
                        flex-basis: 60% !important;
                    }
                }
            }

            /** 回复 */
            .reply {
                margin-top: 6px;

                .item2 {
                    margin-bottom: 6px;

                    .top {
                        .left {
                            img {
                                width: 1rem;
                                height: 1rem;
                            }

                            div {
                                display: flex;
                                flex-direction: row;
                                align-items: center;

                                span:nth-child(1) {
                                    font-size: .65rem;
                                }

                                span:nth-child(2) {
                                    margin-left: 4px;
                                    font-size: 12px;
                                    color: #cecbcb;
                                }
                            }
                        }

                        .right {
                            div {
                                span {}
                            }
                        }

                    }

                    .btm {
                        font-size: 12px;
                        color: #8B8B8B;

                        .van-text-ellipsis {
                            // display: inline-block;
                            color: black;

                            ::v-deep(.van-text-ellipsis__action) {
                                color: #fb619c !important;
                            }
                        }
                    }
                }

                .expand {
                    font-size: 12px;
                    color: #5995EF;
                }

                .retract {
                    font-size: 12px;
                    color: #5995EF;
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

/** 发布评论 */
.pop1 {
    overflow: hidden !important;

    ::v-deep(.van-popup) {
        width: 100vw;
        border-radius: 12px 12px 0 0;
        padding: 0 12px;

        .head {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            font-size: .8rem;

            p {
                span {
                    margin-left: 6px;
                    color: #B6B6B6;
                }
            }
        }


        .input {
            .van-cell-group--inset {

                margin: 0;

                .van-field {
                    padding: 0;
                }
            }
        }


        .submit {
            padding: 15px 0;

            display: flex;
            justify-content: space-between;
            align-items: center;



            .right {
                display: flex;
                align-items: center;

                span {
                    font-size: .65rem;
                    color: #bbb;
                }

                div {
                    color: white;
                    background-color: rgba(251, 97, 156, .5);
                    margin-left: 15px;
                    width: 20vw;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-size: .8rem;
                    border-radius: 15px;

                    &.act {
                        background-color: rgba(251, 97, 156);
                    }
                }
            }
        }
    }
}

/** 发布评论 */
.pop2 {
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
                font-size: .85rem;
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
                border-radius: .2rem;
            }

            div {
                margin-left: 8px;
                padding: 2px 6px 2px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: .7rem;
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
                font-size: .64rem;
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
                    font-size: .6rem;
                }
            }

            .right {
                display: flex;
                align-items: center;

                span {
                    font-size: .8rem;
                    color: #bbb;
                }

                div {
                    color: white;
                    background-color: rgba(251, 97, 156, .5);
                    margin-left: 15px;
                    width: 20vw;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-size: .8rem;
                    border-radius: 15px;

                    &.act {
                        background-color: rgba(251, 97, 156);
                    }
                }
            }
        }
    }
}

/** 气泡 */
::v-deep(.van-floating-bubble__icon) {
    font-size: 100px !important;
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 1rem;
    color: #8B8B8B;
}

.van-nav-bar__title {
    font-size: .9rem;
    font-weight: normal;
}

/** 评论宫格图片 */
::v-deep(.van-grid-item__content) {
    padding: 3px !important;
}
</style>