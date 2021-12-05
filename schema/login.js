// https://joi.dev/api/?v=17.5.0 文档
const Joi = require('joi')

const login = {
	body: Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		repeat_password: Joi.ref('password'),
	}),
}

module.exports = {
	login,
}
