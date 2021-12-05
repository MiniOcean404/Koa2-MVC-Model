module.exports = (paramSchema) => {
	return async function (ctx, next) {
		let body = ctx.request.body
		try {
			if (typeof body === 'string' && body.length) body = JSON.parse(body)
		} catch (err) {
			console.error('参数校验中JSON解析失败:', err)
		}

		const paramMap = {
			router: ctx.request.params, // 命名路由参数 例： '/:category/:title'
			query: ctx.request.query, // GET请求参数解析
			body,
		}

		const schemaKeys = Object.getOwnPropertyNames(paramSchema || {})
		if (!paramSchema || !schemaKeys.length) return next()

		schemaKeys.some((key) => {
			const validObj = paramMap[key]

			const validResult = paramSchema[key].validate(validObj, {
				allowUnknown: true,
			})

			ctx.assert(!validResult.error, 400, validResult.error.message)
		})

		await next()
	}
}
