import { useEffect, useRef, useState } from 'react'

export function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      <div className="ornament">
        <span className="ornament-line" />
        <span className="ornament-diamond">◆</span>
        <span className="ornament-line" />
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  )
}