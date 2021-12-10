import { Context, Next } from 'koa'
import { getManager } from 'typeorm'
import { User } from '@/model/user'

export default class UserController {
	public static async userFind(ctx: Context, next?: Next) {
		const table = getManager().getRepository(User)
		ctx.body = await table.find()
	}

	public static async userSave(ctx: Context) {
		const table = getManager().getRepository(User)
		const user = new User()
		user.name = 'typeORM'
		user.password = '122'
		user.email = '854535549@qq.com'
		await table.save(user)
		await UserController.userFind(ctx)
	}

	public static async userRemove(ctx: Context) {
		const table = getManager().getRepository(User)
		const userRemove = await table.findOne(ctx.params.id)
		if (userRemove) {
			console.log(await table.remove(userRemove))
			await UserController.userFind(ctx)
		} else {
			ctx.body = '不存在这个id'
		}
	}

	public static async userUpdate(ctx: Context) {
		const table = getManager().getRepository(User)
		const user = await table.findOne(9)
		if (user) {
			user.name = 'Koa2'
			await table.save(user)
			await UserController.userFind(ctx)
		}
	}
}
