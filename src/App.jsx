import { lazy, Suspense } from 'react'

// Critical, above-the-fold — bundled in the main chunk
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import ScrollRail from './components/ScrollRail'

// Below-the-fold — split into separate chunks, fetched as the user scrolls / when idle
const Classes      = lazy(() => import('./components/Classes'))
const Rhythm       = lazy(() => import('./components/Rhythm'))
const Founder      = lazy(() => import('./components/Founder'))
const Instructors  = lazy(() => import('./components/Instructors'))
const Schedule     = lazy(() => import('./components/Schedule'))
const Vocabulary   = lazy(() => import('./components/Vocabulary'))
const Gallery      = lazy(() => import('./components/Gallery'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact      = lazy(() => import('./components/Contact'))
const Footer       = lazy(() => import('./components/Footer'))

// A neutral, sized placeholder so layout doesn't jump while the chunk fetches.
// Roughly the height of one section so scroll feels natural on slow connections.
const SectionFallback = () => <div aria-hidden className="min-h-[60vh]" />

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <ScrollRail />
      <main>
        <Hero />
        <Marquee />
        <Suspense fallback={<SectionFallback />}>
          <Classes />
          <Rhythm />
          <Founder />
          <Instructors />
          <Schedule />
          <Vocabulary />
          <Gallery />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
