import cors from '@koa/cors'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import router from '../routes'
import formidable from './formidable'
import response from './response'
import error from './error'
import logger from './logger'
import KoaStatic from 'koa-static'
import path from 'path'

// 静态文件中间件
const mdStatic = KoaStatic(path.join(process.cwd(), '/public'), {
	index: false, // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
	hidden: false, // 是否同意传输隐藏文件
	defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
})

// 设置跨域处理
const mdCors = cors({
	origin: '*',
	credentials: true,
	allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
})

// 统一返回格式 错误处理
const mdResHandler = response()
const mdErrorHandler = error()

// 路由中间件
const mdRoute = router.routes()
const mdRouterAllowed = router.allowedMethods()

// 参数解析中间件
// koa-bodyparser 这个插件只能解析 4 种数据[ 'json', 'form', 'text', 'xml' ]，当我们上传文件的时候，我们是获取不到文件的。所以使用formidable
const mdFormidable = formidable()
const mdBodyparser = bodyparser({
	enableTypes: ['json', 'form', 'text', 'xml'],
	formLimit: '56kb',
	jsonLimit: '1mb',
	textLimit: '1mb',
	xmlLimit: '1mb',
	strict: true,
})

// 记录请求日志
const mdLogger = logger.use()

const mdJson = json()

// 按顺序排列好否则失效
export = [
	mdJson,
	mdStatic,
	mdFormidable,
	mdBodyparser,
	mdLogger,
	mdCors,
	mdResHandler,
	mdErrorHandler,
	mdRoute,
	mdRouterAllowed,
]
