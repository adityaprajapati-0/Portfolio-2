import React, { useRef, useEffect, useState } from 'react'

export default function HollowText({ children, className = '' }) {
  const ref = useRef(null)
  const [fillPercent, setFillPercent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    let isVisible = false

    const handleScroll = () => {
      if (!isVisible) {
        ticking = false
        return
      }
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const entryPoint = windowH
      const centerPoint = windowH * 0.4
      const progress = 1 - (rect.top - centerPoint) / (entryPoint - centerPoint)
      setFillPercent(Math.max(0, Math.min(1, progress)))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll)
        ticking = true
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    })

    observer.observe(el)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <h2 ref={ref} className={`section-heading ${className}`}>
      <span className="outline-layer" aria-hidden="true">{children}</span>
      <span className="fill-layer" style={{ clipPath: `inset(${(1 - fillPercent) * 100}% 0 0 0)` }}>
        {children}
      </span>
    </h2>
  )
}
