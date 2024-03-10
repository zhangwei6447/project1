<template>
    <div class="change-box">
        <main>
            <div class="title"><img src="../../image/logo.png" alt="">忘记密码</div>
            <van-cell-group inset>
                <!-- 用户名 -->
                <van-field v-model.trim="username" placeholder="请输入用户名" />
                <!-- 密码 -->
                <van-field v-model.trim="password" type="password" center clearable placeholder="请输入密码">
                </van-field>
                <!-- 新密码 -->
                <van-field v-model.trim="newpassword" type="password" center clearable placeholder="请输入新密码">
                </van-field>
            </van-cell-group>
            <!-- 修改按钮 -->
            <van-button @click="changeEvt" type="primary" block
                color="linear-gradient(97.04deg,#e35e86,#fb619c 54.05%,#ff419d)" id="butn">确认修改</van-button>
            <!-- 返回登录 -->
            <p><span></span><span @click="router.go(-1)">去登录</span></p>
            <!-- 尾部 -->
            <footer class="bottom_title">荟玩科技有限公司 &copy; 2023~10~21</footer>
        </main>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //

import { showToast } from "vant"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { accountLoginApi, updatePasswordApi } from "../../apis/userApi"
import { useCommonStore } from "../../store"

// ===========================变量============================ //
const router = useRouter()
const store = useCommonStore()
const username = ref('')
const password = ref('')
const newpassword = ref('')

// ===========================方法============================ //
/** 修改密码 */
async function changePassword() {
    /** 拿到对应的token */
    let res = await accountLoginApi(username.value, password.value)
    if (res.code !== 200) {
        showToast('账户名或者密码错误')
        return
    }
    /** 存到pinia里面 */
    store.token = res.data.token
    /** 修改密码 */
    let _res = await updatePasswordApi(password.value+'',newpassword.value+'')
    if (_res.code !== 200) {
        return
    }
    showToast('修改密码成功')
    /** 清除pinia里面的token */
    sessionStorage.removeItem('pinia_cache_key')
    router.push('/login')
}
/** 点击事件 */
function changeEvt() {
    changePassword()
}



</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.change-box {
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