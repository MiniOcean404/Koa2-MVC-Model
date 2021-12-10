// https://blog.csdn.net/xiexingshishu/article/details/117196560
// 可自定义传输类型（可自己写类实现包的方法）
// 字体样式：bold, dim,italic, underline, inverse, hidden, strikethrough
// 字体背景颜色：black,red,green,yellow,blue, magenta,cyan,white,gray,grey
// 背景颜色：blackBG,redBG,greenBG,yellowBG,blueBG,magentaBG,cyanBG,whiteBG

import { createLogger, format, transports, addColors } from 'winston'
import 'winston-daily-rotate-file'

import config from '../config'
import type { Context, Next } from 'koa'

const myCustomLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
		silly: 6,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'blue whiteBG',
		http: 'green',
		verbose: 'green',
		debug: 'green',
		silly: 'green',
	},
}

const customFormat = format.combine(
	format.json(),
	format.label({ label: `当前环境:${[config.NODE_ENV]}` }),
	format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
	format.align(),
	format.printf((info) => `[${info.level}] \r\n时间：${[info['timestamp']]}\r\n载体:${info.message}`),
	// format.prettyPrint(),
)

const defaultOptions = {
	format: customFormat,
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
}

addColors(myCustomLevels.colors)

// 可以创建多个日志打印器
const logger = createLogger({
	level: 'info',
	levels: myCustomLevels.levels,
	format: customFormat,
	silent: !config.LOG_FLAG, // 是否禁用所有日志
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(
				format.colorize(), // 开启控制台颜色展示
				format.printf((info) => `[${info.level}] \r\n时间：${[info['timestamp']]}\r\n载体:${info.message}`),
			),
			// level: 'warn',
		}),
		new transports.DailyRotateFile({
			// handleExceptions:true //处理异常
			// handleRejections:true //处理未经批准的拒绝承诺
			filename: 'logs/info/%DATE%.log',
			level: 'info',
			...defaultOptions,
		}),
		new transports.DailyRotateFile({
			filename: 'logs/err/%DATE%.log',
			level: 'error',
			...defaultOptions,
		}),
	],
	// exitOnError:false //异常时候是否退出 false 退出 默认为 true
	exceptionHandlers: [new transports.File({ filename: 'logs/exception/exceptions.log' })],
	// rejectionHandlers: [new transports.File({ filename: 'logs/promise/reject.log' })], //处理未经批准的拒绝承诺
})

export default {
	logger,
	use: () => {
		return async (ctx: Context, next: Next) => {
			const { method, path, origin, query, body, headers, ip } = ctx.request
			const data = {
				method,
				path,
				origin,
				query,
				body,
				ip,
				headers,
				status: 0,
				params: '',
				result: '',
			}

			await next()

			if (config.LOG_FLAG) {
				const body: any = ctx.body
				const { status, params } = ctx
				data['status'] = status
				data['params'] = params
				data['result'] = body || '没有内容'

				if (ctx.body && body.code !== 0) {
					logger.error(JSON.stringify(data))
				} else {
					logger.info(JSON.stringify(data))
				}
			}
		}
	},
}
