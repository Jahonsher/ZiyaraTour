import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const directory = path.join(root, 'public/Galery')
const metadata = JSON.parse(readFileSync(path.join(root, 'scripts/gallery-metadata.json'), 'utf8'))
const seen = new Set()
const media = []
const optimizedDirectory = path.join(directory, 'optimized')
function addMedia(absolute, relative, type, name) {
  if (metadata[name]?.hidden) return
  const base = path.parse(name).name
  const hasOptimized = type === 'photo' && existsSync(path.join(optimizedDirectory, `${base}-thumb.jpg`)) && existsSync(path.join(optimizedDirectory, `${base}-full.jpg`))
  const optimized = variant => `/Galery/optimized/${encodeURIComponent(base)}-${variant}.jpg`
  if (type === 'photo') {
    const hash = createHash('sha256').update(readFileSync(hasOptimized ? path.join(optimizedDirectory, `${base}-full.jpg`) : absolute)).digest('hex')
    if (seen.has(hash)) return
    seen.add(hash)
  }
  const source = `/Galery/${relative}`
  const posterFile = path.join(path.dirname(absolute), 'posters', `${base}.jpg`)
  const poster = type === 'video' && existsSync(posterFile) ? `/Galery/${path.relative(directory, posterFile).split(path.sep).map(encodeURIComponent).join('/')}` : undefined
  media.push({ id: relative, type, src: hasOptimized ? optimized('full') : source, thumbnail: hasOptimized ? optimized('thumb') : source, ...(poster ? { poster } : {}), ...metadata[name], category: metadata[name]?.category || 'moments' })
}
function scan(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === 'optimized' || entry.name === 'posters') continue
    const absolute = path.join(folder, entry.name)
    if (entry.isDirectory()) { scan(absolute); continue }
    const type = /\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name) ? 'photo' : /\.(mp4|webm|m4v|mov)$/i.test(entry.name) ? 'video' : null
    if (!type) continue
    const relative = path.relative(directory, absolute).split(path.sep).map(encodeURIComponent).join('/')
    addMedia(absolute, relative, type, entry.name)
  }
}
scan(directory)
// Optimized photos remain discoverable after redundant originals are removed.
if (existsSync(optimizedDirectory)) {
  for (const file of readdirSync(optimizedDirectory).sort()) {
    if (!file.endsWith('-full.jpg')) continue
    const base = file.slice(0, -'-full.jpg'.length)
    const name = Object.keys(metadata).find(name => path.parse(name).name === base) || `${base}.jpg`
    if (existsSync(path.join(directory, name))) continue
    addMedia(path.join(optimizedDirectory, file), encodeURIComponent(name), 'photo', name)
  }
}
// Keep photo IDs and ordering stable when their originals have been cleaned up.
media.sort((a, b) => a.type.localeCompare(b.type) || (a.order ?? 1000) - (b.order ?? 1000) || a.id.localeCompare(b.id))
writeFileSync(path.join(root, 'src/data/gallery.json'), JSON.stringify(media, null, 2) + '\n')
console.log(`Gallery: ${media.filter(item => item.type === 'photo').length} photos, ${media.filter(item => item.type === 'video').length} videos`)
