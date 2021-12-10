import { Context, Next } from 'koa'
import { getManager, ObjectID } from 'typeorm'
import { User } from '@/model/user'
import { Repository } from 'typeorm/repository/Repository'

export default class UserDao {
	private table: Repository<User>

	constructor() {
		this.table = getManager().getRepository(User)
	}

	public async userFindByName(name: string) {
		return await this.table.createQueryBuilder().where({ name }).addSelect('User.password').getOne()
	}

	public async userFindAll() {
		return await this.table.find()
	}

	public async userSave() {
		const user = new User()
		user.name = 'typeORM'
		user.password = '122'
		user.email = '854535549@qq.com'
		await this.table.save(user)
	}

	public async userRemove(id: string | number | Date | undefined) {
		const userRemove = await this.table.findOne(id)
		if (userRemove) {
			return await this.table.remove(userRemove)
		} else {
			return '不存在这个id'
		}
	}

	public async userUpdate() {
		const user = await this.table.findOne(9)
		if (user) {
			user.name = 'Koa2'
			return await this.table.save(user)
		}
	}
}
