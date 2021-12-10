import path from 'path'

const resolve = (dir: string | undefined) => path.join(__dirname, '../', dir ? dir : '')

export { resolve }
