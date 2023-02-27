<template>
    <view class="page">
        <view v-for="item in groupList" :key="groupId">
            <button @click="dianji(item.data.groupId)" class="btn">
                <view class="card">
                    <view class="flex">
                        <view class="title">id:</view>
                        <view class="info">{{item.data.groupId}}</view>
                    </view>
                    <view class="flex">
                        <view class="title">组名:</view>
                        <view class="info">{{item.data.groupName}}</view>
                    </view>
                    <view class="flex">
                        <view class="title">人数:</view>
                        <view class="info">1</view>
                    </view>
                    <view class="flex">
                        <view class="title">介绍:</view>
                        <view class="info">{{ item.data.info }}</view>
                    </view>
                </view>
            </button>
        </view>
        <view class="flex jcc mg10">----------别翻了,我是有底线的----------</view>
    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                groupList: '',
            }
        },
        onLoad() {
            cf('getList', {}).then((res) => {
                this.groupList = res.data.groupList;
                if (this.groupList) {
                    uni.setStorageSync("groupList", this.groupList);
                }
            });
        },
        methods: {
            dianji(id) {
                uni.navigateTo({
                    url: 'gplist?groupId=' + id,
                })
            }
        },
    }
</script>

<style>
    .btn {
        width: 600rpx;
    }
</style>
