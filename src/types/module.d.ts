import * as Koa from 'koa'
import { Files } from 'formidable'

declare module 'koa' {
	class ServerResponse {
		success: (msg?: string | undefined) => void
		fail: (option: any) => void
	}

	interface Request {
		files: Files
	}
}
