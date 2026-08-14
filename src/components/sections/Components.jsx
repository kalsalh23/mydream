import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'

export default function Components() {
  const { components } = useData()
  return (
    <section className="section section-gold" id="components">
      <SectionTitle eyebrow="الأجهزة المستخدمة" title="المكونات والأدوات المستخدمة" subtitle="يُسمح بتعديل هذه القائمة من لوحة الإدارة حسب المكونات الفعلية المستخدمة" />
      <div className="grid grid-3">
        {components.map((c, i) => (
          <Reveal key={c.id || i} delay={i * 70}>
            <div className="card">
              {c.image_url ? (
                <img src={c.image_url} alt={c.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
              ) : (
                <div className="card-icon"><span style={{ fontSize: '1.4rem' }}>🔩</span></div>
              )}
              <h3>{c.name}</h3>
              {c.model && <p style={{ color: 'var(--gold-light)', marginBottom: 8 }}>{c.model}</p>}
              <p>{c.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}