<template>
    <view class="page">
        <view class="card" v-if="!flag">
            <view class="flex aic mg40">
                <input type="text" class="input" v-model="user.content" placeholder="留言">
                <button type="primary" @click="publish()" class="tag mgl20 smButton">发布</button>
            </view>
            <view v-for="(item,index) in list" :key="index">
                <view class="mg40 pd8 tab flex card column">
                    <view class=" fs18 mg10 tag">{{ item.username }}</view>
                    <view class=" fs18 mg40">{{ item.content }}</view>
                    <view class="mgl20 flex jcsa">
                        <a class="fs18 tac mgr10 mgt20 link" @click="answer(index,'asw')"
                            v-if="item.username.split('回复')[0] != user.username">回复</a>
                        <a class="fs18 tac mgr10 mgt20 link" @click="answer(index,'upd')"
                            v-if="item.username.split('回复')[0] == user.username">修改</a>
                        <a class="fs18 tac mgr10 mgt20" @click="deMessage(index)"
                            v-if="item.username.split('回复')[0] == user.username">删除</a>
                    </view>
                </view>
            </view>
        </view>
        <view class="card flex aic column" v-if="flag">
            <textarea class="mgb20" placeholder="回复内容" v-model="user.content"></textarea>
            <view class="flex">
                <button class="tag mgr20 smButton" @click="tijiao()">提交</button>
                <button class="tag smButton" @click="exit()">取消</button>
            </view>

        </view>
    </view>

</template>

<script>
    import cf from '../otherjs/cf.js';
    export default {
        data() {
            return {
                //遍历留言字段
                list: [],
                //判断回复框是否开启
                flag: false,
                //判断修改、回复字段
                tag: '',
                //用户字段
                user: {
                    username: '',
                    content: '',
                },
                //回复者字段
                anser: {},
            }
        },
        onLoad() {
            let data = uni.getStorageSync('data');
            this.user.token = data.token;
            this.user.username = data.username;
            //读取所有留言
            cf('mgBoard', {
                tip: 'getMessages',
                username: this.user.name,
            }).then(res => {
                //new
                let resData = res.data.data;
                resData.map(i => {
                    let username = i.username;
                    let content = i.content;
                    if (i.anser.hasOwnProperty('answerName')) {
                        username = username + '回复' + i.anser.answerName;
                    }
                    this.list.push({
                        username,
                        content,
                    })
                })
            });

        },
        methods: {
            //发布留言
            publish() {
                cf('mgBoard', {
                    tip: 'addMsg',
                    username: this.user.username,
                    content: this.user.content,
                }).then(res => {
                    if (res.success) {
                        this.list.push({
                            username: res.data.username,
                            content: res.data.content,
                        })
                        this.user.content = '';
                    }
                })
            },
            //删除留言
            deMessage(index) {
                let username = this.list[index].username.split('回复')[0];
                cf('mgBoard', {
                    tip: 'deleteMyMessage',
                    username,
                    content: this.list[index].content,
                }).then(res => {
                    uni.redirectTo({
                        url: '/pages/messageBoard/white'
                    });
                });
            },
            //回复
            answer(index, tag) {
                let nowName = this.list[index].username.split('回复')[0];
                this.tag = tag;
                //打开回复框    
                this.flag = true;
                this.anser.name = nowName;
                this.anser.content = this.list[index].content;

            },
            //回复框逻辑
            tijiao() {
                if (this.tag == 'asw') {
                    cf('mgBoard', {
                        tip: 'addMsg',
                        //用户
                        username: this.user.username,
                        //用户回复
                        content: this.user.content,
                        anser: {
                            //回复者
                            answerName: this.anser.name,
                            //回复者信息
                            answerMsg: this.anser.content,
                        }
                    }).then(res => {
                        if (res.success) {
                            uni.showToast({
                                icon: 'success',
                                title: "回复成功!"
                            });
                            uni.redirectTo({
                                url: '/pages/messageBoard/white'
                            });
                        }
                    })

                } else if (this.tag == 'upd') {
                    cf('mgBoard', {
                        tip: 'updateUserMsg',
                        username: this.user.username,
                        oldMsg: this.anser.content,
                        newMsg: this.user.content,
                    }).then(res => {
                        uni.showToast({
                            icon: 'success',
                            title: "修改成功!"
                        });
                        uni.redirectTo({
                            url: '/pages/messageBoard/white'
                        });
                    })
                }
            },
            //取消
            exit() {
                this.flag = false;
                this.user.content = ""
            },
        }
    }
</script>

<style>
    .smButton {
        width: 100rpx;
    }

    input {
        border-bottom: 1px solid #ccc;
        padding: 6px;
        flex: 1;
    }

    textarea {
        border: 1px solid #eee;
    }
</style>
