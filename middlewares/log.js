const log4js = require('log4js')
const { outDir, flag, level } = require('../config').logConfig

levels = {
	trace: log4js.levels.TRACE,
	debug: log4js.levels.DEBUG,
	info: log4js.levels.INFO,
	warn: log4js.levels.WARN,
	error: log4js.levels.ERROR,
	fatal: log4js.levels.FATAL,
}

log4js.configure({
	// 输出到控制台的内容，同时也输出到日志文件中
	replaceConsole: true,
	appenders: {
		console: {
			type: 'stdout' || 'stderr' || 'console',
		},
		fileAppender: {
			type: 'dateFile',
			filename: `${outDir}/receive/receive.log`,
			encoding: 'utf-8', // 指定编码格式为 utf-8
			// 日志文件按日期（天）切割
			pattern: 'yyyy-MM-dd',
			// 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
			keepFileExt: true,
			// 输出的日志文件名是都始终包含 pattern 日期结尾 test.log-2019-08-06
			alwaysIncludePattern: true,
			maxLogSize: 104800, //单文件最大限制 ( 单位 : bytes )
			backups: 100, //当文件内容超过文件存储空间时，备份文件的数量(旧日志)最大数量
			// 配置 layout，此处使用自定义模式 pattern
			// layout: 'basic',
			// mode : 默认 0644 无需配置，使用默认即可
			// flags : 默认 “a”，无需配置，使用默认即可
			// compress : compress 为 true，记录当天日志时，会对以往的老日志进行压缩操作，压缩文件后缀为 .gz (默认 : false)
			// keepFileExt : 是否保持日志文件后缀名 ( 默认为 false，使用 pattern 的情况下，保持默认就好 )
			// daysToKeep : 指定日志保留的天数 ( 默认为 0，始终保留 )
		},
		error: {
			type: 'dateFile', //日志类型
			filename: `${outDir}/err/error.log`, //日志输出位置，当目录文件或文件夹不存在时自动创建
			pattern: 'yyyy-MM-dd',
			keepFileExt: true,
			alwaysIncludePattern: true,
			maxLogSize: 104800,
			backups: 100,
		},
	},
	// 可配置开发环境生产环境的日志配置
	categories: {
		default: {
			appenders: ['fileAppender', 'console'],
			// 设置权重
			level: 'info',
		},
		error: {
			appenders: ['error'],
			level: 'error',
		},
	},
	//若您的 app 使用了 pm2，则这里必须设置为true，否则日志将不会工作（另外您还得下载 pm2-intercom作为 pm2模块: pm2 install pm2-intercom）
	pm2: true,
})

const loggerConfig = (name, l) => {
	const logger = log4js.getLogger(name || 'default')
	// // 默认为debug权限及以上
	logger.level = levels[l] || levels[level]
	return logger
}

let logger = loggerConfig()

module.exports = {
	loggerConfig,
	useLogger: function (app, logger) {
		//用来与express结合
		app.use(
			log4js.connectLogger(logger || log4js.getLogger('default'), {
				level: levels['info'] || levels['debug'],
				format: '[:remote-address :method :url :status :response-times][:referrer HTTP/:http-version :user-agent]', //自定义输出格式
			}),
		)
	},
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

// 通过 layout 我们可以自定义每一条输出日志的格式。
// 	log4js 内置了四中类型的格式：
// 		messagePassThrough：仅仅输出日志的内容；
//         basic：在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout；
//         colored/coloured：在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout；
//         pattern：这是一种特殊类型，可以通过它来定义任何你想要的格式。
// %r %p $m $n 是 log4js 内置的包含说明符，可以借此来输出一些 meta 的信息
//
//
// %r 日志输出时间，以 toLocaleTimeString 函数格式化
// %p 日志等级
// %c 日志分类
// %h 访问计算机的 hostname
// %m 打印的日志主题内容
// %n 换行标识
// %d 日志输出日期 ( 默认以 ISO8601 方式格式化 )
// 可自定义输出类型 %d{yyyy/MM/dd-hh.mm.ss},输出 2018/05/22-15.42.18
// %z 记录进程 pid 号 ( 数据来自 node 方法 process.pid )
// %x{} 输出自定义 tokens 中的项目，例如上述例子中的 user
// %[ 想要输出的内容 %] 用来给被扩起来的内容着色，颜色和日志 level 有关
