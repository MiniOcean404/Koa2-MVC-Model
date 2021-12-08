import { Context } from 'koa'

const login = async (ctx: Context) => {
	ctx.body = '返回结果'
}

export = {
	login,
}
