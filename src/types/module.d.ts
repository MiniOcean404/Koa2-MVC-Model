import * as Koa from 'koa'

declare module 'koa' {
	class ServerResponse {
		success: (msg?: string | undefined) => void
		fail: (option: any) => void
	}

	interface Request {
		body?: any
		rawBody: string
	}
}
