import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'

export default function Conclusion() {
  const { settings } = useData()
  return (
    <section className="section section-gold" id="conclusion">
      <SectionTitle eyebrow="كلمة أخيرة" title="الخاتمة" />
      <Reveal>
        <div className="conclusion-box">
          <p>{settings.conclusion}</p>
        </div>
      </Reveal>
    </section>
  )
}