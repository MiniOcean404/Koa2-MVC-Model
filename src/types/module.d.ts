import * as koa from 'koa'
import * as http from 'http'
import { Files } from 'formidable'

declare module 'koa' {
	interface Request {
		files: Files
	}
}

declare module 'http' {
	interface ServerResponse {
		success: (code: number, msg?: string | undefined) => void
		fail: (option: any) => void
	}
}
