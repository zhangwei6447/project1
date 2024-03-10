<template>
    <div class="conts-box">
        <header>
            <van-nav-bar title="荟玩用户使用协议" left-arrow @click-left="router.go(-1)" />
        </header>
        <main v-html="conts"></main>
    </div>
</template>
<!-- ***************************************************** -->
<script lang="ts" setup>
// ===========================引入============================ //
import { ref } from "vue"
import { useRouter } from "vue-router";
import { suggestInfoApi } from "../../apis/userApi";
// ===========================变量============================ //
const conts = ref('')
const router=useRouter()
// ===========================方法============================ //
async function getConts() {
    let d = await suggestInfoApi()
    if (d.code === 200) {
        conts.value = d.data
    }
}
getConts()
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';
.conts-box{
    .rel();
    header{

    }
    main{
        height: calc(100% - 46px);
        padding: 10px 15px 0;
        font-size: .7rem;
        overflow-x: hidden;
    }
}
::v-deep(.van-icon-arrow-left:before){
    font-size: 1rem;
    color: @fc2;
}
::v-deep(.van-nav-bar__title){
    font-size: .8rem;
}
</style>