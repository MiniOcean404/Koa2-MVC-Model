import cors from '@koa/cors'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import { protectedRouter, unprotectedRouter } from '../routes'
import formidable from './formidable'
import response from './response'
import error from './error'
import logger from './logger'
import KoaStatic from 'koa-static'
import path from 'path'
import jwt from './jwt'

import type { Middleware } from 'koa-compose'
import type { Context } from 'koa'
import type Router from '@koa/router'

const mdJson: Middleware<Context> = json()

// 设置跨域处理
const mdCors: Middleware<Context> = cors({
	origin: '*',
	credentials: true,
	allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
})

// 静态文件中间件
const mdStatic: Middleware<Context> = KoaStatic(path.join(process.cwd(), '/public'), {
	index: false, // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
	hidden: false, // 是否同意传输隐藏文件
	defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
})

// 参数解析中间件
// koa-bodyparser 这个插件只能解析 4 种数据[ 'json', 'form', 'text', 'xml' ]，当我们上传文件的时候，我们是获取不到文件的。所以使用formidable
const mdFormidable: Middleware<Context> = formidable()
const mdBodyparser: Middleware<Context> = bodyparser({
	enableTypes: ['json', 'form', 'text', 'xml'],
	formLimit: '56kb',
	jsonLimit: '1mb',
	textLimit: '1mb',
	xmlLimit: '1mb',
	strict: true,
})

// 记录请求日志
const mdLogger: Middleware<Context> = logger.use()

// 统一返回格式 错误处理
const mdResHandler: Middleware<Context> = response()
const mdErrorHandler: Middleware<Context> = error()

// 路由中间件
const mdProtectedRoute: Router.Middleware = protectedRouter.routes()
const mdProtectedRouterAllowed: Router.Middleware = protectedRouter.allowedMethods()
const mdUnProtectedRoute: Router.Middleware = unprotectedRouter.routes()
const mdUnProtectedRouterAllowed: Router.Middleware = unprotectedRouter.allowedMethods()

// jwt鉴权
const mdJWT = jwt

// 按顺序排列好否则失效
export = [
	mdJson,
	mdCors,
	mdStatic,
	mdFormidable,
	mdBodyparser,
	mdLogger,
	mdResHandler,
	mdErrorHandler,
	mdUnProtectedRoute,
	mdUnProtectedRouterAllowed,
	mdJWT,
	mdProtectedRoute,
	mdProtectedRouterAllowed,
]
