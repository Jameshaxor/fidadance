// Verified Pexels photo URLs, mapped by dance-form context.
// Pexels allows direct hotlinking. Query params control size/quality.

const pexels = (id, w = 900, h = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

// ---- Kathak / Indian Classical ----
// IDs sourced from Pexels "kathak-dance" collection.
const KATHAK = {
  hero:     5563077,   // vertical portrait, expressive Kathak
  card:     18086368,  // Kathak performance
  namita:   18086346,  // elegant Kathak portrait (Artistic Director)
  guru:     30481585,  // classical dancer in traditional attire
  gallery1: 5563077,
  gallery2: 18086368,
  gallery3: 18086346,
  gallery4: 30481585,
}

// ---- Contemporary Dance ----
// IDs sourced from Pexels "contemporary-dance" collection.
const CONTEMPORARY = {
  card:     1701194,   // contemporary dancer leap (Yogendra Singh)
  faculty:  28387411,  // expressive modern dance
  gallery:  6926404,   // modern dance studio
  hero:     1701194,
}

// ---- Urban / Hip-Hop ----
// Verified hip-hop / breakdance photos from Pexels.
const URBAN = {
  card:     2820896,   // man performing hip-hop dance (Wallace Chuck)
  faculty:  16864829,  // man in breakdance pose (Andy Coffie)
  gallery:  5368956,   // breakdance under highway (Allan Mas)
}

export const HERO_DANCER = pexels(KATHAK.hero, 900, 1200)

// Founder portrait — real photo lives at /public/images/namita.jpg
export const FOUNDER_PORTRAIT = '/images/namita.jpg'

export const CLASS_IMAGES = {
  classical:    pexels(KATHAK.card, 900, 700),
  contemporary: pexels(CONTEMPORARY.card, 900, 700),
  hiphop:       pexels(URBAN.card, 900, 700),
}

export const INSTRUCTOR_IMAGES = {
  // Real photo of Namita (lives in /public/images/namita.jpg)
  namita:       FOUNDER_PORTRAIT,
  // Indian-classical/contemporary portraits so every faculty face reads as Indian.
  classical:    pexels(KATHAK.guru, 600, 800),      // traditional classical dancer
  contemporary: pexels(KATHAK.card, 600, 800),      // Kathak performance pose
  urban:        pexels(KATHAK.hero, 600, 800),      // vertical Indian dance portrait
}

// Gallery mixes all disciplines to reflect the academy's breadth.
export const GALLERY_IMAGES = [
  { src: pexels(KATHAK.gallery1, 800, 1000), span: 'row-span-2' },   // Kathak portrait
  { src: pexels(KATHAK.gallery2, 800, 600),  span: '' },              // Kathak
  { src: pexels(URBAN.card, 800, 600),       span: '' },              // Hip-Hop
  { src: pexels(CONTEMPORARY.card, 800, 1000), span: 'row-span-2' }, // Contemporary portrait
  { src: pexels(KATHAK.gallery3, 800, 600),  span: '' },              // Kathak
  { src: pexels(CONTEMPORARY.gallery, 800, 600), span: '' },          // Contemporary
  { src: pexels(KATHAK.gallery4, 800, 600),  span: '' },              // Classical
  { src: pexels(URBAN.gallery, 800, 600),    span: '' },              // Breakdance
]
