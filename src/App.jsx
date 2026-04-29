import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Classes from './components/Classes'
import Rhythm from './components/Rhythm'
import Founder from './components/Founder'
import Instructors from './components/Instructors'
import Schedule from './components/Schedule'
import Vocabulary from './components/Vocabulary'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import SmoothScroll from './components/SmoothScroll'
import ScrollRail from './components/ScrollRail'

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
        <Classes />
        <Rhythm />
        <Founder />
        <Instructors />
        <Schedule />
        <Vocabulary />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
