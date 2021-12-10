import { Context } from 'koa'

export default class Test {
	public static async helloKoa(ctx: Context) {
		ctx.body = '你好'
	}
}
