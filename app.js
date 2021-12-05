const Koa = require('koa')
const app = new Koa()
const compose = require('koa-compose')
const MD = require('./middlewares')
const onerror = require('koa-onerror')
const config = require('./config')
const utils = require('./common/utils')

app.context.config = config
app.context.utils = utils

// middlewares
app.use(compose(MD))

app.on('error', (err, ctx) => {
	console.error('服务器错误\r\n', err, '\r\n当前上下文:\r\n', ctx)
	if (ctx) {
		ctx.body = {
			code: 9999,
			message: `程序运行时报错：${err.message}`,
		}
	}
})

// error handler
onerror(app)

module.exports = app
