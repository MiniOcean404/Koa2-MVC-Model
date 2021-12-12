const env = process.env.NODE_ENV
const path = require('path')

const resolve = (p) => {
	if (env === 'production') {
		path.join('dist', p)
	} else {
		return p
	}
}

module.exports = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'root',
	database: 'user',
	synchronize: true,
	timezone: 'UTC',
	logging: false,
	multipleStatements: true,
	dropSchema: false,
	entities: [resolve('src/model/*.{ts,js}')],
	cli: {
		entitiesDir: resolve('src/model'),
	},
}
