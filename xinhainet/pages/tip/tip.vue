<template>
    <view class="page">
        <view class="card">
            <view class="txt">
                你好♂,欢迎来到♂ 世界!
            </view>
            <view class="txt" v-if="false">
                欢迎加入只因社
            </view>
            <view class="txt">
                can can need 组号是:
                <view class="gpid">{{ groupId }}</view>
            </view>
            <view class="txt">
                正在前往极乐净土
                <view style="font-size: 1rpx; margin-top:30rpx;">这是一段等待动画</view>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                groupId: '你好像不需要这个东西',
            }
        },
        onLoad(e) {
            if (!e.text) {
                let id = uni.getStorageSync("groupId");
                if (id) {
                    this.groupId = id;
                }
            } else {
                this.groupId = e.text;
            }
        },
        methods: {

        }
    }
</script>

<style>
    .felx {
        display: flex;
    }

    .center {
        justify-content: center;
    }

    .txt {
        padding: 40rpx;
        text-align: center;
    }

    .page {
        background-color: #e7e7e7;
        padding: 20rpx;
        min-height: 100vh;
    }

    .card {
        margin: 40rpx;
        background-color: #fff;
        padding: 20rpx;
        border-radius: 12rpx;
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
            rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
    }

    .gpid {
        margin: 30rpx 0 0 0;
    }
</style>
