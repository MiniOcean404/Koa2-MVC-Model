const formidable = require('formidable')

const { tempFilePath } = require('../config')

const form = formidable({
	encoding: 'utf-8',
	//  上传的临时文件保存路径
	filename(name, ext, part, form) {
		return `${name}${ext}`
	},
	multiples: true,
	uploadDir: `${tempFilePath}`,
	keepExtensions: true, // 保持原有后缀名
	minFileSize: 1, // byte
	maxFileSize: 200 * 1024 * 1024,
	maxFields: 1000, // 限制字段数，设置0为无限制
	maxFieldsSize: 20 * 1024 * 1024, //限制所有字段（文件除外）可以以字节为单位分配的内存量。
	filter({ name, originalFilename, mimetype }) {
		// 只保留图像
		// return mimetype && mimetype.includes('image')
		return true
	},
})

module.exports = () => {
	return async (ctx, next) => {
		const upCondition = ctx.url && ctx.method.toLowerCase() === 'post' && ctx.request.type === 'multipart/form-data'

		if (upCondition) {
			await new Promise((resolve, reject) => {
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
			let obj = {}
			for (const [key, value] of Object.entries(ctx.request.files)) {
				obj[key] = value
			}

			ctx.body = obj
		}
	}
}
