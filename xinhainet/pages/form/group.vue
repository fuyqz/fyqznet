<template>
    <view class="page">
        <view class="card" v-if="token">
            <view class="top_box">
                <view class="logo flex col center mg8">
                    <image src="../../static/logo.png" />
                </view>
                <form @submit="submit">
                    <view class="flex col center">
                        <view class="flex mg10">
                            <view class="txt">组名:</view>
                            <input type="text" name="groupName" placeholder="组名:" />
                        </view>
                        <view class="flex  mg10">
                            <view class="txt">人数:</view>
                            <input type="number" name="groupnum" placeholder="人数上限:" />
                        </view>
                        <view class="flex  mg10">
                            <view class="txt">状态:</view>
                            <radio-group name="shuxing" class="radio">
                                <label>
                                    <radio value="public" />
                                    公开
                                </label>
                                <label>
                                    <radio value="private" />
                                    私有
                                </label>
                            </radio-group>
                        </view>
                        <view class="flex col">
                            <view class="txt">地区 :</view>
                            <picker bindchange="regionChange" value="{{region}}" mode="region" level="province"
                                name="region">
                                <view class="picker">当前选择: {{region}}</view>
                            </picker>
                        </view>
                        <view class="flex">
                            <view class="txt">简介:</view>
                            <input type="text" name="info" class="info" />
                        </view>
                        <view class="flex center">
                            <button form-type="submit" type="primary" class="btn">创建</button>
                            <button form-type="reset" class="btn">重置</button>
                        </view>
                    </view>
                </form>
            </view>

        </view>
        <view class="card flex center col" v-if="!token">
            <view class="">请登录账号!</view>
            <view class="">不然你让我怎么去确认?</view>
            <navigator url="/pages/form/login" class="btn">登录</navigator>
        </view>
    </view>

</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                token: '',
                region: '',
                groupId: '',
            }
        },
        onLoad() {
            let data = uni.getStorageSync("data");
            this.token = data.token;
        },
        methods: {
            submit: function(e) {
                let u = e.detail.value;
                let username = uni.getStorageSync("data").username;
                cf('createGroup', {
                    ...u,
                    username
                }).then((res) => {
                    uni.setStorageSync("groupId", res.data);
                    uni.redirectTo({
                        url: '/pages/tip/tip',
                    })
                });
                uni.redirectTo({
                    url: '/pages/tip/tip'
                })
            },
            createuser(u) {

            },
            getRegion(e) {
                this.region = e.detail.value.region;
            }
        }
    }
</script>

<style>
    @import "@/public.css";

    .box {
        margin: 40rpx 0 80rpx;
    }

    .txt {
        width: 70rpx;
        margin: 30rpx 10rpx;
    }

    .radio {
        margin: 27rpx 150rpx 0 0;
    }

    .picker {
        width: 401rpx;
        margin: 10rpx 27rpx;
        border-bottom: 1px solid black;
    }

    .info {
        //margin: 10rpx 70rpx;
        border-bottom: 1px solid black;
    }
</style>
