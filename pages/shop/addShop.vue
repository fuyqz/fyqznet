<template>
    <view class="page">
        <!-- 标题图片 -->
        <view class="card">
            <view class="flex">
                <text>请输入商品标题：</text>
                <input type="text" placeholder="标题" />
            </view>
            <view class="flex">
                <uni-file-picker fileMediatype="image" v-model="shopPath" :limit="3" />
            </view>
        </view>
        <!-- 视频 -->
        <view class="card">
            <text>添加视频(可选)</text>
            <uni-section title="只选择视频" type="line">
                <view class="flex">
                    <uni-file-picker fileMediatype="image" v-model="shopPath" :limit="3" />
                </view>
            </uni-section>
        </view>
        <!-- 分类 -->
        <view class="card flex jcsb">
            <view class="flex">
                <view class="mgr10">所属分类:</view>
                <view>{{list[index]}}</view>
            </view>
            <picker mode="selector" @change="pick" :range="list" :value="index">
                <text>></text>
            </picker>

        </view>
        <!-- 价格库存 -->
        <view class="card">
            <view class="flex jcsb">
                <text>价格</text>
                <view class="flex"><input type="text" placeholder="请输入价格" class="ipw">元</view>
            </view>
            <view class="flex jcsb">
                <text>库存</text>
                <view class="flex"><input type="text" placeholder="请输入库存" class="ipw">件</view>
            </view>
        </view>
        <!-- 规格 -->
        <view class="card flex column">
            <view>
                <text>创建规格(可选)</text>
            </view>
            <!-- 未添加规格样式 -->
            <view class="mgt10" v-if="ortherSp ==''">
                <img src="/static/addPicture.png" class="smallImg border" @click="specifications">
            </view>
            <!-- 已添加规格样式 -->
            <view class="mgt10 flex jcsb fs18" v-if="ortherSp !=''">
                <view class="flex">
                    <image :src="path" class="smallImg mgr20"></image>
                    <view class="flex column jcsa">
                        <view class="flex column" v-for="(t,index) in ortherSp" :key="index">
                            <view class="flex">
                                <text class="mgr20">{{ t.split(':')[0] }}</text>
                                <text>{{ t.split(':')[1] }}</text>
                            </view>
                        </view>
                        <view>
                            <text class="mgr20">库存</text>
                            <text>{{ goods }}</text>
                            <text>件</text>
                        </view>
                    </view>
                </view>
                <text class="fs24 fwb mgr20 mgt10">{{ price }}元</text>
            </view>

        </view>
        <!-- 商品详情图 -->
        <view class="card">
            <text>商品详情图</text>
            <view class="flex">
                <uni-file-picker fileMediatype="image" v-model="shopPath" :limit="3" />
            </view>
        </view>
        <view class="flex jcc">
            <a class="tag">上传商品</a>
        </view>
    </view>

</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                index: '',
                list: [],
                shopPath: [],
                // 传值回属性
                path: '../../static/logo.png',
                price: '',
                goods: '',
                spData: '',
                ortherSp: [],
            }
        },
        onLoad() {
            cf('createClassfily', {
                tip: 'all'
            }).then(res => {
                res.data.data.map(item => {
                    this.list.push(item.name);
                });
            })
            // 接受返回数据
            let sp = uni.getStorageSync('sp');
            if (sp) {
                //console.log(sp)
                this.goods = sp.goods;
                this.path = sp.path[0];
                this.price = sp.price;
                this.ortherSp = sp.addSp;

                //console.log(ortherSp)
            }
        },
        methods: {
            addImg() {
                console.log('add')
            },
            pick(e) {
                this.index = e.detail.value
            },
            specifications() {
                uni.redirectTo({
                    url: './specifications'
                })
            }
        }
    }
</script>

<style>
    .border {
        border: 1px solid black;
    }

    .ipw {
        width: 150rpx;
    }

    .w140 {
        width: 155rpx;
    }
</style>
