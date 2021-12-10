const env = process.env.NODE_ENV

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
	entities: ['src/model/*.{ts,js}'],
	cli: {
		entitiesDir: './src/model',
	},
}
