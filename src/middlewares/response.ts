import type { Context, Next } from 'koa'

export default () => {
	return async (ctx: Context, next: Next) => {
		ctx.res.fail = ({ status, data, msg }) => {
			ctx.status = status
			ctx.body = {
				code: status,
				data,
				msg: 'fail:' + msg,
			}
		}

		ctx.res.success = (code, msg) => {
			ctx.body = {
				code: code || 200,
				data: ctx.body,
				msg: msg || 'success',
			}
		}

		await next()
	}
}
