<template>
    <view class="page">
        <view v-for="item in groupList" :key="groupId">
            <button @click="dianji(item.groupId)">
                <view class="card">
                    <view class="flex">
                        <view class="title">id:</view>
                        <view class="info">{{item.groupId}}</view>
                    </view>
                    <view class="flex ">
                        <view class="title">组名:</view>
                        <view class="info">{{item.groupName}}</view>
                    </view>
                    <view class="flex ">
                        <view class="title">人数:</view>
                        <view class="info">1</view>
                    </view>
                    <view class="flex">
                        <view class="title">介绍:</view>
                        <view class="info">{{ item.info }}</view>
                    </view>
                </view>
            </button>
        </view>
        <view class="flex jcc">-------别翻了,我是有底线的-------</view>
    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                groupList: [],
            }
        },
        onLoad() {
            let data = uni.getStorageSync("data");
            cf('getMyGroup', {
                username: data.username,
            }).then((res) => {
                this.groupList = res.data.groupList;
            });
        },
        methods: {
            dianji(id) {
                uni.navigateTo({
                    url: '/pages/list/gplist?groupId=' + id,
                })
            }
        }
    }
</script>

<style>
    button {
        width: 600rpx;
    }
</style>
