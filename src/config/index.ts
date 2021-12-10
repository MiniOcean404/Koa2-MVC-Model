import { resolve } from '@/common/path'
import dotenv from 'dotenv'

const cwd = process.cwd()
const NODE_ENV: string = process.env.NODE_ENV || 'development'

const getDotEnv = () => {
	const path = resolve(`../.env.${NODE_ENV}`)
	return dotenv.config({ path }).parsed || {}
}

const dotenvConfig = getDotEnv()

const pathConfig = {
	LOG_OUT_DIR: cwd + dotenvConfig.LOG_OUT_DIR,
	Temp_File_Path: cwd + dotenvConfig.Temp_File_Path,
}

export default Object.assign({ NODE_ENV }, dotenvConfig, pathConfig)
