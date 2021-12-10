import type { Request, DefaultContext } from 'koa'
import { ParsedUrlQuery } from 'querystring'
import { ObjectSchema } from 'joi'

// 校验
declare namespace valid {
	// 条件类型
	interface Condition {
		query?: ObjectSchema
		body?: ObjectSchema
		[props: string]: ObjectSchema | undefined
	}

	// 参数类型
	interface Params {
		router: DefaultContext
		query: ParsedUrlQuery
		body: Request
		[props: string]: ParsedUrlQuery | Request
	}

	type ParamsItem = keyof Params & keyof Condition
}

export = valid
