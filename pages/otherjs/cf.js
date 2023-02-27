export default async function(api, args, withLoading) {
    try {
        //前端遮挡
        if (withLoading) {
            uni.showLoading({});
        }
        //设置前端数据
        let token = uni.getStorageSync('data').token;
        //用户未登录
        if (!token) {
            uni.redirectTo({
                url: '../form/login'
            })
        }
        //用户已登录,获取用户数据
        let res = await new Promise((
            resolve,
            reject
        ) => {
            wx.request({
                url: 'https://fc-mp-ebbf1b72-0a63-434c-9b0a-a3483fe35c95.next.bspapp.com/fun',
                data: {
                    api,
                    args,
                    token,
                },
                method: 'POST',
                success: (res) => {
                    resolve(res.data);
                },
                fail: (res) => {
                    reject(res.errMsg);
                }
            })
        });

        //前端遮挡
        if (withLoading) {
            wx.hideLoading();
        }
        //报错
        if (res.success === false) {
            wx.showModal({
                title: "操作失误",
                content: res.errorMessage,
            });
            return false;
        } else {
            return res;
        }
    } catch (err) {
        if (withLoading) {
            wx.hideLoading
        }
        wx.showModal({
            title: "网络错误",
            content: err.message,
        });
        console.log('err:' + err)
        return false;
    }
}
