module.exports = async (args, db, openId, ct) => {
    //添加留言
    if (args.tip == 'addMsg') {
        let anser = args.anser == undefined ? {} : args.anser;
        await db.collection('message').add({
            username: args.username,
            content: args.content,
            anser,
        });
        return {
            username: args.username,
            content: args.content,
        }
    }

    //删除留言
    if (args.tip == 'deleteMyMessage') {
        //返回修改信息
        return await db.collection('message').where({
            username: args.username,
            content: args.content,
        }).remove();
    }

    //修改留言
    if (args.tip == 'updateUserMsg') {
        return await db.collection('message').where({
            username: args.username,
            content: args.oldMsg,
        }).update({
            content: args.newMsg
        });
    }

    //获取全部留言
    if (args.tip == 'getMessages') {
        return await db.collection('message').where({}).get();
    }

    //我的留言(暂时无效)
    if (args.tip == 'getMyMessages') {
        return await db.collection('message').where({
            username: args.username,
        }).get();
    }
}
