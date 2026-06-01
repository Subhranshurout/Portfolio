import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Expertise } from '@/components/Expertise'
import { CTA } from '@/components/CTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main id="main-content" className="site-main">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Expertise />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
