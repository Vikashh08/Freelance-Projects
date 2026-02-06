import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function About() {
  const textRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          scroller: document.body,
        },
      }
    )
  }, [])

  return (
    <section
      id="about"
      className="h-screen flex items-center justify-center bg-neutral-900"
    >
      <div
        ref={textRef}
        className="max-w-2xl text-center"
      >
        <p className="text-xl text-gray-300 leading-relaxed">
          I am a Computer Science student passionate about problem solving,
          machine learning, and building meaningful systems that combine
          logic, performance, and real-world impact.
        </p>
      </div>
    </section>
  )
}

export default About
