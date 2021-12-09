import { Files } from 'formidable'

declare namespace Logger {
	interface ResponseBody {
		[obj: string]: Files[keyof Files]
	}
}

export = Logger
