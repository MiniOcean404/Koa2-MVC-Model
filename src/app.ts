import Koa from 'koa'
const app = new Koa()
import compose from 'koa-compose'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import MD from './middlewares'
import config from './config'
import * as utils from './common/utils'

createConnection()
	.then(() => {
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
	})
	.catch((reason) => {
		console.error('TypeORM 连接失败', reason)
	})

export default app
