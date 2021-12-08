import { test, login, root } from '../controllers'
import { scmTest, scmLogin } from '../schema'

// router.prefix('/users')

export default [
	{
		method: 'GET',
		path: '/',
		controller: root.helloKoa,
	},
	{
		method: 'POST',
		path: '/login',
		controller: login.login,
		valid: scmLogin,
	},
	{
		//  测试
		method: 'GET',
		path: '/test',
		controller: test.list,
		valid: scmTest,
	},
]
