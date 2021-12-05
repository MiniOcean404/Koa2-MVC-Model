const assert = require('assert')

// 当前做法等于Koa中ctx.throw([status], [msg], [properties])
const throwError = (code, message) => {
	const err = new Error(message)
	err.status = code
	err.expose = true
	throw err
}

module.exports = {
	assert,
	throwError,
}
