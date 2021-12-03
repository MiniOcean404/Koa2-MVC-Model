const list = async ctx => {
    //   await ctx.render('index', {
    //   title: 'Hello Koa 2!'
    // })

    // //参数校验
    // const {name, age} = ctx.request.query
    // if (!name) ctx.utils.assert(false, ctx.utils.throwError(10001, 'name 是必须的'))
    // if (!age) ctx.utils.assert(false, ctx.utils.throwError(10001, 'age 是必须的'))

    ctx.body = '你好'
}

module.exports = {
    list
}