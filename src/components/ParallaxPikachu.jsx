import { useEffect, useState } from 'react'

const SCROLL_RANGE_VH = 1.05

function getLayout(vw, vh) {
  if (vw < 480) {
    const imageWidth = Math.min(vw * 0.34, 96)
    return {
      imageWidth,
      startX: vw * 0.02,
      endX: vw - imageWidth - vw * 0.04,
      baseY: vh * 0.72,
      arcHeight: Math.min(vh * 0.08, 48),
      zIndex: 2,
    }
  }

  if (vw < 900) {
    const imageWidth = Math.min(vw * 0.26, 150)
    return {
      imageWidth,
      startX: vw * 0.06,
      endX: vw - imageWidth - vw * 0.08,
      baseY: vh * 0.65,
      arcHeight: Math.min(vh * 0.12, 80),
      zIndex: 2,
    }
  }

  const imageWidth = Math.min(Math.max(vw * 0.18, 180), 260)
  return {
    imageWidth,
    startX: vw * 0.14,
    endX: vw - imageWidth * 0.55,
    baseY: vh * 0.52,
    arcHeight: Math.min(vh * 0.18, 180),
    zIndex: 2,
  }
}

function getPingPongProgress(scrollY, scrollRange) {
  const leg = (scrollY / scrollRange) % 2
  const progress = leg <= 1 ? leg : 2 - leg
  const returning = leg > 1
  return { progress, returning }
}

function clampY(y, vh, imageWidth) {
  const imageHeight = imageWidth * 0.95
  const minY = vh * 0.1
  const maxY = vh - imageHeight - vh * 0.06
  return Math.min(Math.max(y, minY), maxY)
}

export default function ParallaxPikachu() {
  const [style, setStyle] = useState({
    transform: 'translate3d(12vw, 55vh, 0) rotate(-6deg)',
    opacity: 1,
    width: '180px',
    zIndex: 5,
  })

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      const layout = getLayout(vw, vh)
      const scrollRange = vh * SCROLL_RANGE_VH
      const { progress, returning } = getPingPongProgress(window.scrollY, scrollRange)

      const x = layout.startX + progress * (layout.endX - layout.startX)
      const curve = Math.sin(progress * Math.PI) * -layout.arcHeight
      const y = clampY(layout.baseY + curve, vh, layout.imageWidth)
      const rotate = returning ? 10 - progress * 18 : -8 + progress * 18
      const scaleX = returning ? -1 : 1

      setStyle({
        transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) rotate(${rotate}deg)`,
        opacity: 1,
        width: `${layout.imageWidth}px`,
        zIndex: layout.zIndex,
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <img
      src="/Images/keleTheFibroblast.png"
      alt=""
      className="parallax-pikachu"
      style={style}
      aria-hidden="true"
    />
  )
}
