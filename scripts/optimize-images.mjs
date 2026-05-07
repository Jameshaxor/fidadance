// Convert every JPEG/PNG inside public/images to WebP at high quality.
// Run with: npm run optimize:images
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const IMG_DIR = path.resolve('public/images')
const QUALITY = 82

async function main() {
  const files = await fs.readdir(IMG_DIR)
  const sources = files.filter((f) => /\.(jpe?g|png)$/i.test(f))
  if (sources.length === 0) {
    console.log('No JPEG/PNG files found in public/images')
    return
  }

  for (const file of sources) {
    const input = path.join(IMG_DIR, file)
    const output = path.join(IMG_DIR, file.replace(/\.(jpe?g|png)$/i, '.webp'))
    const inSize = (await fs.stat(input)).size
    await sharp(input).webp({ quality: QUALITY }).toFile(output)
    const outSize = (await fs.stat(output)).size
    const saved = ((1 - outSize / inSize) * 100).toFixed(0)
    console.log(`  ${file} → ${path.basename(output)}  ${(inSize / 1024).toFixed(1)} KB → ${(outSize / 1024).toFixed(1)} KB  (-${saved}%)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
