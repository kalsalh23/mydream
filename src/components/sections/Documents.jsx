import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function Documents() {
  const { documents } = useData()
  return (
    <section className="section section-alt" id="files">
      <SectionTitle eyebrow="الموارد" title="ملفات المشروع" subtitle="تقرير التخرج، مخطط الدائرة، الكود البرمجي، والعرض التقديمي" />
      <div className="grid grid-3">
        {documents.length === 0 && (
          <Reveal className="gallery-empty" style={{}}>
            <Icon name="file" size={32} />
            <p style={{ marginTop: '10px' }}>يمكن رفع ملفات المشروع (PDF / كود / مخطط الفيديو) من لوحة الإدارة.</p>
          </Reveal>
        )}
        {documents.map((d, i) => (
          <Reveal key={d.id || i} delay={i * 70}>
            <a className="card doc-card" href={d.file_url} target="_blank" rel="noopener noreferrer">
              <div className="doc-icon"><Icon name={d.file_type === 'video' ? 'video' : 'file'} size={22} /></div>
              <div>
                <h4>{d.title}</h4>
                <span>{d.file_type}</span>
              </div>
              <span className="doc-arrow"><Icon name="arrowDown" size={18} /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}