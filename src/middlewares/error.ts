export default () => {
	return async (ctx, next) => {
		try {
			await next()
			if (ctx.status >= 200 && ctx.status < 300) ctx.res.success()
		} catch (err) {
			if (err['expose'] && err['status']) {
				// 自己主动抛出的错误或者断言的问题
				ctx.res.fail({ status: err['status'], msg: err['message'] })
			} else {
				// 程序运行时的错误
				ctx.app.emit('error', err, ctx)
			}
		}
	}
}
