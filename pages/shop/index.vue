<template>
    <view class="page">
        <!-- 收益板块 -->
        <view class="card">
            <!-- 搜索栏 -->
            <!-- <view class="flex jcc">
                <input type="text" class="smallInput" v-model="content" placeholder="搜索" />
                <view class=" mgl20  mgt20">🔍</view>
            </view> -->
            <view class="flex column f1 mgl20 ">
                <text class="fs24 fwb">累计收益(元)</text>
                <text class="mg10 fwb">30</text>
            </view>
            <view class="flex jcsa">
                <view class="flex column">
                    <text class="fwb fs18">今日销售额</text>
                    <text class="fs18 tac mgt10">30</text>
                </view>
                <view class="flex column">
                    <text class="fwb fs18">今日订单数</text>
                    <text class="fs18 tac mgt10">30</text>
                </view>
                <view class="flex column">
                    <text class="fwb fs18">累计订单数</text>
                    <text class="fs18 tac mgt10">30</text>
                </view>
            </view>
        </view>
    </view>
    <!-- 九宫格 -->
    <view class="card flex jcsa">
        <view v-for="(item,index) in title" :key="item">
            <view>
                <smModule :datas="title[index]" :path="pathList[index]"></smModule>
            </view>
        </view>
    </view>
</template>

<script>
    import smModule from '/components//smModule.vue'
    export default {
        components: {
            smModule
        },
        data() {
            return {
                title: ['修改分类', '订单详情', '添加商品', '未定义2', '未定义3'],
                pathList: ['/pages/shop/list', '/pages/shop/shopLIst', '/pages/shop/addShop']
            }
        }

    }
</script>

<style>
    .boder {
        border: 1px solid red;
    }

    .smimg {
        width: 50rpx;
        height: 50rpx;
    }
</style>
