import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Supervisors() {
  const { supervisors } = useData()
  return (
    <section className="section" id="supervisors">
      <SectionTitle eyebrow="الإشراف الأكاديمي" title="المشرفون" />
      <div className="grid grid-2" style={{ maxWidth: '700px' }}>
        {supervisors.map((s, i) => (
          <Reveal key={s.id || i} delay={i * 120}>
            <div className="card card-team">
              <div className="avatar">
                {s.image_url ? <img src={s.image_url} alt={s.name} /> : <Icon name="shield" size={36} />}
              </div>
              <h3>{s.name}</h3>
              <span className="role">{s.academic_title}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}