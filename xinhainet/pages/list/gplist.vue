<template>
    <view class="page">
        <view class="card">
            <view class="flex txt">
                <view class="title">id:</view>
                <view class="info">{{ group.groupId }}</view>
            </view>
            <view class="flex txt">
                <view class="title">组名:</view>
                <view class="info">{{ group.groupName }}</view>
            </view>
            <view class="flex txt">
                <view class="title">人数:</view>
                <view class="info">{{ group.member }}</view>
            </view>
            <view class="flex txt">
                <view class="title">介绍:</view>
                <view class="info">{{ group.info }}</view>
            </view>
            <view class="flex txt">
                <view class="title">创始人:</view>
                <view class="info">{{ group.userList[0] }}</view>
            </view>
            <view class="flex center1">
                <button class="btn center1" @click="joinGroup()">加入</button>
            </view>

        </view>
    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                group: '',
                groupList: '',
            }
        },
        onLoad(e) {
            let groupId = e.groupId;
            this.group = uni.getStorageSync("groupList")[groupId - 1].data;
        },
        methods: {
            joinGroup() {
                //let token = uni.getStorageSync("data").token;
                let username = uni.getStorageSync("data").username;
                cf('joinGroup', {
                    groupId: this.group.groupId,
                    username
                }).then((res) => {
                    if (res.success) {
                        this.groupList = res.data.userList;
                        this.group.member = this.groupList.length;
                        uni.showToast({
                            title: "加入成功!",
                            icon: "success",
                        });
                    } else {
                        uni.showToast({
                            title: res,
                            icon: "error",
                        })
                    }
                });
            }
        },
    }
</script>

<style>
    @import "@/public.css";

    .txt {
        margin: 13rpx 0;
    }

    .title {
        color: #666;
        width: 200rpx;
        flex: 1;
    }

    .info {
        color: #333;
        flex: 3;
    }
</style>
