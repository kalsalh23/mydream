import { createContext, useCallback, useContext, useState } from 'react'
import { Icon } from './Icon'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)

  const show = useCallback((m) => {
    setMsg(m)
    setTimeout(() => setMsg(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      {msg && (
        <div className="toast">
          <Icon name="check" size={18} />
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}