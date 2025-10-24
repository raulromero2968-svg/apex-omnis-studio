import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

interface Connection {
  star1: Star
  star2: Star
  distance: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Star colors matching the theme
    const colors = [
      'rgb(0, 180, 216)',    // primary cyan
      'rgb(0, 245, 255)',    // accent cyan
      'rgb(123, 44, 191)',   // purple
      'rgb(255, 255, 255)',  // white
      'rgb(100, 200, 255)',  // light blue
    ]

    // Create stars
    const stars: Star[] = []
    const starCount = 150

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }

    // Find connections between nearby stars
    const maxConnectionDistance = 150
    const connections: Connection[] = []

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x
        const dy = stars[i].y - stars[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxConnectionDistance) {
          connections.push({
            star1: stars[i],
            star2: stars[j],
            distance
          })
        }
      }
    }

    // Animation loop
    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.016 // ~60fps

      // Clear canvas
      ctx.fillStyle = 'rgb(10, 10, 10)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      connections.forEach(conn => {
        const { star1, star2, distance } = conn
        
        // Calculate opacity based on distance
        const opacity = Math.max(0, 1 - distance / maxConnectionDistance) * 0.15

        ctx.beginPath()
        ctx.moveTo(star1.x, star1.y)
        ctx.lineTo(star2.x, star2.y)
        ctx.strokeStyle = `rgba(0, 180, 216, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Update and draw stars
      stars.forEach(star => {
        // Move star
        star.x += star.vx
        star.y += star.vy

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color.replace('rgb', 'rgba').replace(')', `, ${star.opacity * twinkle})`)
        ctx.fill()

        // Add glow for larger stars
        if (star.radius > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 2)
          gradient.addColorStop(0, star.color.replace('rgb', 'rgba').replace(')', `, ${star.opacity * twinkle * 0.3})`))
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

