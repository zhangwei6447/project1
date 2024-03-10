<template>
    <div class="logincom">
        <!-- <van-nav-bar right-text="注册" @click-right="goregister" /> -->
        <main>
            <div class="title"><img src="../../image/logo.png" alt="">手机号登录</div>
            <van-cell-group inset>
                <!-- 手机号 -->
                <van-field v-model.trim.number="phone" placeholder="请输入手机号" />
                <!-- 验证码 -->
                <van-field v-model.trim="code" center clearable placeholder="请输入短信验证码">
                    <template #button>
                        <van-button @click="getCodeEvt" size="small" type="primary"
                            color="linear-gradient(97.04deg,#e35e86,#fb619c 54.05%,#ff419d)">{{ codeMsg }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <!-- 记住手机号 -->
            <div class="line">
                <van-checkbox v-model="rememberPhone" checked-color="#fb619c">是否记住手机号？</van-checkbox>
            </div>
            <!-- 同意免登录 -->
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
            <!-- 账号密码登录   忘记密码 -->
            <p><span @click="router.push('/logintwo')">账号密码登录</span><span @click="router.push('/change')">忘记密码</span></p>
            <!-- 去注册 -->
            <p class="toReg"><span @click="router.push('/register')">没有账号? 去注册</span></p>
            <footer class="bottom_title">荟玩科技有限公司 &copy; 2023~10~21</footer>
        </main>
    </div>
</template>
<!-- ************************************************ -->
<script setup>
// ======================引入========================= //
import { onMounted, ref, computed } from 'vue'
import { useRouter } from "vue-router";
import { useCommonStore } from '../../store';
import { decodeApi, encodeApi, valiPhone } from '../../utils/cryption'
import { showToast } from "vant";
import { userCodeApi, phoneLoginApi } from '../../apis/userApi'
import { REMEMBER_PHONE_KEY, AUTO_LOGIN_KEY } from '../../config/common.cfg'
// ======================变量========================= //
const router = useRouter()
/**
 * code 验证码
 * codeMsg 验证码提示
 * phone 手机号码
 * agree 协议
 * loading 登录状态
 * store 缓存用户信息
 * 
 */
const code = ref('')
const codeMsg = ref('获取验证码')
const phone = ref('')
const agree = ref(false)
const loading = ref(false)
const store = useCommonStore()
const rememberPhone = ref(false)
const autoLogin = ref(false)

// ======================方法========================= //
/** 点击获取验证码 */
async function getCodeEvt() {
    /** 验证手机号 */
    // if (!valiPhone(Number(phone.value))) {
    //     showToast('请输入正确的手机号')
    //     return
    // }
    /** 获取验证码 */
    if (codeMsg.value !== '获取验证码') return
    codeMsg.value = '获取中'
    let res = await userCodeApi(phone.value+'')
    console.log(res);
    if (res.code === 200) {
        codeMsg.value = '重新获取(60s)'
        showToast('验证码' + res.data.code)
        countDown(Date.now())
    } else {
        codeMsg.value = '获取验证码'
        showToast('获取验证码失败，请重试')
    }
}
/** 验证码倒计时 */
function countDown(t) {
    let time = 60 - Math.ceil((Date.now() - t) / 1000)
    if (time > 0) {
        codeMsg.value = '重新获取' + time + 's'
        setInterval(() => {
            countDown(t)
        }, 100)
    } else {
        codeMsg.value = '获取验证码'
    }
}
/** 登录事件 */
async function loginEvt() {
    loading.value = true
    let res = await phoneLoginApi(phone.value + '', code.value + '')
    /** 登录失败 */
    if (res.code !== 200) {
        showToast('登录失败，验证码错误，请重新输入')
        loading.value = false
        return
    }
    /** 登录成功 */
    // 缓存用户信息
    store.token = res.data.token
    store.userInfo = res.data

    /** 记住手机号 */
    if (rememberPhone.value) {
        localStorage.setItem(REMEMBER_PHONE_KEY, encodeApi(phone.value + ''))
    } else {
        localStorage.getItem(REMEMBER_PHONE_KEY)
    }
    /** 免登录 */
    if (autoLogin.value) {
        localStorage.setItem(AUTO_LOGIN_KEY, encodeApi(res.data.token))
    } else {
        localStorage.getItem(AUTO_LOGIN_KEY)
    }

    showToast({
        message: '登录成功',
        duration: 1
    })
    router.push('/home')
}
/** 记住手机号 */
onMounted(() => {
    let cache = localStorage.getItem(REMEMBER_PHONE_KEY)
    if (cache) {
        phone.value = parseInt(decodeApi(cache)) + ''
        rememberPhone.value = true
    }
})
/** 登录按钮是否可用 */
const canLogin = computed(() => {
    return agree.value && valiPhone(Number(phone.value)) && /^[0-9]{4}$/.test(code.value)
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
            font-size: 1.1rem;
            color: @fc8;
            margin-bottom: 20px;
            position: relative;

            img {
                display: block;
                margin-right: 10px;
                width: 24px;
                height: 24px;
                position: absolute;
                left: 90px;
                top: 28px;
                top: calc(50% - 12px);
                // top: 10px;
            }
        }

        .van-cell-group {
            background-color: transparent;

            .van-field {
                width: 80vw;
                background-color: transparent;
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
                cursor: pointer;

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
    font-size: .9rem;
}

::v-deep(.van-icon-arrow-left:before) {
    color: @fc3;
    font-size: .9rem;
}

::v-deep(.van-hairline--bottom:after) {
    border: none;
}
</style>