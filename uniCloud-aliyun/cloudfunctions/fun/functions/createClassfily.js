// field 指定xx不返回
module.exports = async (args, db, openId, ctx) => {
    //查询全部分类
    if (args.tip === 'all') {
        return await db.collection("addClassfily").where({}).get();
    }
    //删除分类
    if (args.tip === 'deleteClass') {
        return await db.collection("addClassfily").where({
            name: args.name
        }).remove();
    }
    // 修改分类
    if (args.tip === 'updateClass') {
        return await db.collection("addClassfily").where({
            name: args.name
        }).update({
            name: args.rename
        });
    }
    // 查询是否创建了该分类
    let list = await db.collection("addClassfily").where({
        name: args.name
    }).get();
    // 没有则创建字段
    if (!list.data[0]) {
        return await db.collection("addClassfily").add({
            _openId: openId,
            name: args.name,
            shopList: [],
        })
    } else {
        // 存在该字段,抛出异常
        throw Error("您已创建该分类")
    }
}
