<template>
    <view class="page">
        <view class="card">
            <!-- 上半部分软件介绍 -->
            <view class="logo flex col center">
                <text class="top_tip cu">浮云net</text>
                <text class="mg8">一款练习时长两年半的项目</text>
                <image src="../../static/logo.png" />
                <text class="mg8">在这里你能够:
                    <text class="cu">唱,跳,rap,篮球</text>
                </text>
                <text>点击下方加入我们!</text>
            </view>
            <!-- 下半部分用户区域 -->
            <view class="flex center col mg8">
                <view class="flex">
                    <navigator class="btn" url="/pages/form/group">创建群组</navigator>
                    <navigator class="btn" url="/pages/list/list">找群</navigator>
                </view>
                <view class="flex">
                    <navigator class="btn" url="/pages/tip/tip?text=NO!">孤身一人</navigator>
                    <navigator class="btn" url="/pages/user/mygroup">我的群组</navigator>
                </view>

            </view>
        </view>
    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {

            }
        },
        onLoad() {

        },
        methods: {

        }
    }
</script>

<style>
    @import "@/public.css";

    /* 其他 */
    .top_tip {
        font-size: 30rpx;

    }

    .logo {
        background-color: #fff;
        padding: 40rpx;
    }
</style>
