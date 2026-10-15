import { spawn } from 'node:child_process'
import { mkdirSync, readdirSync, existsSync, statSync, renameSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const directory = path.join(root, 'public/Galery/video')
const backup = path.join(root, 'artifacts/gallery-original-videos')
const posters = path.join(directory, 'posters')
const ffmpeg = process.env.GALLERY_FFMPEG || 'ffmpeg'
mkdirSync(backup, { recursive: true })
mkdirSync(posters, { recursive: true })
async function run(args) {
  await new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-nostdin', ...args], { stdio: ['ignore', 'ignore', 'pipe'] })
    let error = ''
    child.stderr.on('data', chunk => { error += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve() : reject(new Error(error)))
  })
}
for (const file of readdirSync(directory).filter(file => /\.mov$/i.test(file)).sort()) {
  const input = path.join(directory, file)
  const base = path.parse(file).name
  const output = path.join(directory, `${base}.mp4`)
  const temporary = path.join(root, 'artifacts', `${base}-encoding.mp4`)
  if (existsSync(output)) throw new Error(`Output already exists: ${output}; review before replacing`)
  if (existsSync(path.join(backup, file))) throw new Error(`Backup already exists: ${file}`)
  await run(['-y', '-i', input, '-map', '0:v:0', '-map', '0:a:0?', '-vf', "scale='min(720,iw)':-2", '-r', '30', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', '-threads', '4', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', temporary])
  await run(['-y', '-ss', '1', '-i', temporary, '-frames:v', '1', '-vf', 'scale=480:-2', '-q:v', '3', path.join(posters, `${base}.jpg`)])
  if (statSync(temporary).size === 0) throw new Error(`Empty output: ${file}`)
  // Keep original recordings locally, outside Vite's public deployment assets.
  const originalSize = statSync(input).size
  renameSync(temporary, output)
  renameSync(input, path.join(backup, file))
  console.log(`${file}: ${(originalSize / 1e6).toFixed(1)} MB -> ${(statSync(output).size / 1e6).toFixed(1)} MB; original preserved in artifacts/gallery-original-videos`)
}
