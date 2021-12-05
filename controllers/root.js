const helloKoa = async (ctx) => {
	// 没有处理返回数据时：JSON形式返回的写法
	//   ctx.body = {
	//   title: 'koa2 json'
	// }

	// 没有参数校验中间件时：参数校验写法
	// const { name, age } = ctx.request.query
	// ctx.assert(name, 10001, 'name 是必须的')
	// ctx.assert(age, 10001, 'age 是必须的')

	await ctx.render('index', { title: 'Koa2' })
}

module.exports = {
	helloKoa,
}
