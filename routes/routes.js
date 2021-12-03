const { test, users, root } = require('../controllers')
const { scmTest } = require('../schema/index')
const routes = [
	{
		method: 'get',
		path: '/',
		controller: root.list,
	},
	{
		//  测试
		method: 'get',
		path: '/test',
		controller: test.list,
		valid: scmTest.list,
	},
	{
		//  测试
		method: 'get',
		path: '/users',
		controller: users.list,
	},
]

module.exports = routes
