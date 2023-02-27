<template>
    <view class="page">
        <view class="card flex column">
            <text class="mgb20">欢迎使用</text>
            <text class="fs24 mgb20">选择你查询的人</text>
            <view class="flex  mg8">
                <button @click="user('me')" class="tag">me</button>
                <button @click="user('bin')" class="tag">斌</button>
                <button @click="user('ju')" class="tag">居</button>
                <button @click="user('min')" class="tag">小号</button>
            </view>
            <view class="fs18 flex column mg40">
                <text>数据:查询30天的记录</text>
                <text>卡池类型:切换卡池数据</text>
                <text>清空:切换用户记得清除</text>
                <text>项目暂时废弃</text>
            </view>
            <view class="flex mg10">
                <button @click="getIt()" class="tag">数据</button>
                <button @click="qingkong()" class="tag">清空</button>
            </view>

            <view class="box flex aic column">
                <text class="txt"></text>
                <button v-for="item in cardName" @click="seeCard(item)" class="btn xiu">{{ item }}</button>
                <view v-if="isflag">
                    <view class="topStart">五星</view>
                    <view class="box">
                        <view v-for="item in list5" :title="item" class="flex box">
                            <view class="title">{{ item.split(',')[0] }} </view>
                            <view class="">{{ item.split(',')[1] }} </view>
                        </view>
                    </view>
                    <view class="topStart">六星</view>
                    <view class="box">
                        <view v-for="item in list6" :title="item" class="flex box">
                            <view class="title">{{ item.split(',')[0] }} </view>
                            <view class="">{{ item.split(',')[1] }} </view>
                        </view>
                    </view>
                    <view class="flex box">
                        <view class="title">已垫:</view>
                        <view>{{ this.index6 }}</view>
                    </view>
                </view>

            </view>
        </view>


    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: '',
                text: [],
                list: [],
                list5: [],
                list6: [],
                index6: [],
                isflag: false,
                cardName: [],
                last: [],
            }
        },
        methods: {
            get() {
                if (this.url == '') {
                    uni.showToast({
                        icon: 'error',
                        title: 'NO URL!'
                    })
                    return '';
                }
                for (var i = 1; i < 20; i++) {
                    uni.request({
                        url: 'https://ak.hypergryph.com/user/api/inquiry/gacha?page=' + i + this.url,
                        method: 'GET',
                        data: {
                            list5: [],
                            list6: [],
                        },
                        success: res => {
                            let list1 = [];
                            let u = res.data.data.pagination.current - 1;
                            if (res.data.data.list.length != 0) {
                                this.text[u] = res.data.data.list;
                                // for (var i = 0; i < res.data.data.list.length; i++) {
                                //     if (res.data.data.list[i]['chars'].length == 10) {
                                //         for (var j = 0; j < 10; j++) {
                                //             list1.push(res.data.data.list[i]['chars'][j]);
                                //         }
                                //     } else {
                                //         list1.push(res.data.data.list[i]['chars'][0]);
                                //     }
                                // }
                            }
                            //this.list.push([u, list1]);
                            setTimeout(() => {}, 2000);
                            clearTimeout();
                        },
                        fail: (error) => {
                            console.log(error);
                        },
                    });
                }
            },

            fenxi() {
                //这里是新的分析方法
                this.text = [].concat(...this.text);
                //将数据解构成数组
                let utext = [];
                for (let i in this.text) {
                    if (this.text[i].chars.length == 10) {
                        for (let j = 0; j < 10; j++) {
                            utext.push({
                                ts: this.text[i].ts,
                                pool: this.text[i].pool,
                                chars: [this.text[i].chars[j]]
                            })
                        }
                    } else {
                        utext.push({
                            ts: this.text[i].ts,
                            pool: this.text[i].pool,
                            chars: [this.text[i].chars[0]]
                        });
                    }
                }
                utext = utext.reverse();
                let timeLast = utext[utext.length - 1].ts;
                //提取卡池名
                let cardName = [...new Set(utext.map(i => i.pool))];
                this.cardName = cardName;
                //分别存储各卡池的记录
                utext = cardName.map(i =>
                    utext.filter(j =>
                        j.pool == i
                    )
                ).map(i =>
                    i.map(j => j.chars)
                );
                console.log(utext)
                //第二轮筛选 五星和六星的抽数
                for (let i = 0; i < utext.length; i++) {
                    let index5 = 0;
                    let index6 = 0;
                    let p5 = [];
                    let p6 = [];
                    for (let j = 0; j < utext[i].length; j++) {
                        if (utext[i][j][0].rarity == 4) {
                            index5 += 1;
                            p5.push(utext[i][j][0]['name'] + ',' + index5);
                            index6++;
                            index5 = 0;
                        } else if (utext[i][j][0].rarity == 5) {
                            index6 += 1;
                            p6.push(utext[i][j][0]['name'] + ',' + index6);
                            index5++;
                            index6 = 0;
                        } else {
                            index5++;
                            index6++;
                        }
                    }
                    this.list5.push(p5);
                    this.list6.push(p6);
                    this.index6.push(index6);
                    console.log(p5, p6, this.index6)
                    p5, p6 = [];

                }

                //合并数据               
                for (let i = 0; i < this.list5.length; i++) {
                    this.last.push({
                        cardName: cardName[i],
                        list5: this.list5[i],
                        list6: this.list6[i],
                        remain: this.index6[i]
                    })
                }
            },
            //清空列表,隐藏显示
            qingkong() {
                this.isflag = false;
                this.url = '',
                    this.last = [];
                this.cardName = [];
            },
            //切换 url
            user(user_name) {
                if (user_name == 'me') {
                    this.url =
                        '&token=zUgUra6IlDIm5BzAAfUn7iT49v8TWTxrCcWcI2bdb5hodDMKDakhMMyFp%2FEUmCN9jBFez%2BNTaa7aXGhAyaBC9AmfVhirOhoYP4ZYHOpFBVlXrhVlOOEJfcgLFtYzTSaX6eeVCf9HDnS8ORHu4%2FSrVYg48KhRXGShF8QO9mkolVLvBGKnovAxQ3xAMOsnEvBlL1jEsSHVp8T3&channelId=2';
                    uni.showToast({
                        icon: 'success',
                        title: '已选中 我'
                    })
                } else if (user_name == 'bin') {
                    this.url =
                        '&token=itwvM1uLq8vkYk2p0Z3ucZIwkEoy1fmoUFpH5GUCfkZaUoeFwMg5HZ4mKVYuPcQeE%2BBpCFPAINc2HzHlvnU5xa%2BwnR9WvY1x2RxlnyjkkR4E%2FMi7dEgODkf8IYtiUGVZ6IW8CN0fbUgYrq7gw6yviaTeyHaWr4rpOsBJZQqWBZ866yZ4k57zKYKQ%2BOUQhMkz4VomDzoXVwRE&channelId=2';
                    uni.showToast({
                        icon: 'success',
                        title: '已选中 斌'
                    })
                } else if (user_name == 'ju') {
                    this.url =
                        '&token=quLg2iBp%2Bl6oUuhnzOCpUxLOo3P3F8HpuH82fhhR4vS0KhOef6XG58xCy19R56EYN3iiawg1xfxdWeiMYWGgL4D9PM%2FqDwIhuGnnZkLc5TiKpLD99s1bd6vpzZmFZkl6J3aZmf6MUbdFmK64sGu9zvPbI0IKP0e7W1gEJfXCP5lm%2B7n84cppT3Bgc5MtWG38YIOHFRVPT5iQ&channelId=2';
                    uni.showToast({
                        icon: 'success',
                        title: '已选中 居'
                    })
                } else if (user_name == 'min') {
                    this.url =
                        '&token=Gs2PllmrPkGWaRbK7UN2GUGv39%2B1JHQrEW3%2F4TCeAofX4gJGXgnxxKddCuM%2BQd8Sdprq8DF5p7QcPZpmoUFPUy7eY8A5v1G4SdMo%2Fzwyt5b5A9F1jW1QX4dzBDgV%2FwRCfU1X%2BzzWUUC3xrUgdw1dYFlGnrA4rBPyWkyLFBfutv1RA%2BNWnmI3stmTf1i1jA57lDquunKstACF&channelId=2'
                    uni.showToast({
                        icon: 'success',
                        title: '已选中 小'
                    })
                }

            },

            //查询单个卡池信息
            seeCard(cardName) {
                this.isflag = true;
                let u = this.last.filter(i => i.cardName == cardName)[0];
                this.list5 = u.list5;
                this.list6 = u.list6;
                this.index6 = u.remain;
            },

            //合并读取数据和计算按钮
            getIt() {
                this.get();
                let that = this;
                uni.showToast({
                    icon: 'loading',
                    title: "请等待5s!!!!"
                })
                setTimeout(() => {
                    that.fenxi();
                }, 5000);
            }
        }
    }
</script>

<style>
    text {
        text-align: center;
    }

    .tip {
        font-size: 31rpx;
        line-height: 50rpx;
    }

    .topStart {
        margin-top: 30rpx;
        text-align: center;
    }

    .title {
        width: 100rpx;
        margin-right: 30rpx;
    }

    .box {
        border: 1px solid #eee;
    }
</style>
