import { execInterval } from './exec'
import { getFilesInDir, getTimeout } from './utils'

async function main() {
  // get args
  const args = process.argv.slice(2)
  const cmd = args[0]
  let dir = args[1]
  const ending = args[2]
  const timeout = getTimeout()

  // log args
  console.log('directory: ', dir)
  console.log('command: ', cmd)
  if (ending !== undefined) {
    console.log('file ending: ', ending)
  }
  console.log(`timeout: ${timeout}ms`)

  // check dir path
  if (!dir.startsWith('/home') && !dir.startsWith('~')) {
    throw new Error('directory must be relative or absolute path.')
  }
  // check cmd has file placeholder
  if (!cmd.includes('$')) {
    throw new Error('command must include $ as file placeholder.')
  }

  // normalize dir
  if (!dir.endsWith('/')) {
    dir = dir + '/'
  }

  // get files
  const files = await getFilesInDir(dir, ending)
  console.log('files len: ', files.length)
  if (files.length === 0) {
    const msg = ending === undefined ? `no files in ${dir}` : `no files in ${dir} ending in ${ending}`
    throw new Error(msg)
  }

  // execute cmds
  await execInterval(files, dir, cmd, timeout)
}

main()
