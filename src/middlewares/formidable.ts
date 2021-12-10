import formidable from 'formidable'
import tempFilePath from '../config'
import type { Context, Next } from 'koa'
import { ResponseBody } from '@/types/logger'
//上传binary类型文件需要设置content-type = octet-stream

const form = formidable({
	encoding: 'utf-8',
	//  上传的临时文件保存路径
	// @ts-ignore
	filename(name, ext, part, form) {
		return `${name}${ext}`
	},
	// defaultInvalidName: 'file',
	multiples: true,
	uploadDir: `${tempFilePath}`,
	keepExtensions: true, // 保持原有后缀名
	minFileSize: 1, // byte
	maxFileSize: 200 * 1024 * 1024,
	maxFields: 1000, // 限制字段数，设置0为无限制
	maxFieldsSize: 20 * 1024 * 1024, //限制所有字段（文件除外）可以以字节为单位分配的内存量。
	// @ts-ignore
	filter({ name, originalFilename, mimetype }) {
		// 只保留图像
		// return mimetype && mimetype.includes('image')
		return true
	},
})

export default () => {
	return async (ctx: Context, next: Next) => {
		const upCondition =
			ctx.url &&
			ctx.method.toLowerCase() === 'post' &&
			(ctx.request.type === 'multipart/form-data' || ctx.request.type === 'octet-stream')

		if (upCondition) {
			await new Promise<void>((resolve, reject) => {
				form.parse(ctx.req, (err, fields, files) => {
					if (err) reject(err)

					ctx.request.body = fields
					ctx.request.files = files

					resolve() 
				})
			})
		}

		await next()

		if (upCondition) {
			let obj: ResponseBody = {}
			for (const [key, value] of Object.entries(ctx.request.files)) {
				obj[key] = value
			}

			ctx.body = obj
		}
	}
}
