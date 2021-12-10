import { Context } from 'koa'
import { getManager } from 'typeorm'

export default class Login {
	public static async login(ctx: Context) {
		ctx.body = '返回结果'
	}
}
