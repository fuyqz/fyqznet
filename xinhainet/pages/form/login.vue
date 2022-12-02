<template>
    <view class="page">
        <view class="card">
            <view class="logo flex col center mg8">
                <image src="../../static/logo.png" />
            </view>
            <view class="flex col center">
                <input v-model="username" placeholder="用户名:" />
                <input v-model="password" placeholder="密码:" />
                <button class="btn" @click="login()">登录</button>
                <navigator url="/pages/form/form" class="btn xiu">注册</navigator>
            </view>
        </view>
    </view>
</template>
<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            //登录函数逻辑
            login() {
                cf('loginWithUser', {
                    username: this.username,
                    password: this.password
                }).then((res) => {
                    if (res.data.token) {
                        uni.setStorageSync('udata', {
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
            },
        }
    }
</script>

<style>
    @import "@/public.css";

    .xiu {
        border-radius: 10rpx;
    }
</style>
