<template>
    <view class="page">
        <view class="card">
            <view class="flex mg10">
                <view class="title">用户名:</view>
                <view class="info">{{ username }}</view>
            </view>
            <view class="flex mg10">
                <view class="title">创建时间:</view>
                <view class="info">{{ createdAt }}</view>
            </view>
        </view>
    </view>
</template>

<script>
    //引入时间格式化
    import {
        parseTime
    } from '@/pages/otherjs/time.js';
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                username: '',
                createdAt: '',
            }
        },
        onLoad() {
            let data = uni.getStorageSync("data");
            cf("getUser", {
                username: data.username
            }).then((res) => {
                this.createdAt = parseTime(res.data.data[0].createdAt, "{y}-{m}-{d}");
                this.username = res.data.data[0].username;
            })
        },
        methods: {

        }
    }
</script>

<style>

</style>
