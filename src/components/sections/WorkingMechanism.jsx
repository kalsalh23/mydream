import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'

export default function WorkingMechanism() {
  const { settings } = useData()
  const steps = Array.isArray(settings.working_mechanism) ? settings.working_mechanism : []
  return (
    <section className="section section-alt" id="how">
      <SectionTitle eyebrow="رحلة النظام" title="كيف يعمل النظام؟" subtitle="مخطط قابل للتعديل حسب آلية التنفيذ الفعلية للمشروع" />
      <div className="timeline">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="timeline-item">
              <div className="timeline-node">{s.step}</div>
              <div className="timeline-card">
                <h3>{s.title}</h3>
                {s.desc && <p>{s.desc}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '30px' }}>
          يتم إعادة القفل تلقائيًا بعد انقضاء المدة المحددة في النظام.
        </p>
      </Reveal>
    </section>
  )
}