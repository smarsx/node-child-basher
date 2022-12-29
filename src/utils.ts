import { readdir } from 'fs/promises'

// get files in dir and filter by file ending
export async function getFilesInDir(dir: string, ending: string | undefined) {
  const items = await readdir(dir)
  return ending === undefined ? items : items.filter((name: string) => name.endsWith(ending))
}

export function getTimeout(): number {
  const t = 30
  const tenv = process.env.TIMEOUT
  return tenv === undefined ? t : parseInt(tenv)
}
