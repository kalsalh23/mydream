import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Importance() {
  const { settings } = useData()
  const items = Array.isArray(settings.importance) ? settings.importance : []
  return (
    <section className="section" id="importance">
      <SectionTitle eyebrow="القيمة المضافة" title="أهمية المشروع" />
      <div className="grid grid-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="card">
              <div className="card-icon"><Icon name="check" size={22} /></div>
              <p style={{ fontSize: '1.03rem', color: 'var(--cream)' }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}