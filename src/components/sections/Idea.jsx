import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'

export default function Idea() {
  const { settings } = useData()
  return (
    <section className="section" id="idea">
      <SectionTitle eyebrow="رؤيتنا" title="فكرة المشروع" />
      <Reveal>
        <div className="conclusion-box" style={{ padding: '40px 28px' }}>
          <p>{settings.description}</p>
          <p style={{ marginTop: '18px', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted)' }}>
            يعتمد النموذج على متحكم Arduino UNO، وحساس بصمة AS608 للتعرف على المستخدم، ووحدة Bluetooth HC-06 للاتصال
            اللاسلكي، ومحرك Servo لتنفيذ حركة الفتح والإغلاق ميكانيكيًا.
          </p>
        </div>
      </Reveal>
    </section>
  )
}