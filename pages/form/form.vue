<template>
    <view class="page">
        <view class="card">
            <view class="logo flex column aic mg10">
                <image src="../../static/logo.png" class="img" />
            </view>
            <form @submit="submit">
                <view class="box fs18">
                    <view class="flex mg10">
                        <view class="txt">昵 称:</view>
                        <input type="nickname" v-model="user.username" placeholder="请输入昵称" />
                    </view>
                    <view class="flex mg10">
                        <view class="txt">密 码:</view>
                        <input type="safe-password" v-model="user.password" placeholder="请输入密码" />
                    </view>
                    <view class="flex  mg10">
                        <view class="txt xiu">确认密码:</view>
                        <input type="safe-password" v-model="user.check" placeholder="确认密码" />
                    </view>
                    <view class="flex jcsa">
                        <a class="tag" @click="click">注册</a>
                        <a form-type="reset" class="tag">重置</a>
                    </view>
                </view>
            </form>
        </view>
    </view>

</template>
<script setup>
    import cf from '../otherjs/cf.js';
    import {
        reactive
    } from "vue";
    let user = reactive({
        username: '',
        password: '',
        check: '',
    })

    function click() {
        if (!user.username) {
            uni.showToast({
                title: "请输入用户名!",
                icon: "error"
            })
            return;
        }
        if (!user.password) {
            uni.showToast({
                title: "请输入密码!",
                icon: "error"
            })
            return;
        }
        if (user.password != user.check) {
            uni.showToast({
                title: "密码不一致!",
                icon: "error"
            });
            return;
        }
        cf('loginWithUser', {
            username: user.username,
            password: user.password,
            login: 1,
        }).then((res) => {
            if (res) {
                if (res.data.token) {
                    uni.showToast({
                        title: '注册成功',
                        icon: "success"
                    });
                    uni.setStorageSync('username', res.data.username);
                    uni.setStorageSync('token', res.data.token);
                }
            }
        });
    }
</script>

<style>
    .box {
        border: 1px solid #eee;
        width: 500rpx;
        height: 500rpx;
        margin: auto;
        padding-top: 60rpx;
    }

    .txt {
        width: 130rpx;

    }
</style>
