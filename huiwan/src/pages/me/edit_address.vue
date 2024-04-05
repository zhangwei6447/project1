<template>
    <div class="address-box">
        <!-- 头部导航 -->
        <header id="goods">
            <van-sticky :offset-top="0">
                <van-nav-bar left-arrow @click-left="router.push('/address')">
                    <template #title>
                        <span style="font-size: .7rem;font-weight: bold;">编辑收货地址</span>
                    </template>
                    <template #right>
                        <van-icon name="delete-o" size="1.1rem" color="black" @click="delete_pop = true" />
                    </template>
                </van-nav-bar>
            </van-sticky>
        </header>
        <!-- 内容区域 -->
        <main>
            <van-cell-group inset style="width: 100vw;margin: 0;">
                <!-- 收货人 -->
                <van-field v-model="consignee" label="收货人" label-align="left" placeholder="请输入收货人名字"
                    style="font-size: .7rem;font-weight: normal;" />
                <!-- 手机号 -->
                <van-field v-model="phone" label="手机号" label-align="left" placeholder="请输入手机号"
                    style="font-size: .7rem;font-weight: normal;" />
                <!-- 地区 -->
                <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择省市区" @click="show = true"
                    style="font-size: .7rem;font-weight: normal;" />
                <!-- 详细地址 -->
                <van-field v-model="detail_address" rows="2" autosize label="详细地址" type="textarea" maxlength="50"
                    placeholder="小区、门牌号等，至少4个字" show-word-limit style="font-size: .7rem;font-weight: normal;" />

                <!--  -->
                <div class="default">
                    <span>设为默认地址</span>
                    <van-switch v-model="checked" active-color="#fb619c" inactive-color="#d7d1d1" size="1rem" />
                </div>
            </van-cell-group>

        </main>
        <!-- 底部按钮 -->
        <footer>
            <button :class="[is_ok && 'act']" @click="addAddressEvt()">确认</button>
        </footer>
        <!-- 地区弹出框 -->
        <van-popup v-model:show="show" round position="bottom">
            <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false"
                @finish="onFinish" />
        </van-popup>
        <!-- 删除弹出框 -->
        <van-dialog v-model:show="delete_pop" title="删除地址" message="是否删除收货地址?" show-cancel-button
            @cancel="delete_pop = false" @confirm="deleteEvt()">
        </van-dialog>
    </div>
</template>
<!-- ***************************************************** -->
<script setup>
// ===========================引入============================ //
import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "../../store";
import { useCascaderAreaData } from '@vant/area-data';
import { valiPhone } from "../../utils/cryption";
import { addressDeleteApi, addressQueryApi, addressUpdateApi } from "../../apis/address";
import { showToast } from "vant";

// ===========================变量============================ //
const router = useRouter()
const route = useRoute()
const store = useCommonStore()
// 收货人
const consignee = ref()
// 手机号
const phone = ref()
// 省市县
const fieldValue = ref('');
// 地址信息
const show = ref(false);
const cascaderValue = ref('');
const options = useCascaderAreaData();
const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
}
// 详细地址
const detail_address = ref('')
// 默认地址
const checked = ref(false)
// 确认按钮是否可以
const is_ok = computed(() => {
    if (consignee.value === '') {
        return false
    } else if (!valiPhone(phone.value)) {
        return false
    } else if (fieldValue.value === '') {
        return false
    } else if (detail_address.value === '') {
        return false
    } else {
        return true
    }
})
// 是否为默认值--原始值
const origin_default = ref()
// 删除弹出框
const delete_pop = ref()
// ===========================方法============================ //
/** 删除地址 */
async function deleteEvt() {
    let res = await addressDeleteApi(route.query._id, store.userInfo._id, checked.value)
    console.log(res);
    if (res.code !== 200) return
    showToast('删除成功')
    router.push('/address')
}
/** 修改收货地址 */
async function addAddressEvt() {
    let obj = {
        user_id: store.userInfo._id,
        consignee: consignee.value,
        phone: phone.value,
        province: fieldValue.value.split('/')[0],
        city: fieldValue.value.split('/')[1],
        county: fieldValue.value.split('/')[2],
        detail_address: detail_address.value,
        is_default: origin_default.value || checked.value,
        date: Date.now(),
        _id: route.query._id
    }
    if (!is_ok) return
    let res = await addressUpdateApi(obj)
    showToast('保存成功')
    router.push('/address')
}
/** 获取地址信息 */
watch(
    () => route.query._id,
    async function () {
        let res = await addressQueryApi(route.query._id)
        if (res.code !== 200) return
        console.log(res.data);
        consignee.value = res.data.consignee
        phone.value = res.data.phone
        fieldValue.value = res.data.province + '/' + res.data.city + '/' + res.data.county
        detail_address.value = res.data.detail_address
        checked.value = res.data.is_default
        if (res.data.is_default === true) {
            origin_default.value = JSON.parse(JSON.stringify(res.data.is_default))
        }
    },
    {
        immediate: true
    }
)
</script>
<!-- ***************************************************** -->
<style lang="less" scoped>
@import '../../style/common.less';

.address-box {
    .rel();
    // background-color: rgb(246, 245, 245);
    background-color: white;

    /** 头部导航栏 */
    header {
        width: 100vw;
        height: 44px;

        .van-sticky {
            position: fixed;
        }
    }

    /** 内容区域 */
    main {

        // margin-bottom: 9vh;  
        .default {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 12px;

            span {
                font-size: .7rem;
            }
        }
    }

    /** 底部按钮 */
    footer {
        position: fixed;
        width: 100vw;
        left: 0;
        bottom: 0;
        padding: 10px 12px;

        button {
            width: 100%;
            height: 32px;
            border: none;
            background-color: #fa9cc0;
            color: white;
            border-radius: 20px;
            font-size: .7rem;
        }

        .act {
            background-color: #fb619c;
        }
    }
}

/** 头部 */
::v-deep(.van-nav-bar__content) {
    height: 44px;
    border: none;
}

::v-deep(.van-icon-arrow-left:before) {
    font-size: 1rem;
    color: black;
    border: none;
}
</style>