import { useState } from 'react'
import { useVisitor } from '../context/VisitorContext'
import { Icon } from './Icon'
import Particles from './Particles'

export default function Welcome({ onExplore, leaving = false }) {
  const { enter } = useVisitor()
  const [step, setStep] = useState(0)
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const clean = input.trim()
    if (!clean) {
      setError('من فضلك اكتب اسمك أولًا')
      return
    }
    setError('')
    setSaving(true)
    await enter(clean)
    setName(clean)
    setStep(1)
    setSaving(false)
  }

  return (
    <div className={`welcome-wrap${leaving ? ' leaving' : ''}`}>
      <Particles />
      {step === 0 ? (
        <form className="welcome-card" onSubmit={submit}>
          <div className="welcome-gold-rays" />
          <div className="welcome-logo">
            <Icon name="lock" size={52} />
          </div>
          <h1 className="welcome-title">أهلًا بك 👋</h1>
          <p className="welcome-sub">يسعدنا حضورك ومشاركتك لنا فرحة التخرج</p>
          <p style={{ color: 'var(--cream-2)', marginBottom: '18px', fontSize: '1.05rem' }}>ما اسمك؟</p>
          <input
            className="welcome-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب اسمك هنا"
            maxLength={60}
            autoFocus
            dir="rtl"
          />
          {error && <p className="field-error">{error}</p>}
          <button type="submit" className="btn btn-block" disabled={saving}>
            {saving ? 'جارٍ...' : 'دخول ✨'}
          </button>
        </form>
      ) : (
        <div className="welcome-card welcome-note enter">
          <div className="welcome-gold-rays" />
          <h1 className="welcome-greeting">
            أهلاً وسهلاً بك يا <span className="welcome-name">{name}</span> 🤍
          </h1>
          <p className="welcome-msg">
            بكل فخر وامتنان، نرحّب بكم في مشروع تخرجنا، ونشكركم من القلب على حضوركم ومشاركتنا
            هذه اللحظة المميزة. حضوركم كان أجمل دعمٍ لنا، ووجودكم اليوم يضيف إلى فرحتنا معنىً خاصاً. 🤍
          </p>
          <div className="welcome-team">نحن: قصي، محمود، ومحمد</div>
          <p className="welcome-msg">
            يسعدنا أن نشارككم ثمرة جهدنا وتعبنا، ونفخر بوجودكم معنا في هذه اللحظة التي نختتم بها
            رحلةً ونبدأ بها طريقاً جديداً.
          </p>
          <p className="welcome-msg welcome-final">أهلاً وسهلاً بكم، وشكراً لأنكم كنتم جزءاً من فرحتنا. 🤍</p>
          <button className="btn btn-block" onClick={onExplore}>
            ادخل إلى المشروع
          </button>
        </div>
      )}
    </div>
  )
}