const Formidable = require('formidable')

const { tempFilePath } = require('../config')

module.exports = () => {
	return async function (ctx, next) {
		const form = Formidable({
			multiples: true,
			//  上传的临时文件保存路径
			uploadDir: `${process.cwd()}/${tempFilePath}`,
		})

		// eslint-disable-next-line promise/param-names
		await new Promise((resolve, reject) => {
			form.parse(ctx.req, (err, fields, files) => {
				if (err) {
					reject(err)
				} else {
					ctx.request.body = fields
					ctx.request.files = files
					resolve()
				}
			})
		})

		await next()
	}
}
