const { test, login, root } = require('../controllers')
const { scmTest, scmLogin } = require('../schema/index')

// router.prefix('/users')

const routes = [
	{
		method: 'GET',
		path: '/',
		controller: root.helloKoa,
	},
	{
		method: 'POST',
		path: '/login',
		controller: login.login,
		valid: scmLogin.login,
	},
	{
		//  测试
		method: 'GET',
		path: '/test',
		controller: test.list,
		valid: scmTest.list,
	},
]

module.exports = routes
