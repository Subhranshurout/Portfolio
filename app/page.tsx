import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Highlights } from '@/components/Highlights'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <About />
      <Highlights />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
