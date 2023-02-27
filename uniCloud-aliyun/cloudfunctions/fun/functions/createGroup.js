module.exports = async (args, db, openId, ctx) => {
    console.log(args)
    let group = await db.collection("group").where({
        groupName: args.groupName,
    }).get();
    if (!group.data[0]) {
        // 自增
        let res = await db.collection("group").count();
        let groupId = parseInt(res.total) + 1;
        let userList = [args.username];
        await db.collection("group").add({
            data: {
                groupName: args.groupName,
                limitNumer: args.groupNumber,
                shuxing: args.shuxing,
                info: args.info,
                groupId,
                userList,
                member: 1,
                _openId: openId,
            }
        });
        return groupId;
    } else {
        throw Error("小组名已创建!")
    }
}
