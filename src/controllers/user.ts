import { Context, Next } from 'koa'
import UserDao from '@/dao/user'

export default class UserController {
	public static async userFindAll(ctx: Context, next?: Next) {
		console.log(ctx.state.user.id) // 获取jwt权限认证中的id
		const dao = new UserDao()
		ctx.body = await dao.userFindAll()
	}

	public static async userSave(ctx: Context) {
		const dao = new UserDao()
		await dao.userSave()
		await UserController.userFindAll(ctx)
	}

	public static async userRemove(ctx: Context) {
		const dao = new UserDao()
		ctx.body = await dao.userRemove(ctx.params.id)
	}

	public static async userUpdate(ctx: Context) {
		const dao = new UserDao()
		await dao.userUpdate()
		await UserController.userFindAll(ctx)
	}
}
