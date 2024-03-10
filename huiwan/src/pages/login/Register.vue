<template>
    <div class="reg-box">
        <van-nav-bar title="新用户注册" left-arrow @click-left="router.go(-1)" />
        <div class="content" id="test">
            <div class="my-form">
                <van-form ref="node">
                    <van-cell-group inset style="margin: 0 0 16px;">
                        <!-- 用户名 -->
                        <van-field v-model="user.username" name="用户名" label="用户名" placeholder="请输入用户名"
                            :rules="[{ required: true, message: '请输入用户名' }]" />
                        <!-- 手机号 -->
                        <van-field v-model="user.phone" name="手机号" label="手机号" placeholder="请输入手机号"
                            :rules="[{ required: true, message: '请输入手机号' }]" />
                        <!-- 密码 -->
                        <van-field v-model="user.password" type="password" name="用户密码" label="用户密码" placeholder="请输入密码"
                            :rules="[{ required: true, message: '请输入密码' }]" />
                        <van-field v-model="re_password" type="password" name="确认密码" label="确认密码" placeholder="请再次输入密码"
                            :rules="[{ required: true, message: promptTxt }]" />
                    </van-cell-group>
                </van-form>
            </div>
            <!-- 点击注册 -->
            <van-button @click="regEvt" :loading="loading" type="primary" block
                color="linear-gradient(97.04deg,#e35e86,#fb619c 54.05%,#ff419d)" id="butn">注册</van-button>
        </div>

    </div>
</template>
<!-- ************************************************ -->
<script setup>
// ======================引入========================= //
import { showToast } from "vant";
import { ref} from "vue";
import { useRouter } from "vue-router";
import { userRegisterApi } from "../../apis/userApi";

// ======================变量========================= //
const router = useRouter()
/** 再次输入密码提示 */
const re_password = ref('')
let promptTxt = ref('请再次输入密码')
/** --------------- */
const node = ref()
const loading = ref(false)
/** 用户信息 */
const user= ref({
    username: '',
    password: '',
    phone: ''
})
// ======================方法========================= //
function regEvt() {
    /** 确认密码 */
    if (user.value.password && re_password.value && user.value.password !== re_password.value) {
        showToast({
            message: '两次输入的密码不一致',
            position: 'top'
        })
        return
    }
    node.value.validate().then(async () => {
        loading.value = true
        let res = await userRegisterApi({
            ...user.value
        })
        loading.value = false
        /** 注册成功 */
        if (res.code === 200) {
            router.push('/login')
            showToast({
                message: '注册成功',
                position: 'top'
            })
        } else {
            /** 用户名已存在 */
            if (res.message === '用戶編碼【' + user.value.username + '】已存在，請重新錄入') {
                showToast({
                    message: '该用户名太受欢迎了，请更换一个',
                    position: 'top'
                })
            /** 电话号码已存在 */
            } else if (res.message === '電話號碼【' + user.value.phone + '】已被注冊，請重新錄入') {
                showToast({
                    message: '该手机号已被注册',
                    position: 'top'
                })
            } else {
                return
            }
        }
    }).catch(() => { })
}
</script>
<!-- ************************************************ -->
<style lang="less" scoped>
@import '../../style/common.less';

.reg-box {
    position: relative;
    height: 100vh;

    >.content {
        padding: 0 @pagePadding;

        >.my-form {
            padding: @pagePadding;
            height: calc(100% - 3rem);
            margin: 0 -@pagePadding;
            overflow-x: hidden;
        }
    }
}

/** 样式穿透 -- v-deep */
::v-deep(.van-nav-bar .van-icon-arrow-left:before) {
    font-size: 1.1rem;
    color: @fc8;
}

::v-deep(.van-nav-bar__title) {
    font-size: .9rem;
}

#butn {
    width: 80vw;
    margin: 0 auto;
    border-radius: 22px;
    margin-top: 40px;
}

::v-deep(.van-field) {
    font-size: .8rem;
}

::v-deep(.van-nav-bar__title) {
    color: @fc8;
}
</style>