import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Problem() {
  const { settings } = useData()
  return (
    <section className="section section-alt" id="problem">
      <SectionTitle eyebrow="لماذا نحتاج ذلك؟" title="المشكلة" />
      <Reveal>
        <div className="panel-box" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h3><Icon name="lock" size={22} /></h3>
          <p style={{ color: 'var(--cream)', fontSize: '1.08rem', lineHeight: '2', textAlign: 'justify' }}>
            {settings.problem}
          </p>
        </div>
      </Reveal>
    </section>
  )
}