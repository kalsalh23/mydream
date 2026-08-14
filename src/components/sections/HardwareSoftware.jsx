import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function HardwareSoftware() {
  const { settings } = useData()
  const software = Array.isArray(settings.software) ? settings.software : []
  return (
    <section className="section" id="tech">
      <SectionTitle eyebrow="التقنيات" title="الجانب البرمجي والإلكتروني" />
      <div className="panel-2">
        <Reveal>
          <div className="panel-box">
            <h3><Icon name="chip" size={22} /> الجانب البرمجي</h3>
            <div className="tech-tags">
              {software.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="panel-box">
            <h3><Icon name="gear" size={22} /> الجانب الإلكتروني</h3>
            <p style={{ color: 'var(--muted)' }}>{settings.electronics}</p>
            <p style={{ color: 'var(--gold-light)', marginTop: '12px', fontFamily: 'var(--font-deco)', fontSize: '0.95rem' }}>
              يمكن إضافة مخططات الدائرة وصور التجميع والاختبارات من لوحة الإدارة.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}