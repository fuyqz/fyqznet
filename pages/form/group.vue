<template>
    <view class="page">
        <view class="card" v-if="token">
            <view>
                <view class="flex column aic mg10">
                    <image src="../../static/logo.png" class="img" />
                </view>
                <form @submit="submit">
                    <view class="flex column center">
                        <view class="flex mg10">
                            <view class="mgr20">组名:</view>
                            <input type="text" name="groupName" placeholder="组名:" />
                        </view>
                        <view class="flex mg10">
                            <view class="mgr20">人数:</view>
                            <input type="number" name="groupnum" placeholder="人数上限:" />
                        </view>
                        <view class="flex mg10">
                            <view class="">状态:</view>
                            <radio-group name="shuxing" class="mgl20">
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
                        <view class="flex column mgb20 mgl20">
                            <view class="txt">地区 :</view>
                            <picker bindchange="regionChange" value="{{region}}" mode="region" level="province"
                                name="region">
                                <view class="tab">当前选择: {{region}}</view>
                            </picker>
                        </view>
                        <view class="flex mgl20 column">
                            <view class="mgr20 mgb20">简介:</view>
                            <input type="text" name="info" class="info tab mgb20" />
                        </view>
                        <view class="flex aic">
                            <button form-type="submit" type="primary" class="tag">创建</button>
                            <button form-type="reset" class="tag">重置</button>
                        </view>
                    </view>
                </form>
            </view>

        </view>
        <view class="card flex aic column" v-if="!token">
            <view class="mgb20">请登录账号!</view>
            <view class="mgb20">不然你让我怎么去确认?</view>
            <navigator url="/pages/form/login" class="tag">登录</navigator>
        </view>
    </view>

</template>

<script setup>
    import cf from '../otherjs/cf.js';
    let data = uni.getStorageSync("data");
    let token = data.token;
    let region = '';
    let groupId = '';

    function submit(e) {
        let u = e.detail.value;
        let username = data.username;
        cf('createGroup', {
            ...u,
            username
        }).then((res) => {
            uni.setStorageSync("groupId", res.data);
            uni.redirectTo({
                url: '/pages/tip/tip',
            });
        });
        uni.redirectTo({
            url: '/pages/tip/tip'
        })
    }

    function getRegion(e) {
        region = e.detail.value.region;
    }
</script>
<style>
    .info {
        border-bottom: 1px solid black;
    }
</style>
