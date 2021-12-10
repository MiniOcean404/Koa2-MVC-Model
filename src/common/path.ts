import path from 'path'

const resolve = (dir: string | undefined) => path.join(process.cwd(), dir ? dir : '')

export { resolve }
