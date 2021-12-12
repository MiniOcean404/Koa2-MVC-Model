// pm2配置文件

module.exports = {
	apps: {
		name: 'Koa2', // 项目名
		script: 'dist/bin/www.js', // 执行文件
		cwd: './', // 根目录
		// args: '', // 传递给脚本的参数
		// interpreter: '', // 指定的脚本解释器
		// interpreter_args: '', // 传递给解释器的参数
		watch: true, // 是否监听文件变动然后重启
		ignore_watch: [
			// 不用监听的文件
			'node_modules',
			'public',
			'logs',
		],
		exec_mode: 'cluster', // 应用启动模式，支持 fork 和 cluster 模式
		instances: 'max', // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
		max_memory_restart: '150M', //如果超过指定的内存量，您的应用程序将重新启动。人性化的格式：可以是“10M”、“100K”、“2G”等
		source_map_support: true, //是否开启源文件映射
		filter_env: ['REACT_'], // 排除以“REACT_”开头的全局变量，并且不允许它们渗透到集群中
		env: {
			NODE_ENV: 'production', // 环境参数，当前指定为生产环境
			REMOTE_ADDR: '',
		},
		env_dev: {
			NODE_ENV: 'development', // 环境参数，当前指定为开发环境
			REMOTE_ADDR: '',
		},
		env_test: {
			// 环境参数，当前指定为测试环境
			NODE_ENV: 'test',
			REMOTE_ADDR: '',
		},

		error_file: './logs/app-err.log', // 错误日志文件
		out_file: './logs/app-out.log', // 正常日志文件
		merge_logs: true, // 设置追加日志而不是新建日志
		log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式

		min_uptime: '60s', // 应用运行少于时间被认为是异常启动
		listen_timeout: 8000, // 如果应用程序未在侦听，则强制重新加载之前的时间（以毫秒为单位）
		autorestart: false, // 默认为 true, 发生异常的情况下自动重启
		max_restarts: 3, // 最大异常重启次数
		restart_delay: '60', // 异常重启情况下，重新启动崩溃的应用程序之前等待的时间
	},
	deploy: {
		production: {
			user: 'root', //登录用户名
			host: ['47.108.78.24'], //要部署的目标服务器或者域名
			port: '22',
			ref: 'origin/master', //用于部署代码时的分支
			repo: 'git@github.com:cooleye/daviesite.git', // git 仓库地址
			path: '/mnt/daviesite', //在目标服务器上部署的文件目录地址
			ssh_options: 'StrictHostKeyChecking=no',
			'pre-setup': "echo 'This is a pre-setup command'",
			'post-setup': 'ls -la',
			'pre-deploy-local': "echo 'This is a pre-deploy-local command'",
			'post-deploy': 'npm install && pm2 start 0', //部署后启动的脚本
		},
	},
}
