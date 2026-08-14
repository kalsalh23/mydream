import { useData } from '../../context/DataContext'
import { Reveal, SectionTitle } from '../Reveal'
import { Icon } from '../Icon'

export default function BlockDiagram() {
  const { settings } = useData()
  const diagram = Array.isArray(settings.block_diagram) ? settings.block_diagram : []
  return (
    <section className="section" id="diagram">
      <SectionTitle eyebrow="الهيكل الهندسي" title="مخطط النظام" subtitle="ملاحظة: HC-06 وحدة Bluetooth للاتصال، والتعرف الصوتي يتم عبر الهاتف أو تطبيق خارجي" />
      <div className="diagram">
        {diagram.map((node, i) => (
          <Reveal key={i}>
            <div className="diagram-box">
              {node.from}
              <small>{node.to}</small>
            </div>
            {i < diagram.length - 1 && (
              <div className="diagram-arrow"><Icon name="arrowDown" size={20} /></div>
            )}
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="notice" style={{ textAlign: 'center', maxWidth: '520px', margin: '26px auto 0' }}>
          هذا المخطط قابل للتعديل من لوحة الإدارة، ويمكن إضافة وحدة تعرف صوتي مستقلة عند اعتمادها فعليًّا.
        </div>
      </Reveal>
    </section>
  )
}