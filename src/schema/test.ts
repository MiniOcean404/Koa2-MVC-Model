// https://joi.dev/api/?v=17.5.0 文档
import Joi from 'joi'

const scmTest = {
	query: Joi.object({
		name: Joi.string().required(),
		age: Joi.string().alphanum().min(3).max(30).required(),
		weight: Joi.number().required(),
		birth_year: Joi.number().integer().min(1900).max(2013),
	}),
}

export { scmTest }
