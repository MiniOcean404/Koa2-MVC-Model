import type { Context, Next } from 'koa'

export default () => {
	return async (ctx: Context, next: Next) => {
		// @ts-ignore
		ctx.res.fail = ({ status, data, msg }) => {
			ctx.body = {
				code: status,
				data,
				msg,
			}
		}

		// @ts-ignore
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
