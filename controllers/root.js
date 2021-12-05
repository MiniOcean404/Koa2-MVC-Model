const helloKoa = async (ctx) => {
	await ctx.render('index', { title: 'Koa2' })
}

module.exports = {
	helloKoa,
}
