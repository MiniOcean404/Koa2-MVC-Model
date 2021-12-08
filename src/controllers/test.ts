import { Context } from 'koa'

const list = async (ctx: Context) => {
	ctx.body = '你好'
}

export = {
	list,
}
