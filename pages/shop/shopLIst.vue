<template>
    <view class="page flex">
        <!-- 左边 -->
        <view class="flex column f1 hg100">
            <view v-for="(item,index) in classList" :key="index">
                <view class="khg tac lh20 br cbl" @click="ck(item)">
                    {{ item }}
                </view>
            </view>
        </view>
        <!-- 右边 -->
        <view class="f2 hg100 wbc flex column jcsb">
            <!-- 商品 -->
            <view class="mg20 flex jcsb" v-if="flag1">
                <!-- 详细介绍 -->
                <view class="flex">
                    <view class="smallImg mgt10">
                        <img src="/static/logo.png">
                    </view>
                    <view class="flex column fs18">
                        <text class="mx fs32">{{ goodsList.name }}</text>
                        <text>简介{{ goodsList.tip }}</text>
                        <text class="c8 mgt10">库存 {{goodsList.num}}</text>
                        <text>${{ goodsList.price }}</text>
                    </view>
                </view>
                <view class="mgb" v-if="flag1">
                    <botton class="tag" @click="pull(0)">下架</botton>
                </view>
            </view>
            <!-- 底部按钮 -->
            <view class="flex">
                <text class="f1 tac gbc h50" @click="fy('cfy')">管理分类</text>
                <text class="f1 tac mbc" @click="fy('addgood')">添加商品</text>
            </view>
        </view>


    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                flag: false,
                flag1: true,
                classList: [],
                goodsList: {
                    name: '商品名',
                    num: '10',
                    tip: 'aaaaa',
                    price: '10',
                }
            }
        },
        onLoad() {
            cf('createClassfily', {
                tip: 'all'
            }).then(res => {
                res.data.data.map(item => {
                    this.classList.push(item.name);
                });

                console.log(this.classList)
            })
        },
        methods: {
            // 导航菜单
            ck(i) {
                console.log('点击了' + i);
            },
            // 跳转按钮
            fy(tip) {
                if (tip == 'cfy') {
                    uni.redirectTo({
                        url: './list'
                    })
                } else if (tip == 'addgood') {
                    uni.redirectTo({
                        url: './addShop'
                    })
                }
            },
            pull(i) {
                this.goodsList = [];
                this.flag1 = false;
            }
        }
    }
</script>

<style>
    /* * {
        border: 1px solid red;
    } */

    .mx {
        max-width: 180rpx;
    }

    .khg {
        height: 70rpx;
    }

    .mgb {
        margin-top: 80rpx;
    }

    .h50 {
        height: 50rpx;
    }

    .cbl:hover {
        background-color: #fff;
    }
</style>
