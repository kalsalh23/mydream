import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { trackVisitor } from '../lib/supabase'

const VisitorContext = createContext(null)
const NAME_KEY = 'gp_visitor_name'

export function VisitorProvider({ children }) {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || '')
  const [entered, setEntered] = useState(false)
  const tracked = useRef(false)

  const enter = async (n) => {
    const clean = (n || '').trim()
    if (!clean) return false
    setName(clean)
    localStorage.setItem(NAME_KEY, clean)
    setEntered(true)
    if (!tracked.current) {
      tracked.current = true
      trackVisitor(clean)
    }
    return true
  }

  useEffect(() => {
    if (name && !tracked.current) {
      tracked.current = true
      trackVisitor(name)
    }
  }, [name])

  const reset = () => {
    setName('')
    setEntered(false)
    tracked.current = false
    localStorage.removeItem(NAME_KEY)
  }

  return (
    <VisitorContext.Provider value={{ name, entered, enter, reset }}>
      {children}
    </VisitorContext.Provider>
  )
}

export function useVisitor() {
  return useContext(VisitorContext)
}