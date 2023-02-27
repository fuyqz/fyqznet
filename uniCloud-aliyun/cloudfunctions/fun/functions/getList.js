module.exports = async (args, db, openId, ctx) => {
    let res = await db.collection("group").where({}).get();
    console.log(res.data)
    return {
        groupList: res.data,
    }
}
