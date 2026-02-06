import { useEffect, useRef } from "react"
import gsap from "gsap"
import { scrollToSection } from "../utils/scrollToSection"

function Navbar({ activeSection }) {
  const indicatorRef = useRef(null)
  const navRef = useRef(null)

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return

    const activeLink = navRef.current.querySelector(
      `[data-link="${activeSection}"]`
    )

    if (!activeLink) return

    const { offsetLeft, offsetWidth } = activeLink

    gsap.to(indicatorRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      duration: 0.4,
      ease: "power3.out",
    })
  }, [activeSection])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-white font-semibold">
          Vibhor
        </span>

        <div className="relative">
          <ul
            ref={navRef}
            className="flex gap-8 text-sm text-gray-400"
          >
            {links.map((link) => (
              <li key={link.id}>
                <button
                  data-link={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative ${
                    activeSection === link.id
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* animated underline */}
          <span
            ref={indicatorRef}
            className="absolute -bottom-1 left-0 h-[2px] bg-white"
            style={{ width: 0 }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
