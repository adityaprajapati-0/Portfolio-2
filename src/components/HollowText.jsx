import React, { useRef, useEffect, useState } from 'react'

export default function HollowText({ children, className = '' }) {
  const ref = useRef(null)
  const [fillPercent, setFillPercent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const entryPoint = windowH
      const centerPoint = windowH * 0.4
      const progress = 1 - (rect.top - centerPoint) / (entryPoint - centerPoint)
      setFillPercent(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className={`section-heading ${className}`}>
      <span className="outline-layer">{children}</span>
      <span className="fill-layer" style={{ clipPath: `inset(${(1 - fillPercent) * 100}% 0 0 0)` }}>
        {children}
      </span>
    </div>
  )
}
