module.exports = async (args, db, openId, ctx) => {
    const _ = db.command;
    let groupId = args.groupId;
    let res = await db.collection("group").where({}).get();
    let _id = res.data[groupId - 1]._id;
    let list = res.data[groupId - 1].data;
    //不能重复加入小组
    if (list.userList.indexOf(args.username) != -1) {
        throw Error("已加入该小组!")
    }
    console.log(args.username)
    let userList = [...list.userList, args.username];
    //更新
    await db.collection("group").where({
        _id,
    }).update({
        data: {
            member: _.inc(1),
            userList,
        }
    });

    return {
        userList,
    }
}
