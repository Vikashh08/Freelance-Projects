import { getLenis } from "./lenis"

export function scrollToSection(id) {
  const element = document.getElementById(id)
  if (!element) return

  const lenis = getLenis()

  if (lenis) {
    lenis.scrollTo(element)
  } else {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
