import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IGEM_TIMELINE, TIMELINE_CARD_COLORS } from '../data/timeline'

const SQUIGGLE_MS = 1100
const HELIX_WIDTH = 11
const HELIX_FREQ = 0.065
const SAMPLES_PER_SEGMENT = 12

function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  }
}

function segmentControls(prev, curr, spineAmp, spinePhase, index) {
  const midY = (prev.y + curr.y) / 2
  const wave = Math.sin(spinePhase + index * 1.35)
  return {
    p0: prev,
    p1: {
      x: prev.x + spineAmp * wave,
      y: midY + spineAmp * 0.25 * Math.cos(spinePhase + index * 1.1),
    },
    p2: {
      x: curr.x + spineAmp * Math.sin(spinePhase + index * 1.35 + 1.8),
      y: midY + spineAmp * 0.25 * Math.cos(spinePhase + index * 1.1 + 1.4),
    },
    p3: {
      x: curr.x + spineAmp * Math.sin(spinePhase + index * 1.35 + 2.6),
      y: curr.y,
    },
  }
}

function sampleSpine(points, spineAmp = 0, spinePhase = 0) {
  if (points.length < 2) return []

  const samples = []
  for (let i = 1; i < points.length; i += 1) {
    const seg = segmentControls(points[i - 1], points[i], spineAmp, spinePhase, i)
    for (let s = 0; s <= SAMPLES_PER_SEGMENT; s += 1) {
      if (s === 0 && i > 1) continue
      samples.push(cubicBezier(s / SAMPLES_PER_SEGMENT, seg.p0, seg.p1, seg.p2, seg.p3))
    }
  }
  return samples
}

function pointsToPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i += 1) {
    d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`
  }
  return d
}

function buildDnaGeometry(points, spineAmp = 0, spinePhase = 0, helixPhase = 0) {
  const spine = sampleSpine(points, spineAmp, spinePhase)
  if (spine.length < 2) {
    return { strandA: '', strandB: '', rungs: [] }
  }

  const strandA = []
  const strandB = []
  const rungs = []

  spine.forEach((point, i) => {
    const twist = helixPhase + point.y * HELIX_FREQ
    const offset = HELIX_WIDTH * Math.cos(twist)
    strandA.push({ x: point.x + offset, y: point.y })
    strandB.push({ x: point.x - offset, y: point.y })

    if (i > 0 && i % 7 === 0) {
      rungs.push({
        x1: point.x + offset,
        y1: point.y,
        x2: point.x - offset,
        y2: point.y,
      })
    }
  })

  return {
    strandA: pointsToPath(strandA),
    strandB: pointsToPath(strandB),
    rungs,
  }
}

function TimelineRow({ event, index, side, nodeRef, isActive, isVisible, onActivate }) {
  const showYear = index === 0 || IGEM_TIMELINE[index - 1].year !== event.year
  const colors = TIMELINE_CARD_COLORS[index % TIMELINE_CARD_COLORS.length]

  const card = (
    <button
      type="button"
      className="ig-timeline__card"
      onFocus={() => onActivate(index)}
      aria-pressed={isActive}
      style={{
        '--card-bg': colors.bg,
        '--card-border': colors.border,
        '--card-title': colors.title,
      }}
    >
      <h4 className="ig-timeline__card-title">{event.title}</h4>
      {event.subtitle && <p className="ig-timeline__card-subtitle">{event.subtitle}</p>}
      {event.description && <p className="ig-timeline__card-desc">{event.description}</p>}
    </button>
  )

  const node = (
    <button
      type="button"
      ref={nodeRef}
      className={`ig-timeline__mark ${showYear ? '' : 'ig-timeline__mark--minor'}`}
      onFocus={() => onActivate(index)}
      aria-label={`${event.year}: ${event.title}`}
      aria-pressed={isActive}
    >
      <span className="ig-timeline__tick" aria-hidden="true" />
      {showYear && <span className="ig-timeline__year">{event.year}</span>}
    </button>
  )

  return (
    <article
      className={`ig-timeline__row ig-timeline__row--${side} ${isVisible ? 'ig-timeline__row--visible' : ''} ${isActive ? 'ig-timeline__row--active' : ''}`}
      style={{ '--item-index': index }}
      onMouseEnter={() => onActivate(index)}
      onClick={() => onActivate(index)}
    >
      <div className="ig-timeline__side ig-timeline__side--left">
        {side === 'left' ? card : null}
      </div>
      <div className="ig-timeline__node-col">{node}</div>
      <div className="ig-timeline__side ig-timeline__side--right">
        {side === 'right' ? card : null}
      </div>
    </article>
  )
}

const EMPTY_DNA = { strandA: '', strandB: '', rungs: [] }

export default function IgemTimeline() {
  const trackRef = useRef(null)
  const nodeRefs = useRef([])
  const basePointsRef = useRef([])
  const helixPhaseRef = useRef(0)
  const squiggleFrameRef = useRef(null)
  const driftFrameRef = useRef(null)
  const isSquigglingRef = useRef(false)
  const inViewRef = useRef(false)
  const strandARef = useRef(null)
  const strandBRef = useRef(null)
  const rungsRef = useRef([])
  const [dna, setDna] = useState(EMPTY_DNA)
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSquiggling, setIsSquiggling] = useState(false)
  const [visibleItems, setVisibleItems] = useState(() => new Set())
  const [reducedMotion, setReducedMotion] = useState(false)

  const paintDna = useCallback((geometry) => {
    if (strandARef.current) strandARef.current.setAttribute('d', geometry.strandA)
    if (strandBRef.current) strandBRef.current.setAttribute('d', geometry.strandB)
    geometry.rungs.forEach((rung, i) => {
      const line = rungsRef.current[i]
      if (!line) return
      line.setAttribute('x1', rung.x1)
      line.setAttribute('y1', rung.y1)
      line.setAttribute('x2', rung.x2)
      line.setAttribute('y2', rung.y2)
    })
  }, [])

  const applyDna = useCallback((points, spineAmp = 0, spinePhase = 0, helixPhase = 0, syncState = true) => {
    basePointsRef.current = points
    const geometry = buildDnaGeometry(points, spineAmp, spinePhase, helixPhase)
    if (syncState) setDna(geometry)
    requestAnimationFrame(() => paintDna(geometry))
    return geometry
  }, [paintDna])

  const updatePath = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const trackRect = track.getBoundingClientRect()
    const points = nodeRefs.current
      .filter(Boolean)
      .map((node) => {
        const rect = node.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - trackRect.left,
          y: rect.top + rect.height / 2 - trackRect.top,
        }
      })

    if (points.length < 2) return

    setSvgSize({ width: trackRect.width, height: trackRect.height })
    applyDna(points, 0, 0, helixPhaseRef.current)
  }, [applyDna])

  const runSquiggle = useCallback(() => {
    const points = basePointsRef.current
    if (!points.length || reducedMotion) return

    if (squiggleFrameRef.current) cancelAnimationFrame(squiggleFrameRef.current)

    isSquigglingRef.current = true
    setIsSquiggling(true)
    const start = performance.now()
    const startPhase = helixPhaseRef.current

    const tick = (now) => {
      const t = (now - start) / SQUIGGLE_MS

      if (t >= 1) {
        helixPhaseRef.current = startPhase
        applyDna(points, 0, 0, startPhase, false)
        isSquigglingRef.current = false
        setIsSquiggling(false)
        squiggleFrameRef.current = null
        return
      }

      const envelope = Math.sin(t * Math.PI)
      const spineAmp = 12 * envelope
      const spinePhase = t * Math.PI * 7
      const helixPhase = startPhase + t * Math.PI * 12 * envelope
      applyDna(points, spineAmp, spinePhase, helixPhase, false)
      squiggleFrameRef.current = requestAnimationFrame(tick)
    }

    squiggleFrameRef.current = requestAnimationFrame(tick)
  }, [applyDna, reducedMotion])

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useLayoutEffect(() => {
    updatePath()
  }, [updatePath])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ro = new ResizeObserver(() => {
      if (squiggleFrameRef.current) cancelAnimationFrame(squiggleFrameRef.current)
      isSquigglingRef.current = false
      setIsSquiggling(false)
      updatePath()
    })
    ro.observe(track)
    window.addEventListener('resize', updatePath)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updatePath)
    }
  }, [updatePath])

  useEffect(() => {
    const track = trackRef.current
    if (!track || reducedMotion) return

    const viewObserver = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting },
      { threshold: 0.12 }
    )
    viewObserver.observe(track)

    let lastTime = 0
    const drift = (now) => {
      driftFrameRef.current = requestAnimationFrame(drift)
      if (!inViewRef.current || isSquigglingRef.current || basePointsRef.current.length < 2) return
      if (now - lastTime < 50) return
      lastTime = now
      helixPhaseRef.current += 0.022
      applyDna(basePointsRef.current, 0, 0, helixPhaseRef.current, false)
    }

    driftFrameRef.current = requestAnimationFrame(drift)

    return () => {
      viewObserver.disconnect()
      if (driftFrameRef.current) cancelAnimationFrame(driftFrameRef.current)
    }
  }, [applyDna, reducedMotion])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const rows = track.querySelectorAll('.ig-timeline__row')
    const visible = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index)
          if (entry.isIntersecting) visible.add(index)
        })
        setVisibleItems(new Set(visible))
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    )

    rows.forEach((row, i) => {
      row.dataset.index = String(i)
      observer.observe(row)
    })

    return () => observer.disconnect()
  }, [])

  const handleActivate = (index) => {
    setActiveIndex(index)
    runSquiggle()
  }

  useEffect(() => () => {
    if (squiggleFrameRef.current) cancelAnimationFrame(squiggleFrameRef.current)
    if (driftFrameRef.current) cancelAnimationFrame(driftFrameRef.current)
  }, [])

  const hasDna = dna.strandA && dna.strandB

  return (
    <div className={`ig-timeline ${isSquiggling ? 'ig-timeline--squiggle' : ''}`}>
      <h3 className="ig-timeline__heading">Our Journey!</h3>

      <div className="ig-timeline__track" ref={trackRef}>
        {svgSize.width > 0 && hasDna && (
          <svg
            className="ig-timeline__svg"
            width={svgSize.width}
            height={svgSize.height}
            aria-hidden="true"
          >
            {dna.rungs.map((rung, i) => (
              <line
                key={i}
                ref={(el) => { rungsRef.current[i] = el }}
                x1={rung.x1}
                y1={rung.y1}
                x2={rung.x2}
                y2={rung.y2}
                className="ig-timeline__rung"
                style={{ '--rung-i': i }}
              />
            ))}
            <path
              ref={strandBRef}
              d={dna.strandB}
              className="ig-timeline__strand ig-timeline__strand--b"
              fill="none"
            />
            <path
              ref={strandARef}
              d={dna.strandA}
              className="ig-timeline__strand ig-timeline__strand--a"
              fill="none"
            />
          </svg>
        )}

        {IGEM_TIMELINE.map((event, index) => (
          <TimelineRow
            key={`${event.year}-${event.title}`}
            event={event}
            index={index}
            side={index % 2 === 0 ? 'left' : 'right'}
            nodeRef={(el) => { nodeRefs.current[index] = el }}
            isActive={activeIndex === index}
            isVisible={visibleItems.has(index) || reducedMotion}
            onActivate={handleActivate}
          />
        ))}
      </div>
    </div>
  )
}
