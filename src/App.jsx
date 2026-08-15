import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { VisitorProvider } from './context/VisitorContext'
import { ToastProvider } from './components/Toast'
import Welcome from './components/Welcome'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { Icon } from './components/Icon'
import { validateAdmin } from './lib/supabase'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-ring" />
    </div>
  )
}

function OpeningOverlay({ exiting, onExit }) {
  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(onExit, 900)
    return () => clearTimeout(t)
  }, [exiting, onExit])

  return (
    <div className={`open-overlay${exiting ? ' exiting' : ''}`}>
      <div className="open-core">
        <Icon name="unlock" size={46} />
      </div>
      <h2 className="open-title">
        أهلاً بك في <span>مشروع تخرجنا</span>
      </h2>
      <p className="open-sub">بصمة الإصبع والصوت — قفل إلكتروني ذكي</p>
    </div>
  )
}

function Gate() {
  const [showHome, setShowHome] = useState(false)
  const [phase, setPhase] = useState('idle')
  const loc = useLocation()

  const isAdminRoute = loc.pathname.startsWith('/admin')

  useEffect(() => {
    document.title = 'قفل إلكتروني بواسطة بصمة الإصبع والصوت | مشروع تخرج'
  }, [])

  const handleExplore = () => {
    if (phase !== 'idle') return
    setPhase('leaving')
    setTimeout(() => setPhase('opening'), 480)
    setTimeout(() => setShowHome(true), 1550)
    setTimeout(() => setPhase('reveal'), 1620)
  }

  if (isAdminRoute) return null

  if (!showHome) {
    return (
      <>
        <Welcome onExplore={handleExplore} leaving={phase === 'leaving'} />
        {phase === 'opening' && <OpeningOverlay />}
      </>
    )
  }

  return (
    <>
      {phase === 'reveal' && <OpeningOverlay exiting onExit={() => setPhase('done')} />}
      <div className="home-enter">
        <Home />
      </div>
    </>
  )
}

function Protected({ children }) {
  const [checking, setChecking] = useState(true)
  const [ok, setOk] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      const isAdmin = await validateAdmin()
      setOk(isAdmin)
      setChecking(false)
    })()
  }, [])

  if (checking) return <LoadingScreen />
  if (!ok) {
    nav('/admin/login', { replace: true })
    return null
  }
  return children
}

export default function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <VisitorProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Gate />} />
              <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<Gate />} />
            </Routes>
          </HashRouter>
        </VisitorProvider>
      </ToastProvider>
    </DataProvider>
  )
}