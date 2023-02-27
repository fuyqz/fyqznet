<template name='smModule'>
    <view class="flex column" @click="to">
        <image src="/static/icon/index.png" class="smimg mg10"></image>
        <text class="fs18 ">{{ datas }}</text>
    </view>
</template>

<script>
    export default {
        props: ['datas', 'path'],
        methods: {
            to() {
                uni.redirectTo({
                    url: this.path
                })
            }
        }
    }
</script>

<style>
    .smimg {
        width: 50rpx;
        height: 50rpx;
    }
</style>
