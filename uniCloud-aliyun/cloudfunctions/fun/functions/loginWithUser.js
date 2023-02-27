//导入
//cd uniCloud-aliyun\cloudfunctions\fun
//npm install -S jsonwebtoken
let jwt = require("jsonwebtoken");
//npm i -S bcryptjs 
let bcrypt = require("bcryptjs");
const {
    throws
} = require("assert");

module.exports = async (args, db, openId, ctx) => {
    //获取传入参数
    let {
        username,
        password
    } = args;

    //查询
    let user = await db.collection("user").where({
        username
    }).get();
    if (args.login == 1 && user.data[0]) {
        throw Error("用户名已存在")
    }
    if (user.data[0]) {
        //比对密码离散值
        let check = await bcrypt.compare(password, user.data[0].hash);
        if (!check) {
            throw Error('密码错误!');
        }
        //密码正确,返回token
        let token =
            "Bearer " +
            jwt.sign({
                    userId: user.data[0]._id,
                },
                ctx.env.ADMIN_SECRET
            );

        return {
            user: user.data[0],
            token,
        };
    } else {
        //注册

        //存入加密后密码
        let hash = await bcrypt.hash(password, 10);
        let data = {
            username,
            hash,
            createdAt: Date.now(),
        };
        //数据库添加信息
        let userRex = await db.collection("user").add(data);
        //返回添加后数据
        return {
            user: {
                ...data,
                _id: userRex.id,
            },
            token: "Bearer " +
                jwt.sign({
                        userId: userRex.id,
                    },
                    ctx.env.ADMIN_SECRET
                ),
        };
    }
};
