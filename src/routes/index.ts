import { Test, login, Root } from '../controllers'
import { scmTest, scmLogin } from '../schema'
import paramValidator from '../middlewares/paramValidator'
import KoaRouter from '@koa/router'

// router.prefix('/users')
const router = new KoaRouter()

router.get('/', Root.helloKoa)
router.get('/test', paramValidator(scmTest), Test.helloKoa)
router.post('/login', paramValidator(scmLogin), login.login)

export default router
