// https://blog.csdn.net/xiexingshishu/article/details/117196560
// 可自定义传输类型（可自己写类实现包的方法）
// 字体样式：bold, dim,italic, underline, inverse, hidden, strikethrough
// 字体背景颜色：black,red,green,yellow,blue, magenta,cyan,white,gray,grey
// 背景颜色：blackBG,redBG,greenBG,yellowBG,blueBG,magentaBG,cyanBG,whiteBG

const { createLogger, format, transports, config, addColors } = require('winston')
require('winston-daily-rotate-file')
const {
	logConfig: { outDir, flag, level },
	env,
} = require('../config')

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
	format.label({ label: `当前环境:${[env]}` }),
	format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
	format.align(),
	format.printf((info) => `[${info.level}] \r\n时间：${[info.timestamp]}\r\n载体:${info.message}`),
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
	silent: !flag, // 是否禁用所有日志
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(
				format.colorize(), // 开启控制台颜色展示
				format.printf((info) => `[${info.level}] \r\n时间：${[info.timestamp]}\r\n载体:${info.message}`),
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
	rejectionHandlers: [new transports.File({ filename: 'logs/promise/reject.log' })], //处理未经批准的拒绝承诺
})

module.exports = {
	logger,
	use: () => {
		return async (ctx, next) => {
			const { method, path, origin, query, body, headers, ip } = ctx.request
			const data = {
				method,
				path,
				origin,
				query,
				body,
				ip,
				headers,
			}

			await next()

			if (flag) {
				const { status, params } = ctx
				data.status = status
				data.params = params
				data.result = ctx.body || '没有内容'

				if (ctx.body && ctx.body.code !== 0) {
					logger.error(JSON.stringify(data))
				} else {
					logger.info(JSON.stringify(data))
				}
			}
		}
	},
}
