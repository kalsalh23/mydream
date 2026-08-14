import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'

export default function Stages() {
  const { settings, stages } = useData()
  return (
    <section className="section section-gold" id="stages">
      <SectionTitle eyebrow="من الفكرة إلى النموذج" title={settings.stages_title || 'مراحل تنفيذ المشروع'} />
      <div className="stage-grid">
        {stages.map((s, i) => (
          <Reveal key={s.id || i} delay={i * 50}>
            <div className="card stage-card">
              <div className="stage-num">{s.number}</div>
              <h3>{s.title}</h3>
              {s.description && <p style={{ marginTop: '8px' }}>{s.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}