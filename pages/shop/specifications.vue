<template>
    <view class="page">
        <form @submit="submit">
            <!-- 规格种类 -->
            <view class="card">
                <view class="flex jcsb">
                    <input type="text" placeholder="请输入合适的规格:" v-model="sp" />
                    <view @click="addsp">提交</view>
                </view>
                <view class="flex fs18">
                    <text class="fs24 fwb mgr20">可删除规格</text>
                    <view v-for="(item,index) in splist" :key="index" class="mgr10" @click="desp(item)">{{item}}</view>
                </view>
            </view>
            <!-- 具体属性 -->
            <view class="card" v-for="i in num" :key="i">
                <view class="flex jcsb">
                    <text class="fs28 fwb">规格{{i}}</text>
                    <text v-if="i>1" class="fs18" @click="changeNum('de')">删除</text>
                </view>
                <view class="mgt20">
                    <view class="flex jcsb" v-for="(item,index) in splist" :key="index">
                        <view>{{item}}</view>
                        <input class="mgr30" type="text" :placeholder="'请输入'+item" :name="item" />
                    </view>
                    <view class="flex jcsb">
                        <view>价格</view>
                        <view class="flex">
                            <input type="text" placeholder="请输入价格" name="price" />
                            <text>元</text>
                        </view>
                    </view>
                    <view class="flex jcsb">
                        <view>库存</view>
                        <view class="flex">
                            <input type="text" placeholder="请输入库存" name="goods" />
                            <text>件</text>
                        </view>
                    </view>
                    <view class="flex">
                        <uni-file-picker fileMediatype="image" v-model="path" :limit="1" />
                    </view>
                </view>
            </view>
            <!-- 其他规格 暂时禁用-->
            <!-- <view class="card flex">
                <image src="../../static/addPicture.png" class="ssmImg bordereee" @click="changeNum('add')"></image>
                <view class=" fs24 mgl20 mgt10 c6">规格</view>
            </view> -->
            <!-- 按钮 -->
            <view class="flex">
                <button class="tag" form-type="submit" type="primary">保存</button>
                <button class="tag">取消</button>
            </view>
        </form>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                //数据处理值
                splist: [],
                sp: '',
                num: 1,
                path: [],
                //提交表单值
                imgList: [],
            }
        },
        methods: {
            // 添加规格名
            addsp() {
                this.splist.push(this.sp);
                this.sp = '';
            },
            // 删除规格名
            desp(spName) {
                let index = this.splist.indexOf(spName);
                this.splist.splice(index, 1);
            },
            // 修改规格数量
            changeNum(api) {
                if (api == 'add') {

                    this.num += 1;
                } else if (api == 'de') {
                    this.num -= 1
                }
            },
            //保存数据
            submit: function(e) {
                let spData = e.detail.value;
                // 校验
                // 默认属性不能为空
                if (!(spData.price && spData.goods)) {
                    console.log('基础信息不能为空')
                    return false;
                }
                // 自定义属性不能为空
                this.splist.map(item => {
                    if (spData[String(item)] == '') {
                        console.log(String(item) + '不能为空')
                        return false;
                    }
                })

                console.log(this.path)
                if (this.path.length == 0) {
                    console.log('未上传图片');
                    return false;
                }
                //提取图片地址
                this.path.map(item => {
                    this.imgList.push(item.url)
                })
                spData.path = this.imgList;
                // 添加自定义属性
                let addSp = [];
                this.splist.map(item => {
                    addSp.push(item + ':' + spData[item])
                })
                spData.addSp = addSp;
                uni.setStorageSync('sp', spData);
                uni.navigateTo({
                    url: './addShop'
                })
            }
        }
    }
</script>

<style>
    .ssmImg {
        width: 60rpx;
        height: 60rpx;
    }
</style>
