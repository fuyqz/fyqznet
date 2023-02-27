<template>
    <view class="page">
        <view class="card hg100 flex column jcsb">
            <view class="">
                <!-- 分类栏 -->
                <view class="flex jcsb mbc pd8">
                    <text>分类</text>
                    <text>操作</text>
                </view>
                <!-- 详细分类 -->
                <view v-for="(item,index) in classList" :key="index">
                    <view class="flex jcsb mgt20 bb pd8">
                        <text>{{ item }}</text>
                        <view class="">
                            <a class="fs18 tac mgr10 mgt10" @click="open(index)">修改</a>
                            <a class="fs18 tac mgr10 mgt10" @click="deleteList(index)">删除</a>
                        </view>
                    </view>
                </view>

            </view>
            <!-- 弹出层 -->
            <!-- 修改 -->
            <uni-popup ref="inputDialog" type="dialog">
                <uni-popup-dialog ref="inputClose" mode="input" title="修改类" value="" placeholder="请输入内容"
                    @confirm="updateList"></uni-popup-dialog>
            </uni-popup>
            <!-- 新增 -->
            <uni-popup ref="popup" type="bottom" class="pop" background-color="#fff">
                <view class="card mg10" style="height: 120rpx;">
                    <input type="text" placeholder="请输入分类" v-model="addClassfily">
                    <view class="flex jcsa ">
                        <a @click="add">添加</a>
                        <a @click="close">取消</a>
                    </view>
                </view>
            </uni-popup>

            <!-- 按钮 -->
            <view class="">
                <a class="l50" @click="open('add')">+ 新增分类</a>
            </view>
        </view>
    </view>
</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                classList: [],
                addClassfily: '',
                index: '',
            }
        },
        onLoad() {
            cf('createClassfily', {
                tip: 'all'
            }).then(res => {
                console.log(res)
                res.data.data.map(item => {
                    this.classList.push(item.name);
                });

                console.log(this.classList)
            })
        },
        methods: {
            open(api) {
                if (api === 'add')
                    this.$refs.popup.open('bottom');
                else {
                    this.$refs.inputDialog.open();
                    this.index = api
                }

            },
            close() {
                this.$refs.popup.close();
            },
            add() {
                cf('createClassfily', {
                    name: this.addClassfily
                }).then(res => {
                    console.log(res);
                    uni.redirectTo({
                        url: '/pages/shop/white'
                    })
                })
            },
            updateList(val) {
                cf('createClassfily', {
                    tip: 'updateClass',
                    name: this.classList[this.index],
                    rename: val,
                }).then(res => {
                    console.log(res);
                    uni.redirectTo({
                        url: '/pages/shop/white'
                    })
                })
            },
            deleteList(index) {
                cf('createClassfily', {
                    tip: 'deleteClass',
                    name: this.classList[index]
                }).then(res => {
                    uni.redirectTo({
                        url: '/pages/shop/white'
                    })
                });
            }
        }
    }
</script>

<style>
    .bb {
        border-bottom: 1px solid #eee;
    }

    .l50 {
        margin-left: 40%;
    }

    .pop {
        height: 100rpx;
        background-color: #fff;
    }
</style>
