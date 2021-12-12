import Koa from 'koa'
const app = new Koa()
import compose from 'koa-compose'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import MD from './middlewares'
import config from './config'
import * as utils from './common/utils'
import util, { inspect } from 'util'

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

createConnection()
	.then(() => {
		process.stderr.write('\x1B[34m TypeORM 连接成功 \x1B[39m\r\n')
	})
	.catch((reason) => {
		console.error('\x1B[31m%s\x1B[39m', reason, '\r\n')
	})

export default app
