module.exports = async (args, db, openId, ctx) => {

    let res = await db.collection("group").where({}).get();
    console.log(res.data[0].data.userList)
    let groupList = [];
    for (let i in res.data) {
        console.log(i)
        if (res.data[i].data.userList.indexOf(args.username) != -1) {
            groupList.push(res.data[i].data);
        }
    }
    console.log(groupList);
    return {
        groupList,
    }
}
