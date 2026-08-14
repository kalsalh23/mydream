import { useEffect, useState } from 'react'
import { useVisitor } from '../context/VisitorContext'
import { Icon } from './Icon'

const SECTIONS = [
  { id: 'idea', label: 'الفكرة' },
  { id: 'team', label: 'الفريق' },
  { id: 'components', label: 'المكونات' },
  { id: 'how', label: 'آلية العمل' },
  { id: 'features', label: 'المميزات' },
  { id: 'stages', label: 'المراحل' },
  { id: 'gallery', label: 'المعرض' },
  { id: 'files', label: 'الملفات' },
]

export default function Navbar() {
  const { name } = useVisitor()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <span className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <Icon name="lock" size={22} />
          <span className="text-gold">مشروع التخرج</span>
        </span>

        <button className="nav-toggle" onClick={() => setOpen(true)} aria-label="القائمة">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <button className="nav-close-mobile" onClick={() => setOpen(false)} aria-label="إغلاق">×</button>
          {name && <li><span className="nav-greet">أهلًا بك، {name}</span></li>}
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); go(s.id) }}>{s.label}</a>
            </li>
          ))}
          <li className="nav-admin">
            <a href="#/admin" onClick={(e) => e.stopPropagation()}>لوحة الإدارة</a>
          </li>
        </ul>
      </nav>
    </>
  )
}