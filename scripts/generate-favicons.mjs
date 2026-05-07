// Rasterizes public/favicon.svg into PNG variants for legacy/iOS support.
// Run via: npm run generate:favicons
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SVG = path.resolve('public/favicon.svg')
const OUT = path.resolve('public')

const targets = [
  { name: 'favicon-32.png',       size: 32  },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'og-fallback.png',      size: 1200, ratio: [1200, 630] }, // for OG image fallback
]

async function main() {
  const svg = await fs.readFile(SVG)
  for (const t of targets) {
    const [w, h] = t.ratio || [t.size, t.size]
    let pipeline = sharp(svg, { density: 384 }).resize(t.size, t.size, { fit: 'contain', background: { r: 10, g: 6, b: 16, alpha: 1 } })

    if (t.ratio) {
      // Compose the favicon centered on a wider, brand-coloured canvas for OG.
      const icon = await sharp(svg, { density: 384 })
        .resize(420, 420, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
      pipeline = sharp({
        create: {
          width: w,
          height: h,
          channels: 4,
          background: { r: 10, g: 6, b: 16, alpha: 1 },
        },
      }).composite([{ input: icon, gravity: 'center' }])
    }

    const buf = await pipeline.png().toBuffer()
    await fs.writeFile(path.join(OUT, t.name), buf)
    console.log(`  ${t.name}  ${(buf.length / 1024).toFixed(1)} KB`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
