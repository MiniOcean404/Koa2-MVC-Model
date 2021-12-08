const pwd = process.cwd()

export = {
	//  临时文件存放地址
	tempFilePath: `${pwd}/public/temp`,
	logConfig: {
		flag: true, // 是否开启日志
		outDir: `${pwd}/logs`, // 日志输出目录
		level: 'info', // 日志等级
	},
}
