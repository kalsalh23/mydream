import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { VisitorProvider } from './context/VisitorContext'
import { ToastProvider } from './components/Toast'
import Welcome from './components/Welcome'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { validateAdmin } from './lib/supabase'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-ring" />
    </div>
  )
}

function Gate() {
  const [showHome, setShowHome] = useState(false)
  const loc = useLocation()

  const isAdminRoute = loc.pathname.startsWith('/admin')

  useEffect(() => {
    document.title = 'قفل إلكتروني بواسطة بصمة الإصبع والصوت | مشروع تخرج'
  }, [])

  if (isAdminRoute) return null

  if (!showHome) {
    return <Welcome onExplore={() => setShowHome(true)} />
  }

  return <Home />
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