import KoaRouter from '@koa/router'
import { login, Root, Test } from '@/controllers'
import paramValidator from '@/middlewares/paramValidator'
import { scmLogin, scmTest } from '@/schema'

const unprotectedRouter = new KoaRouter()

unprotectedRouter.get('/', Root.helloKoa)
unprotectedRouter.post('/login', paramValidator(scmLogin), login.login)
unprotectedRouter.get('/test', paramValidator(scmTest), Test.helloKoa)

export default unprotectedRouter
