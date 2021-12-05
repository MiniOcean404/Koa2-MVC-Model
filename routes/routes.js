const { test, users, root } = require('../controllers')
const { scmTest } = require('../schema/index')

// router.prefix('/users')

const routes = [
	{
		method: 'get',
		path: '/',
		controller: root.helloKoa,
	},
	{
		//  测试
		method: 'post',
		path: '/test',
		controller: test.list,
		valid: scmTest.list,
	},
	{
		method: 'get',
		path: '/users',
		controller: users.list,
	},
]

module.exports = routes
