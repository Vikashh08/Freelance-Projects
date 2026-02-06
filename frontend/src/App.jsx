import { useEffect } from "react"
import { initLenis } from "./utils/lenis"
import useActiveSection from "./hooks/useActiveSection"

import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"

function App() {
  const activeSection = useActiveSection()

  useEffect(() => {
    initLenis()
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero isActive={activeSection === "home"} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
