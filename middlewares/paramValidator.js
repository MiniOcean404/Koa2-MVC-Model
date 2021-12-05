module.exports = (paramSchema) => {
	return async function (ctx, next) {
		const paramMap = {
			router: ctx.request.params, // 命名路由参数 例： '/:category/:title'
			query: ctx.request.query, // GET请求参数解析
			body: ctx.request.body,
		}

		const schemaKeys = paramSchema && Object.getOwnPropertyNames(paramSchema)
		if (!paramSchema || !schemaKeys.length) return next()

		schemaKeys.some((key) => {
			const validObj = paramMap[key]

			const validResult = paramSchema[key].validate(validObj, {
				allowUnknown: true,
			})

			ctx.assert(!validResult.error, 400, validResult.error?.message.replaceAll('"', ''))
		})

		await next()
	}
}
