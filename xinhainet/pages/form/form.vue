<template>
    <view class="page">
        <view class="card">
            <view class="logo flex col center mg8">
                <image src="../../static/logo.png" />
            </view>
            <form @submit="submit">
                <view class="box">
                    <view class="flex mg10">
                        <view class="txt">昵 称:</view>
                        <input type="nickname" name="username" />
                    </view>
                    <view class="flex  mg10">
                        <view class="txt">密 码:</view>
                        <input type="safe-password" name="password" />
                    </view>
                    <view class="flex  mg10">
                        <view class="txt xiu">确认密码:</view>
                        <input type="safe-password" name="check" />
                    </view>
                    <view class="flex center1">
                        <button form-type="submit" type="primary" class="btn">注册</button>
                        <button form-type="reset" class="btn">重置</button>
                    </view>
                </view>
            </form>
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
        onLoad() {

        },
        methods: {
            submit: function(e) {
                if (!e.detail.value.username) {
                    uni.showToast({
                        title: "请输入用户名!",
                        icon: "error"
                    })
                    return;
                }
                if (!e.detail.value.password) {
                    console.log(e.detail.value.password)
                    uni.showToast({
                        title: "请输入密码!",
                        icon: "error"
                    })
                    return;
                }
                if (e.detail.value.password != e.detail.value.check) {
                    uni.showToast({
                        title: "密码不一致!",
                        icon: "error"
                    });
                    return;
                }
                this.username = e.detail.value.username;
                this.password = e.detail.value.password;
                cf('loginWithUser', {
                    username: this.username,
                    password: this.password,
                }).then((res) => {
                    if (res.data.token) {
                        uni.showToast({
                            title: '注册成功',
                            icon: "success"
                        });
                        uni.setStorageSync('username', res.data.username);
                        uni.setStorageSync('token', res.data.token);
                    }
                });
            },
        },
    }
</script>

<style>
    @import "@/public.css";

    .box {
        border: 1px solid #eee;
        width: 500rpx;
        height: 400rpx;
        margin: auto;
        padding-top: 60rpx;
    }

    .txt {
        width: 100rpx;
        font-size: 15rpx;
        margin: auto 20rpx;
    }
</style>
