import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function initLenis() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.2,
    smooth: true,
    smoothTouch: false,
  })

  lenisInstance.on("scroll", ScrollTrigger.update)

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenisInstance.scrollTo(value)
        : lenisInstance.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  ScrollTrigger.addEventListener("refresh", () => lenisInstance.resize())
  ScrollTrigger.refresh()

  function raf(time) {
    lenisInstance.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}
