import KoaRouter from '@koa/router'
import { User } from '@/controllers'

const protectedRouter = new KoaRouter()
protectedRouter.prefix('/user')
protectedRouter.get('/find', User.userFindAll)
protectedRouter.get('/update', User.userUpdate)
protectedRouter.get('/remove/:id', User.userRemove)
protectedRouter.get('/save', User.userSave)

export default protectedRouter
