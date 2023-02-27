//导入
let jwt = require("jsonwebtoken");
let fs = require("fs");
let env = require("./env.js");
//声明变量
let db = uniCloud.database({
    throwOnNotFound: false,
});
let Fun = {};
//全自动导入xx函数

// __dirname当前目录的绝对路径(fun) 
//readdirSync读取路径文件内容,返回值是数组
let files = fs.readdirSync(__dirname + "/functions");
//defineProperty 给对象定义属性
//相当于 xx = require(./.functions/xx)
files.map((filename) => {
    let name = filename.replace(".js", "");
    Object.defineProperty(Fun, name, {
        value: require("./functions/" + filename),
    });
});

exports.main = async (event, context) => {
    //获取前端数据
    try {
        let {
            api,
            args,
            token
        } = event.body ? JSON.parse(event.body) : event;
        //没有api
        if (typeof Fun[api] !== "function") {
            throw Error("No api");
        }
        //用户未登录
        let auth = {};
        if (!token && !api.startsWith("login")) {
            throw Error("请登录后操作");
        } else if (token) {
            //确认是用户的token
            auth = jwt.verify(token.replace("Bearer ", ""), env.ADMIN_SECRET);
        }
        //返回数据
        let data = await Fun[api](args, db, auth.userId, {
            uniCloud,
            auth,
            env,
        });
        return {
            success: true,
            data,
        };
    } catch (error) {
        //统一捕获错误
        console.error(error);
        return {
            success: false,
            errorMessage: error.message,
        };
    }
};
