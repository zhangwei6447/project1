<template>
    <div class="wel-box">
        <div class="brand">荟玩</div>
        <div class="title">从此生活不再宅，一起耍出新精彩！</div>
        <van-circle @click="clickEvt" v-model:current-rate="currentRate" :size="50"
            :text="`${Math.ceil(currentRate / 20)}s`" :color="'#e35e86'" :clockwise="false" :default="''">
        </van-circle>
        <div class="bottom_title">
            荟玩科技有限公司 &copy; 2023~10~21
        </div>
    </div>
</template>
<!-- ******************************************************** -->
<script setup>
// ========================引入============================== //
import { ref, onBeforeMount } from 'vue'
import { useRouter } from "vue-router";
import {AUTO_LOGIN_KEY} from '../../config/common.cfg'
import { useCommonStore } from '../../store';
import { decodeApi } from "../../utils/cryption";
import { autoLoginApi } from '../../apis/userApi';

// ========================变量============================== //
const router = useRouter()
/**
 * currentRate 秒数
 * canState 状态
 */
const currentRate = ref(100)
const canState = ref('loading')
// ========================方法============================== //
/** 定时器 */
let timer = setInterval(() => {
    currentRate.value -= 1
    if (currentRate.value < 0) {
        clearInterval(timer)
        if (canState.value === 'sucess') {
            router.push('/home')
        } else {
            router.push('/login')
        }
    }
}, 50)
/** 点击跳转 */
function clickEvt(){
    if(canState.value==='loading') return
    clearInterval(timer)
    if(canState.value==='sucess'){
        router.push('/home')
    }else{
        router.push('/login')
    }
}
/** 免登录判断 */
onBeforeMount(async function(){
    let cache=localStorage.getItem(AUTO_LOGIN_KEY)
    if(cache){
        useCommonStore().token=decodeApi(cache)
        let res=await autoLoginApi()
        if(res.code===200){
            useCommonStore().token=res.data.token
            useCommonStore().userInfo=res.data
        }else{
            canState.value='error'
        }
    }else{
        canState.value='error'
    }
})

</script>
<!-- ******************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.wel-box {
    .rel();
    background-color: @bc0;
    padding-top: 30vh;

    .brand {
        font-size: 1.5rem;
        text-align: center;
        color: #e35e86;


        &::before {
            @size: 38px;
            content: '';
            display: inline-block;
            background: url(../../image/logo.png) center center / @size @size;
            width: @size;
            height: @size;
            vertical-align: bottom;
            margin-right: 6px;
        }
    }

    .title {
        text-align: center;
        margin-top: 20px;
        font-size: .8rem;
        color: #e35e86;
    }
}

.van-circle {
    position: relative;
    display: inline-block;
    width: var(--van-circle-size);
    height: var(--van-circle-size);
    text-align: center;
    position: absolute;
    right: 15px;
    top: 15px;
}

::v-deep(.van-circle__text) {
    font-size: 1rem;
    font-weight: normal;
}
</style>