import { Test, login, Root, User } from '../controllers'
import { scmTest, scmLogin } from '@/schema'
import paramValidator from '../middlewares/paramValidator'
import KoaRouter from '@koa/router'

// router.prefix('/users')
const router = new KoaRouter()

router.get('/', Root.helloKoa)

router.get('/test', paramValidator(scmTest), Test.helloKoa)

router.get('/user/query', User.userFind)
router.get('/user/update', User.userUpdate)
router.get('/user/remove/:id', User.userRemove)
router.get('/user/save', User.userSave)

router.post('/login', paramValidator(scmLogin), login.login)

export default router
