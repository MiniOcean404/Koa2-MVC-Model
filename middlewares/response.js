const response = () => {
	return async (ctx, next) => {
		ctx.res.fail = ({ status, data, msg }) => {
			ctx.body = {
				code: status,
				data,
				msg,
			}
		}

		ctx.res.success = (msg) => {
			ctx.body = {
				code: 0,
				data: ctx.body,
				msg: msg || 'success',
			}
		}

		await next()
	}
}

module.exports = response
