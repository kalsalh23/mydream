import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Team() {
  const { team } = useData()
  return (
    <section className="section section-alt" id="team">
      <SectionTitle eyebrow="فريق العمل" title="مقدمو المشروع" subtitle="بإشراف ومتابعة من مشرفي الكلية" />
      <div className="grid grid-3">
        {team.map((m, i) => (
          <Reveal key={m.id || i} delay={i * 120}>
            <div className="card card-team">
              <div className="avatar">
                {m.image_url ? <img src={m.image_url} alt={m.name} /> : <Icon name="users" size={38} />}
              </div>
              <h3>{m.name}</h3>
              {m.role && <span className="role">{m.role}</span>}
              {m.bio && <p style={{ marginTop: '12px' }}>{m.bio}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}