import { resolve } from '@/common/path'
import dotenv from 'dotenv'

const NODE_ENV: string = process.env.NODE_ENV || 'development'

console.log(process.env.NODE_ENV)

const getDotEnv = () => {
	const path = resolve(`.env.${NODE_ENV}`)
	return dotenv.config({ path }).parsed || {}
}

const dotenvConfig = getDotEnv()
const { LOG_OUT_DIR, Temp_File_Path } = dotenvConfig

const pathConfig = {
	LOG_OUT_DIR: resolve(LOG_OUT_DIR),
	Temp_File_Path: resolve(Temp_File_Path),
}

export default Object.assign({ NODE_ENV }, dotenvConfig, pathConfig)
