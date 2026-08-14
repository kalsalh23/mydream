import { useVisitor } from '../context/VisitorContext'
import { useData } from '../context/DataContext'
import { Icon } from './Icon'

export default function Footer() {
  const { name } = useVisitor()
  const { settings } = useData()
  return (
    <footer className="footer">
      <h3 className="footer-title">
        <Icon name="lock" size={22} /> <span className="text-gold">{settings.project_name}</span>
      </h3>
      <p className="footer-credits">
        {settings.college_name} — {settings.specialization} • {settings.project_type} • {settings.graduation_year}
      </p>
      <div className="footer-dev">
        <Icon name="shield" size={18} /> {settings.developed_by || 'منصة مطوّرة خصيصًا لهذا المشروع'}
      </div>
      {name && (
        <p style={{ marginTop: '12px', color: 'var(--gold-light)', fontFamily: 'var(--font-title)', fontSize: '1.15rem' }}>
          شكرًا لزيارتك يا {name} ❤️
        </p>
      )}
      <div className="footer-copy">
        © {settings.graduation_year || new Date().getFullYear()} — جميع الحقوق محفوظة لفريق مشروع التخرج
      </div>
    </footer>
  )
}