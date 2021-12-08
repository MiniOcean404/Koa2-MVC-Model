const base = require('./base')
const dev = require('./dev')
const pre = require('./pre')
const pro = require('./pro')

const env: string = process.env['NODE_ENV'] || 'dev'

const configMap = {
	dev,
	pre,
	pro,
}

export default Object.assign(base, { env }, (configMap as any).env)
