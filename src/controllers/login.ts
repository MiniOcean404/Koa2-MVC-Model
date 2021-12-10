import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import config from '@/config'
import UserDao from '@/dao/user'

export default class LoginControllers {
	public static async login(ctx: Context) {
		const dao = await new UserDao()
		const { name, password } = ctx.request.body
		const user = await dao.userFindByName(name)

		if (!user) {
			ctx.status = 401
			ctx.body = { message: '用户名不存在' }
		} else if (password) {
			ctx.status = 200
			ctx.body = { token: jwt.sign({ id: user.id }, config.JWT_SECRET) }
		} else {
			ctx.status = 401
			ctx.body = { message: '密码错误' }
		}
	}
}
