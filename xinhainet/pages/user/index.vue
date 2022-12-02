<template>
    <view class="page">
        <view class="card">
            <view class="flex col center mg8">
                <image src="../../static/logo.png" mode=""></image>
                <view class="flex mg8">
                    <navigator class="btn" url="/pages/form/login">登录</navigator>
                </view>
                <view v-if="username">用户 : {{ username }} 欢迎使用</view>
                <view class="dbys">
                    <navigator class="menu btn" url="/pages/user/mylist">个人信息</navigator>
                    <navigator class="menu btn" url="/pages/user/mygroup">我的小组</navigator>
                    <navigator class="menu btn" url="/pages/tip/tip">问题反馈</navigator>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                data: '',
                username: '',
                token: ''
            }
        },
        onLoad() {
            let data = uni.getStorageSync('data');
            if (data) {
                this.username = data.username;
            }
        },
        methods: {

        }
    }
</script>

<style>
    @import "@/public.css";

    .dbys {
        margin: 20rpx;
    }

    .menu {
        border-bottom: 1px solid #000;
        margin-top: 40rpx;
    }
</style>
