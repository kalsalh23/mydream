import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

function Lightbox({ item, onClose }) {
  if (!item) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.92)',
        display: 'grid', placeItems: 'center', padding: '20px', cursor: 'pointer',
      }}
    >
      {item.type === 'video' ? (
        <video src={item.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: 14 }} />
      ) : (
        <img src={item.url} alt={item.title} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: 14 }} />
      )}
      <span style={{ position: 'absolute', top: 18, left: 22, fontSize: '2.2rem', color: 'var(--gold-light)' }}>×</span>
    </div>
  )
}

export default function Gallery() {
  const { media } = useData()
  const [active, setActive] = useState(null)
  const items = media.filter((m) => m.url)
  return (
    <section className="section" id="gallery">
      <SectionTitle eyebrow="لقطات وأفلام" title="معرض المشروع" subtitle="صور المكونات والدائرة والنموذج النهائي وفيديوهات الشرح" />
      <div className="gallery">
        {items.length === 0 && (
          <div className="gallery-empty">
            <Icon name="image" size={34} />
            <p style={{ marginTop: '10px' }}>لم تُضف وسائط بعد — يمكن لفريق المشروع رفع الصور والفيديو من لوحة الإدارة.</p>
          </div>
        )}
        {items.map((m, i) => (
          <Reveal key={m.id || i} delay={i * 60}>
            <div className="gallery-item" onClick={() => setActive(m)}>
              {m.type === 'video' && (
                <div className="gallery-play"><Icon name="video" size={26} /></div>
              )}
              <img src={m.thumbnail_url || m.url} alt={m.title} />
              <span className="gallery-overlay">{m.title}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  )
}