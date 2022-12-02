module.exports = async (args, db, openId, ctx) => {
    console.log(args)
    let res = await db.collection("user").where({
        username: args.username,
    }).get();
    console.log(res)
    return {
        data: res.data
    }
}
