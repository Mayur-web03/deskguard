import { useEffect, useRef } from "react"

function GlowCursor() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // spawn a few particles per move
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          size: Math.random() * 2 + 1,
        })
      }
      if (particles.current.length > 150) {
        particles.current.splice(0, particles.current.length - 150)
      }
    }
    window.addEventListener("mousemove", move)

    let raf
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // core glow at cursor
      const grad = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 30
      )
      grad.addColorStop(0, "rgba(46,204,113,0.5)")
      grad.addColorStop(1, "rgba(46,204,113,0)")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(mouse.current.x, mouse.current.y, 30, 0, Math.PI * 2)
      ctx.fill()

      // particles
      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(46,204,113,${Math.max(p.life, 0) * 0.8})`
        ctx.shadowColor = "rgba(46,204,113,0.8)"
        ctx.shadowBlur = 8
        ctx.fill()
      })
      ctx.shadowBlur = 0

      particles.current = particles.current.filter((p) => p.life > 0)

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}

export default GlowCursor