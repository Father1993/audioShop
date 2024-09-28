/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises'
import path from 'path'

export async function saveUploadedFile(file: any): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = file.name
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

  await fs.writeFile(filepath, buffer)

  return filename
}
