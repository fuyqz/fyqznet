<template>
    <view class="page">
        <view class="card">
            <view class="flex column aic mg10">
                <image src="../../static/logo.png" mode="" class="img mgb20"></image>
                <view v-if="username" class="mg10">用户 : {{ username }} 欢迎使用</view>
                <view class="flex mgt40">
                    <navigator class="mg20 tag" url="/pages/form/login" v-if="!username">登录</navigator>
                    <navigator class="mg20 tag" url="/pages/tip/tip?tip=exit" @click="exit()" v-if="username">退出登录
                    </navigator>
                </view>
                <view>
                    <navigator class="mg20 tag" url="/pages/user/mylist">个人信息</navigator>
                    <navigator class="mg20 tag" url="/pages/user/mygroup">我的小组</navigator>
                    <navigator class="mg20 tag" url="/pages/mrfz/index">舟舟查询</navigator>
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
                token: '',
            }
        },
        onLoad() {
            let data = uni.getStorageSync('data');
            if (data) {
                this.username = data.username;
            }
        },
        methods: {
            exit() {
                uni.clearStorageSync();
                this.username = '';
            },
        }
    }
</script>

<style>

</style>
