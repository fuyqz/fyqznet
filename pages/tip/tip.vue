<template>
    <view class="page">
        <view class="card" v-if="!tip">
            <view class="pd40 tac">
                你好,欢迎来到心海net!
            </view>
            <view class="pd40 tac" v-if="false">
                欢迎加入这里
            </view>
            <view class="pd40 tac">
                can can need 组号是:
                <view class="mgt30">{{ groupId }}</view>
            </view>
            <view class="pd40 tac">
                正在前往----->
                <view class="fs18 mgt30">这是一段等待动画</view>
            </view>
        </view>
        <view class="card" v-if="tip">
            <text>退出登录</text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                tip: "",
                groupId: '你好像不需要这个东西',
            }
        },
        onLoad(e) {
            if (e.tip == 'exit') {
                this.tip = e.tip;
            }
            if (!e.text) {
                let id = uni.getStorageSync("groupId");
                if (id) {
                    this.groupId = id;
                }
            } else {
                this.groupId = e.text;
            }
            setTimeout(() => {
                uni.navigateBack();
            }, 3000);
        },
        methods: {

        }
    }
</script>

<style>

</style>
