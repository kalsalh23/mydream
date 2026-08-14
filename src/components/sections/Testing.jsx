import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Testing() {
  const { settings } = useData()
  const tests = Array.isArray(settings.testing) ? settings.testing : []
  return (
    <section className="section section-alt" id="testing">
      <SectionTitle eyebrow="التحقق من النظام" title="الاختبارات والنتائج" subtitle="لم تُدرج أي نسب نجاح حتى تتم إضافتها من فريق المشروع" />
      <div className="grid grid-2" style={{ maxWidth: '900px' }}>
        {tests.map((t, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="card test-card">
              <h3><Icon name="check" size={20} /> {t.title}</h3>
              {(t.items || []).map((item, j) => (
                <div key={j} className="test-item">
                  <span className="check-ic"><Icon name="check" size={16} /></span>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}