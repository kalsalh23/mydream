import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Goals() {
  const { settings } = useData()
  const items = Array.isArray(settings.goals) ? settings.goals : []
  return (
    <section className="section section-alt" id="goals">
      <SectionTitle eyebrow="الوجهة" title="أهداف المشروع" />
      <div className="grid grid-2">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
              <div className="card-icon" style={{ margin: 0, width: 46, height: 46, flexShrink: 0 }}><Icon name="check" size={18} /></div>
              <p style={{ color: 'var(--cream)', fontSize: '1.02rem' }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}