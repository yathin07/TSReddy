"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.3,  // slower and smoother
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.2 + 0.5,  // slightly bigger
      opacity: Math.random() * 0.25 + 0.1,
      life: 0,
      maxLife: Math.random() * 180 + 120,  // longer lifespan
    })

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      if (Math.random() < 0.02) {
        particlesRef.current.push(
          createParticle(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30),
        )
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // randomly spawn background particles
      if (Math.random() < 0.015) {
        particlesRef.current.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        particle.opacity = Math.max(0, particle.opacity - 0.0012)

        particle.vx += (Math.random() - 0.5) * 0.004
        particle.vy += (Math.random() - 0.5) * 0.004

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.6
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.6
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = "#3b82f6"
        ctx.shadowBlur = 8
        ctx.shadowColor = "#3b82f6"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = particle.opacity * 0.25
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return particle.life < particle.maxLife && particle.opacity > 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />
}
