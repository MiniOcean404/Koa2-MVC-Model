import type { Context, Next } from 'koa'

export default () => {
	return async (ctx: Context, next: Next) => {
		try {
			await next()
			if (ctx.status >= 200 && ctx.status < 300) {
				// @ts-ignore
				ctx.res.success()
			}
		} catch (err) {
			// @ts-ignore
			if (err['expose'] && err['status']) {
				// 自己主动抛出的错误或者断言的问题
				// @ts-ignore
				ctx.res.fail({ status: err['status'], msg: err['message'] })
			} else {
				// 程序运行时的错误
				ctx.app.emit('error', err, ctx)
			}
		}
	}
}
