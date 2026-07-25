import { useEffect, useRef } from 'react'

export function PillarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = width / 2
    let targetMouseY = height / 2

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Render 3D geometric architectural pillars
    const render = (time: number) => {
      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Background base gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      bgGrad.addColorStop(0, '#0a0a0d')
      bgGrad.addColorStop(0.5, '#050507')
      bgGrad.addColorStop(1, '#000000')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Perspective settings
      const centerX = width / 2 + (mouseX - width / 2) * 0.04
      const horizonY = height * 0.42 + (mouseY - height / 2) * 0.03
      const numPillarsSide = 9

      // Subtle ambient light center
      const lightGrad = ctx.createRadialGradient(
        centerX,
        horizonY + 80,
        10,
        centerX,
        horizonY + 80,
        width * 0.6
      )
      lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)')
      lightGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)')
      lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = lightGrad
      ctx.fillRect(0, 0, width, height)

      // Floor perspective grid & floor fade
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height)
      floorGrad.addColorStop(0, 'rgba(20, 20, 25, 0.95)')
      floorGrad.addColorStop(0.4, 'rgba(10, 10, 12, 0.98)')
      floorGrad.addColorStop(1, 'rgba(0, 0, 0, 1)')
      ctx.fillStyle = floorGrad
      ctx.beginPath()
      ctx.moveTo(0, horizonY)
      ctx.lineTo(width, horizonY)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.fill()

      // Draw left & right architectural pillars
      const drawPillarSide = (isRight: boolean) => {
        for (let i = numPillarsSide; i >= 1; i--) {
          const depth = i / numPillarsSide // 1 (far) to 0.1 (near)
          const scale = Math.pow(1.35, (numPillarsSide - i))
          
          const xOffsetFromCenter = (width * 0.14) + Math.pow(numPillarsSide - i, 1.45) * (width * 0.045)
          const pillarX = isRight ? centerX + xOffsetFromCenter : centerX - xOffsetFromCenter

          const pillarWidth = Math.max(22, 14 * scale)
          const pillarHeight = height * 0.95

          const topY = horizonY - pillarHeight * 0.58 * (1 + (numPillarsSide - i) * 0.04)
          const bottomY = height + 40

          // Subtle floating offset
          const floatOffset = Math.sin(time * 0.001 + i * 0.4) * 3

          // Pillar geometry
          const pLeft = pillarX - pillarWidth / 2
          const pRight = pillarX + pillarWidth / 2

          // Shading & Rim Lighting
          const pGrad = ctx.createLinearGradient(pLeft, 0, pRight, 0)
          
          // Shading based on side & rim light
          if (!isRight) {
            pGrad.addColorStop(0, `rgba(12, 12, 16, ${0.4 + depth * 0.5})`)
            pGrad.addColorStop(0.65, `rgba(32, 33, 40, ${0.6 + depth * 0.35})`)
            pGrad.addColorStop(0.92, `rgba(80, 82, 95, ${0.4 + depth * 0.5})`)
            pGrad.addColorStop(1, `rgba(255, 255, 255, ${0.45 + depth * 0.35})`)
          } else {
            pGrad.addColorStop(0, `rgba(255, 255, 255, ${0.45 + depth * 0.35})`)
            pGrad.addColorStop(0.08, `rgba(80, 82, 95, ${0.4 + depth * 0.5})`)
            pGrad.addColorStop(0.35, `rgba(32, 33, 40, ${0.6 + depth * 0.35})`)
            pGrad.addColorStop(1, `rgba(12, 12, 16, ${0.4 + depth * 0.5})`)
          }

          ctx.fillStyle = pGrad
          ctx.beginPath()
          ctx.rect(pLeft, topY + floatOffset, pillarWidth, bottomY - topY)
          ctx.fill()

          // Subtle pillar bevel highlight line (CRED sharp architectural edge)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + (1 - depth) * 0.35})`
          ctx.lineWidth = 1
          ctx.beginPath()
          const edgeX = !isRight ? pRight : pLeft
          ctx.moveTo(edgeX, topY + floatOffset)
          ctx.lineTo(edgeX, bottomY)
          ctx.stroke()
        }
      }

      drawPillarSide(false) // Left pillars
      drawPillarSide(true)  // Right pillars

      // Horizon glow line
      const lineGrad = ctx.createLinearGradient(0, 0, width, 0)
      lineGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
      lineGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.08)')
      lineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)')
      lineGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)')
      lineGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.strokeStyle = lineGrad
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, horizonY + 2)
      ctx.lineTo(width, horizonY + 2)
      ctx.stroke()

      // Dark vignette overlay
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.3,
        width / 2,
        height / 2,
        width * 0.75
      )
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.75)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
