import { useEffect, useState } from "react"

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "contact",
]

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.6,
      }
    )

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}
