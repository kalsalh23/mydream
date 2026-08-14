import { useMemo } from 'react'

export default function Particles({ count = 18 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 4}px`,
        duration: `${8 + Math.random() * 12}s`,
        delay: `${-Math.random() * 15}s`,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count]
  )
  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}