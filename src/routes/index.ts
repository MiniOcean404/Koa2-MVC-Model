import { test, login, root } from '../controllers'
import { scmTest, scmLogin } from '../schema'
import paramValidator from '../middlewares/paramValidator'
import KoaRouter from '@koa/router'

// router.prefix('/users')
const router = new KoaRouter()

router.get('/', root.helloKoa)
router.get('/test', paramValidator(scmTest), test.list)
router.post('/login', paramValidator(scmLogin), login.login)

export default router
