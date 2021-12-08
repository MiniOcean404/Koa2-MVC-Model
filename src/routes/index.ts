import KoaRouter from 'koa-router'
const router = KoaRouter()
import routeList from './routes'
import paramValidator from '../middlewares/paramValidator'

routeList.forEach((route) => {
	const { method, path, controller, valid } = route
	//  router 第一个参数是 path， 后面跟上路由级中间件 controller（上面编写的路由处理函数），valid被校验的参数
	router[method.toLowerCase()](path, paramValidator(valid), controller)
})

export default router
