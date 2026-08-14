import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import { Icon } from '../components/Icon'

export default function AdminLogin() {
  const nav = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err || !data.session) {
      setError('بيانات الدخول غير صحيحة')
      return
    }
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('is_admin')
      .eq('id', data.session.user.id)
      .maybeSingle()
    if (!profile?.is_admin) {
      await supabase.auth.signOut()
      setError('هذا الحساب ليس بحساب مدير')
      return
    }
    toast('تم تسجيل الدخول بنجاح')
    nav('/admin')
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <div style={{ textAlign: 'center', color: 'var(--gold-light)' }}>
          <Icon name="shield" size={44} />
        </div>
        <h1>لوحة الإدارة</h1>
        <p>تسجيل دخول المشرفين والفريق</p>
        <div className="field">
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required dir="ltr" />
        </div>
        <div className="field">
          <label>كلمة المرور</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {error && <p className="field-error" style={{ marginBottom: 14 }}>{error}</p>}
        <button className="btn btn-block" disabled={loading}>
          {loading ? 'جارٍ الدخول...' : 'دخول'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 18 }}>
          <a href="#/" onClick={(e) => { e.preventDefault(); nav('/') }} style={{ color: 'var(--gold-light)', fontSize: '0.9rem' }}>
            → العودة إلى الموقع
          </a>
        </p>
      </form>
    </div>
  )
}