<template>
    <view class="page">
        <!-- 标题 -->
        <view class="flex jcc">
            <image src="../../static/logo.png" class="img mg20" />
            <text class="fs32 fwb mgt20">浮云net</text>
        </view>
        <!-- 顶部 -->
        <view class="card" v-if="data.username">
            <view class="flex jcsb">
                <view class="mg10">用户:{{ data.username }}</view>
                <view class="mg10 ">欢迎使用</view>
            </view>
        </view>
        <!-- 上半部分软件介绍 -->
        <view class="card">
            <view class="logo flex jcsa">
                <navigator url="" class="fwb fs24">小程序相关</navigator>
                <navigator url="" class="fwb fs24">联系我们</navigator>
            </view>
        </view>
        <view class="mg40">功能详情</view>
        <view class="card flex column aic">
            <!-- 下半部分用户区域 -->
            <view class="flex column mg10">
                <view class="flex jcsa">
                    <navigator class="fwb mg10" url="/pages/form/group">创建团</navigator>
                    <navigator class="fwb mg10" url="/pages/list/list">加入团</navigator>
                    <navigator class="fwb mg10" url="/pages/user/mygroup">我的团</navigator>
                </view>
                <view class="flex jcsa">
                    <navigator class="fwb mg10" url="/pages/tip/tip?text=NO!">不需要</navigator>
                    <navigator class="fwb mg10" url="/pages/shop/index">小商城</navigator>
                    <navigator class="fwb mg10" url="">占位符</navigator>
                </view>
            </view>
        </view>

    </view>
</template>

<script setup>
    import {
        reactive,
        watch
    } from 'vue';

    let data = reactive({});
    data = uni.getStorageSync("data");
</script>

<style>

</style>
