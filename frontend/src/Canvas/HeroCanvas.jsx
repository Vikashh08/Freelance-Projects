import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Box() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += 0.002
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.3}
        roughness={0.6}
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}

function CameraRig({ isActive }) {
  const { camera, mouse } = useThree()
  const cameraZ = useRef(6)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
      scroller: document.body,
      onUpdate: (self) => {
        cameraZ.current = 6 - self.progress * 2
      },
    })
  }, [])

  useFrame(() => {
    if (!isActive) return   // 🔴 THIS IS THE KEY LINE

    camera.position.z += (cameraZ.current - camera.position.z) * 0.05
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05

    camera.lookAt(0, 0, 0)
  })

  return null
}

function HeroCanvas({ isActive }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      canvasRef.current,
      { opacity: 1 },
      {
        opacity: 0,
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
    <div ref={canvasRef} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} />

        <CameraRig isActive={isActive} />
        <Box />
      </Canvas>
    </div>
  )
}


export default HeroCanvas
