import assert from 'assert'

// 当前做法等于Koa中ctx.throw([status], [msg], [properties])
export const throwError = (code, message) => {
	const err = new Error(message)
	err['status'] = code
	err['expose'] = true
	throw err
}

export function get_local_ip() {
	const interfaces = require('os').networkInterfaces()
	let IPAddress = ''
	for (const devName in interfaces) {
		const face = interfaces[devName]
		for (let i = 0; i < face.length; i++) {
			const alias = face[i]
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				IPAddress = alias.address
			}
		}
	}
	return IPAddress
}

export default assert
