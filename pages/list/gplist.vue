<template>
    <view class="page">
        <view class="card">
            <view class="flex mg10">
                <view class="title">id:</view>
                <view class="info">{{ group.groupId }}</view>
            </view>
            <view class="flex mg10">
                <view class="title">组名:</view>
                <view class="info">{{ group.groupName }}</view>
            </view>
            <view class="flex mg10">
                <view class="title">人数:</view>
                <view class="info">{{ group.member }}</view>
            </view>
            <view class="flex mg10">
                <view class="title">介绍:</view>
                <view class="info">{{ group.info }}</view>
            </view>
            <view class="flex mg10">
                <view class="title">创始人:</view>
                <view class="info">{{ leader }}</view>
            </view>
            <view class="flex aic">
                <button class="tag aic" @click="joinGroup()">加入</button>
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
                leader: '',
            }
        },
        onLoad(e) {
            let groupId = e.groupId;
            if (groupId) {
                cf("getList", {}).then((res) => {
                    this.group = res.data.groupList[groupId - 1].data;
                    this.leader = this.group.userList[0];
                });
            }

        },
        methods: {
            joinGroup() {
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
                    }
                });
            }
        },
    }
</script>

<style>

</style>
