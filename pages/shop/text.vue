<template>
    <view class="page">
        <view class="card mg40">
            <view class="flex jcsb tabbar pdh20">
                <view class="flex column aic jcc f1 " :class="{ tab: type === '' }" @click="tab('')">
                    <view>所有</view>
                </view>
                <view class="flex column aic jcc f1" :class="{ tab: type === 'share' }" @click="tab('share')">
                    <view>贡献</view>
                </view>
                <view class="flex column aic jcc f1" :class="{ tab: type === 'coin' }" @click="tab('coin')">
                    <view>金币</view>
                </view>
                <view class="flex column aic jcc f1" :class="{ tab: type === 'score' }" @click="tab('score')">
                    <view>积分</view>
                </view>
                <view class="flex column aic jcc f1" :class="{ tab: type === 'level' }" @click="tab('level')">
                    <view>等级</view>
                </view>
                <view class="flex column aic jcc f1" :class="{ tab: type === 'invite' }" @click="tab('invite')">
                    <view>邀请</view>
                </view>
            </view>
            <view class="area">暂无更多记录</view>
        </view>

        <view class="card">
            <uni-file-picker fileMediatype="image" v-model="imageValue" :limit="1" />
            <button @click="dianji">a</button>
        </view>
    </view>
</template>
<script setup>
    import {
        ref
    } from 'vue';
    const name = ref("aa");

    function btn() {
        name.value = 'cc';
    }
</script>
<script>
    export default {
        data() {
            return {
                user: {},
                list: [],
                type: "",
                imageValue: [],
            }
        },
        onLoad() {

        },
        methods: {
            tab(type) {
                this.type = type;
                console.log(type)
            },
            dianji() {
                console.log(this.imageValue)
            }
        }
    }
</script>
