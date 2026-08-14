import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Features() {
  const { features } = useData()
  return (
    <section className="section section-alt" id="features">
      <SectionTitle eyebrow="لماذا هذا المشروع؟" title="مميزات المشروع" />
      <div className="grid grid-3">
        {features.map((f, i) => (
          <Reveal key={f.id || i} delay={i * 70}>
            <div className="card">
              <div className="card-icon"><Icon name={f.icon || 'shield'} size={24} /></div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}