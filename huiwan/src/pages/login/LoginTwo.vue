<template>
    <div class="logincom">
        <main>
            <div class="title"><img src="../../image/logo.png" alt="">账号登录</div>
            <van-cell-group inset>
                <!-- 用户名 -->
                <van-field v-model="username" placeholder="请输入用户名" />
                <!-- 密码 -->
                <van-field v-model="password" type="password" center clearable placeholder="请输入密码">
                </van-field>
            </van-cell-group>
            <div class="line">
                <!-- 记住账号 -->
                <van-checkbox v-model="rememberAccount" checked-color="#fb619c">是否记住账号？</van-checkbox>
            </div>
            <!-- 免登录 -->
            <div class="line">
                <van-checkbox v-model="autoLogin" checked-color="#fb619c">是同意免登陆？</van-checkbox>
            </div>
            <!-- 登录按钮 -->
            <van-button @click="loginEvt" :disabled="!canLogin" :loading="loading" type="primary" block
                color="linear-gradient(97.04deg,#e35e86,#fb619c 54.05%,#ff419d)" id="butn">登录</van-button>
            <!-- 同意协议 -->
            <div class="line">
                <van-checkbox v-model="agree" checked-color="#fb619c">是否同意<span @click="router.push('/conts')"
                        style="color:#fb619c">《荟玩用户使用协议》</span>？</van-checkbox>
            </div>
            <p><span @click="router.push('/login')">手机号快捷登录</span><span @click="router.push('/change')">忘记密码</span></p>
            <p class="toReg"><span @click="router.push('/register')">没有账号? 去注册</span></p>
            <footer class="bottom_title">荟玩科技有限公司 &copy; 2023~10~21</footer>
        </main>
    </div>
</template>
<!-- ************************************************ -->
<script setup>
// ======================引入========================= //

import { showToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { accountLoginApi } from "../../apis/userApi";
import { AUTO_LOGIN_KEY, REMEMBER_ACCOUNT_KEY } from "../../config/common.cfg";
import { useCommonStore } from "../../store";
import { decodeApi, encodeApi } from "../../utils/cryption";



// ======================变量========================= //
const router=useRouter()
/**
 * username 用户名
 * password 密码
 * remember 记住账号
 * auto 免登录
 * agree 协议
 * loading 登录状态
 * store 
 */
 const username = ref('')
const password = ref('')
const rememberAccount = ref(false);
const autoLogin = ref(false);
const agree = ref(false);
const loading = ref(false)
const store=useCommonStore()
// ======================方法========================= //
async function loginEvt(){
    loading.value=true
    let res=await accountLoginApi(username.value,password.value+'')
    if(res.code!==200){
        loading.value=false
        showToast('登录失败，用户名或者密码错误')
        return
    }
    /** 登录成功 */
    // 缓存用户信息
    store.token=res.data.token
    store.userInfo=res.data

    /** 记住手机号 */
    if(rememberAccount.value){
        localStorage.setItem(REMEMBER_ACCOUNT_KEY,encodeApi(username.value+''))
    }else{
        localStorage.getItem(REMEMBER_ACCOUNT_KEY)
    }
    /** 免登录 */
    if(autoLogin.value){
        localStorage.setItem(AUTO_LOGIN_KEY,encodeApi(res.data.token))
    }else{
        localStorage.getItem(AUTO_LOGIN_KEY)
    }
    showToast('登录成功')
    router.push('/home')
}
/** 记住手机号 */
onMounted(()=>{
    let cache=localStorage.getItem(REMEMBER_ACCOUNT_KEY)
    if(cache){
        username.value=decodeApi(cache)
        rememberAccount.value=true
    }
})

/** 登录按钮是否可用 */
const canLogin = computed(() => {
    return Boolean(agree.value && username.value && password.value)
})
</script>
<!-- ************************************************ -->
<style lang="less" scoped>
@import '../../style/common.less';

.logincom {
    // .rel();
    height: 100vh;
    padding-top: 10vh;

    .van-nav-bar {
        border: none;
        background-color: @bc0;

        .van-nav-bar__content {
            background-color: transparent;
        }
    }

    main {
        height: calc(100vh - 46px);
        padding: 0px 10px;

        .title {
            line-height: 50px;
            text-align: center;
            font-weight: 600;
            // font-size: 24px;
            font-size: 1.1rem;
            font-weight: normal;
            color: @fc8;
            margin-bottom: 20px;
            position: relative;

            img {
                display: block;
                margin-right: 10px;
                width: 24px;
                height: 24px;
                position: absolute;
                left: 100px;
                // top: 28px;
                top: calc(50% - 12px);
            }
        }

        .van-cell-group {
            background-color: transparent;
            // border: 0px 20px;

            .van-field {
                width: 80vw;
                background-color: transparent;
                // font-size: 1rem;
                font-size: .8rem;
                margin: 10px auto;
                border-bottom: 1px solid @fc3;
            }
        }

        #butn {
            width: 80vw;
            margin: 0 auto;
            border-radius: 22px;
            margin-top: 20px;
        }

        p {
            display: block;
            width: 80vw;
            margin: 0 auto;
            margin-top: 10px;

            span {
                display: inline-block;
                font-size: 14px;
                color: @fc3;

                &:hover {
                    border-bottom: 1px solid @fc2;
                }

                &:nth-child(2) {
                    float: right;
                }
            }
        }

        .toReg {
            text-align: right;
            font-size: .7rem;
            cursor: pointer;
        }

        .line {
            width: 80vw;
            background-color: transparent;
            font-size: 0.8rem;
            margin: 20px auto;
            font-size: .6rem;
        }
    }
}

// 复选框
::v-deep(.van-checkbox__icon) {
    font-size: .9rem;
}

::v-deep(.van-nav-bar__text) {
    color: @fc3;
    font-size: 1rem;
}

::v-deep(.van-icon-arrow-left:before) {
    color: @fc3;
    font-size: 1rem;
}

::v-deep(.van-hairline--bottom:after) {
    border: none;
}
</style>