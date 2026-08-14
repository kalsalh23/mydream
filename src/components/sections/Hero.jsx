import { useData } from '../../context/DataContext'
import { Icon } from '../Icon'
import Particles from '../Particles'

export default function Hero() {
  const { settings } = useData()
  return (
    <section className="hero" id="hero">
      <Particles count={22} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span className="hero-lock">
          <Icon name="lock" size={56} />
        </span>
        <p className="hero-college">{settings.college_name} • {settings.specialization}</p>
        <h1 className="hero-title">
          <span className="text-gold">{settings.short_title}</span>
        </h1>
        <p className="hero-sub">{settings.description}</p>
        <div className="hero-badges">
          <span className="hero-badge">بصمة الإصبع</span>
          <span className="hero-badge">التحكم الصوتي</span>
          <span className="hero-badge">{settings.project_type} • {settings.graduation_year}</span>
        </div>
        <a className="btn" href="#idea">
          ابدأ الرحلة 🎓
        </a>
      </div>
      <div className="hero-scroll">
        <Icon name="arrowDown" size={22} />
        <span>اكتشف المشروع</span>
      </div>
    </section>
  )
}