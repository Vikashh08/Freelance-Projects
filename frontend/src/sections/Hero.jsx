import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import HeroCanvas from "../canvas/HeroCanvas"

gsap.registerPlugin(ScrollTrigger)

function Hero({ isActive }) {
  const textRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#home",
          start: "center center",
          end: "bottom top",
          scrub: true,
          scroller: document.body,
        },
      }
    )
  }, [])

  return (
    <section
      id="home"
      className="relative h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <HeroCanvas isActive={isActive} />
      </div>

      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl font-bold text-white">
          Vibhor Dutta
        </h1>
        <p className="mt-4 text-gray-400">
          Problem Solver | ML Enthusiast | Engineer
        </p>
      </div>
    </section>
  )
}

export default Hero
