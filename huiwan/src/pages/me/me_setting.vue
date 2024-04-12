<template>
    <div class="service-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar
                    left-arrow
                    title="个人信息"
                    @click-left="router.go(-1)"
                >
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <div class="header" style="position: relative">
                <img
                    :src="'/apis' + photo"
                    alt=""
                    @click="uploadPhotoEvt()"
                    ref="img_src"
                />
                <input
                    type="file"
                    name=""
                    id=""
                    ref="file"
                    style="
                        display: block;
                        position: absolute;
                        width: 2.8rem;
                        height: 2.8rem;
                        border-radius: 50%;
                        opacity: 0;
                    "
                    @change="fileChangeEvt()"
                />
                <span>点击更换头像</span>
            </div>
            <div class="item">
                <van-cell-group inset style="width: 100vw; margin: 0">
                    <!-- 用户名 -->
                    <van-field
                        v-model="username"
                        label="荟玩账号"
                        label-align="left"
                        style="font-size: 0.7rem; font-weight: normal"
                    />
                    <!-- 性别 -->
                    <div class="sex">
                        <div class="left">
                            <span>性别</span>
                        </div>
                        <div class="right">
                            <input
                                type="radio"
                                name="sex"
                                :checked="sex === '男'"
                                @click="sex = '男'"
                            />男
                            <input
                                type="radio"
                                name="sex"
                                :checked="sex === '女'"
                                @click="sex = '女'"
                            />女
                        </div>
                    </div>
                    <!-- 手机号 -->
                    <van-field
                        v-model="phone"
                        label="手机号"
                        label-align="left"
                        style="font-size: 0.7rem; font-weight: normal"
                    />
                    <!-- 邮箱 -->
                    <van-field
                        v-model="email"
                        label="邮箱"
                        label-align="left"
                        style="font-size: 0.7rem; font-weight: normal"
                    />
                </van-cell-group>
            </div>
        </main>
        <footer>
            <button @click="submitEvt()">完成</button>
            <button @click="logoutEvt()">注销</button>
        </footer>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "../../store";
import {
    queryUserInfoApi2,
    queryUsernameApi,
    updateUSerInfoApi,
    uploadUserHeadApi,
} from "../../apis/userApi";
import { showToast } from "vant";
import { valiPhone } from "../../utils/cryption";
import { scaleImage } from "../../utils";
// ===========================变量============================ //
const store = useCommonStore();
const router = useRouter();
const route = useRoute();
// img节点
const img_src = ref();
//  图片文件
const file = ref();
// 用户头像
const photo = ref();
// 用户名
const username = ref();
// 性别
const sex = ref();
// 手机号
const phone = ref();
// 邮箱
const email = ref();
// ===========================方法============================ //
async function fileChangeEvt() {
    if (!file.value.files[0]) return;
    let name = file.value.files[0].lastModified;
    let d = await scaleImage(file.value.files[0]);
    let res = await uploadUserHeadApi(d, name);
    if (res.code !== 200) return;
    queryUserInfoEvt();
    initUserInfoEvt();
    img_src.value.src = d;
}
/** 上传头像 */
async function uploadPhotoEvt() {
    console.log(file.value.files[0]);
    // let res=await
}
/** 查询用户信息 */
async function queryUserInfoEvt() {
    let res = await queryUserInfoApi2(store.userInfo._id);
    if (res.code !== 200) return;
    store.userInfo = res.data;
}
queryUserInfoEvt();
/** 点击完成 */
async function submitEvt() {
    if (!email.value) {
        showToast("邮箱不能为空");
    } else if (!username.value) {
        showToast("用户名不能为空");
    } else if (!phone.value) {
        showToast("手机号不能为空");
    } else if (!username.value) {
        showToast("邮箱不能为空");
    } else {
        let res1 = await queryUsernameApi(store.userInfo._id, username.value);
        if (res1.code !== 200) return;
        console.log(res1);
        if (res1.msg === "用户名已存在，请换一个") {
            showToast("用户名已存在，请换一个");
            return;
        } else if (!valiPhone(phone.value)) {
            showToast("手机格式不对");
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email.value
            )
        ) {
            showToast("邮箱格式不正确");
        } else {
            let obj = {
                _id: store.userInfo._id,
                photo: photo.value,
                username: username.value,
                sex: sex.value || "男",
                phone: phone.value,
                email: email.value,
            };
            let res2 = await updateUSerInfoApi(obj);
            showToast("修改个人信息成功");
            router.go(-1);
        }
    }
}
/** 赋值 */
function initUserInfoEvt() {
    photo.value = store.userInfo.photo;
    username.value = store.userInfo.username;
    sex.value = store.userInfo.sex;
    phone.value = store.userInfo.phone;
    email.value = store.userInfo.email;
}
initUserInfoEvt();

/** 注销 */
function logoutEvt() {
    sessionStorage.removeItem("pinia_cache_key");
    router.push("/login");
    // store.token=''
}
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import "../../style/common.less";

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
        font-size: 0.65rem;
        .header {
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 2.8rem;
                height: 2.8rem;
                border-radius: 50%;
            }
            span {
                margin-top: 8px;
                color: #fb619c;
            }
        }
        .item {
            .sex {
                display: flex;
                align-items: center;
                margin: 0 16px;
                height: 2.2rem;
                border-bottom: 1px solid rgb(245, 245, 245);
                .left {
                    width: 4.8rem;
                }
                .right {
                    display: flex;
                    align-items: center;
                    input {
                        margin-right: 4px;
                    }
                    input:nth-child(1) {
                    }
                    input:nth-child(2) {
                        margin-left: 16px;
                    }
                }
            }
        }
    }
    footer {
        width: 100%;
        padding: 0 12px;
        display: flex;
        flex-direction: column;
        button {
            border: none;
            font-size: 0.7rem;
            width: 100%;
            height: 30px;
            border-radius: 20px;
        }
        button:nth-child(1) {
            background-color: #fb619c;
            color: white;
        }
        button:nth-child(2) {
            margin-top: 12px;
            background-color: rgb(219, 219, 219);
        }
    }
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 0.9rem;
    color: #8b8b8b;
}

::v-deep(.van-nav-bar__title) {
    font-size: 0.7rem;
    font-weight: normal;
}
</style>