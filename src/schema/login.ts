// https://joi.dev/api/?v=17.5.0 文档
import Joi from 'joi'
import { Condition } from '@/types/valid'

const scmLogin: Condition = {
	body: Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		repeat_password: Joi.ref('password'),
	}),
}

export { scmLogin }
