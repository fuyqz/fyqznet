<template>
    <view class="page">
        <view class="card">
            <view class="logo flex column aic mg10">
                <image src="../../static/logo.png" class="img mg20" />
            </view>
            <view class="flex column aic">
                <input v-model="username" placeholder="用户名:" />
                <input v-model="password" placeholder="密码:" />
                <view class="flex mg20">
                    <a url="#" class="tag mgr20" @click="login()">登录</a>
                    <navigator url="/pages/form/form" class="tag">注册</navigator>
                </view>
                <view class="fs18">
                    <a>忘记密码</a>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup>
    import cf from '../otherjs/cf.js';
    let username = '';
    let password = '';
    let loading = true;

    function login() {
        uni.showLoading({});
        cf('loginWithUser', {
            username,
            password
        }).then((res) => {
            this.loading = false;
            uni.hideLoading({});
            if (res.data.token) {
                uni.setStorageSync('data', {
                    token: res.data.token,
                    username: res.data.user.username,
                })
            }
            uni.showToast({
                title: "登陆成功!",
                icon: "success"
            });
            uni.reLaunch({
                url: '/pages/user/index'
            })
        }).catch(e => {
            console.log(e);
            uni.showToast({
                title: "登陆失败!",
                icon: "error"
            })
        })
    }
</script>

<style>
    .xiu {
        width: 107rpx;
        height: 50rpx;
    }

    .txt {
        font-size: 30rpx;
        border-bottom: 1px solid black;
    }
</style>
