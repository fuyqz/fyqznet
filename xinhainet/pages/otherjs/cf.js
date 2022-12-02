export default async function(api, args, withLoading) {
    try {
        //前端遮挡
        if (withLoading) {
            wx.showLoading({});
        }
        //设置前端数据
        let token = wx.getStorageSync('data').token;

        //用户未登录
        if (!token) {
            //没有token,执行登陆函数
            uni.showToast({
                icon: "error",
                title: '用户未登录!'
            })
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
                url: 'https://ebbf1b72-0a63-434c-9b0a-a3483fe35c95.bspapp.com/fun',
                data: {
                    api,
                    args,
                    token,
                },
                method: 'POST',
                success: (res) => {
                    // console.log(res.data)
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
            console.log('err:' + res);
            console.log(res.errorMessage)
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
