#!/usr/bin/env node

import { get_local_ip } from '@/common/utils'
import http from 'http'
import app from './app'

const port = normalizePort(process.env['PORT'] || '80')

const server = http.createServer(app.callback())

server.listen(port, () => {
	console.log(`服务器运行在 http://localhost:${port}`)
	console.log(`服务器运行在 http://${get_local_ip()}:${port}`)
})

server.on('error', onError)

// 将端口规范化为数字、字符串或 false。
function normalizePort(val: string) {
	const port = parseInt(val, 10)
	// named pipe
	if (isNaN(port)) return val
	if (port >= 0) return port
	return false
}

// HTTP 服务器“错误”事件的事件侦听器.
function onError(error: { syscall: string; code: string }) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' (权限被拒绝):试图以文件访问权限禁止的方式访问文件')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(
				bind + '(地址已被使用):尝试将(net、http、或 https)绑定到本地地址失败，因为本地另一台服务器已经占用了该地址',
			)
			process.exit(1)
			break
		default:
			throw error
	}
}
