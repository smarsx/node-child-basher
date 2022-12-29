import { cpus } from 'os'
import { exec as lameExec } from 'child_process'
import * as util from 'util'
const exec = util.promisify(lameExec)

export async function execInterval(files: string[], dir: string, cmd: string, timeout: number) {
  const rate = cpus().length
  console.log(`utilizing up to ${rate} threads`)

  for (let i = 0; i < files.length; i += rate) {
    const fileSlice = files.slice(i, i + rate <= files.length ? i + rate : files.length)

    const promises: Promise<{ stdout: string; stderr: string }>[] = fileSlice.map((filename: string) => {
      const filepath = dir + filename

      // replace placeholder with file path
      const ncmd = cmd.replace('$', filepath)

      const tPromise: Promise<{ stdout: string; stderr: string }> = new Promise((resolve) => {
        setTimeout(() => {
          resolve({ stdout: '', stderr: 'timeout!' })
        }, timeout)
      })
      // race exec vs timeout
      return Promise.race([exec(ncmd), tPromise])
    })

    // iterate responses (order should be preserved)
    const responses = await Promise.all(promises)
    for (let j in responses) {
      const resp = responses[j]
      const filename = fileSlice[j]
      console.log(`\n\x1b[96m${filename}\x1b[0m`)
      const { stdout, stderr } = resp
      if (stderr.length > 0) {
        console.log('\x1b[41mError!\x1b[0m')
        console.log('stdout: ', stdout)
        console.log('stderr: ', stderr)
      } else {
        console.log(stdout)
      }
    }
  }
}
