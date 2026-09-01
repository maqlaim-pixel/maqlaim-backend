import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

// Auto-logout timers (in milliseconds)
const USER_SESSION_TIMEOUT = 3600000   // 1 hour for regular users
const ADMIN_SESSION_TIMEOUT = 7200000  // 2 hours for admins
const WARNING_BEFORE_EXPIRY = 60000    // Show warning 60 seconds before logout

// Decode JWT to get expiration
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('tv_token'))
  const [loading, setLoading] = useState(true)
  const [showExpiryWarning, setShowExpiryWarning] = useState(false)
  const [expiryCountdown, setExpiryCountdown] = useState(0)

  const activityTimerRef = useRef(null)
  const expiryCheckRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const warningShownRef = useRef(false)

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'content_manager' || user?.role === 'editor' || user?.role === 'sales' || user?.role === 'contributor'
  const isCustomer = !!user && !isAdmin

  // Get session timeout based on role
  const getSessionTimeout = useCallback((userRole) => {
    if (!userRole) return USER_SESSION_TIMEOUT
    const adminRoles = ['super_admin', 'admin', 'editor', 'sales', 'contributor']
    return adminRoles.includes(userRole) ? ADMIN_SESSION_TIMEOUT : USER_SESSION_TIMEOUT
  }, [])

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('tv_token')
    localStorage.removeItem('tv_user')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
    setShowExpiryWarning(false)
    warningShownRef.current = false
    // Clear all timers
    if (activityTimerRef.current) clearTimeout(activityTimerRef.current)
    if (expiryCheckRef.current) clearInterval(expiryCheckRef.current)
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
  }, [])

  // Auto-logout when session expires
  const handleAutoLogout = useCallback((reason) => {
    setShowExpiryWarning(false)
    alert(`Session expired. ${reason === 'inactivity' ? 'You have been logged out due to inactivity.' : 'Your session has ended.'}`)
    logout()
  }, [logout])

  // Reset activity timer on user interaction
  const resetActivityTimer = useCallback(() => {
    if (activityTimerRef.current) clearTimeout(activityTimerRef.current)
    
    // Don't set timer if not logged in
    if (!token || !user) return
    
    const timeout = getSessionTimeout(user.role)
    
    activityTimerRef.current = setTimeout(() => {
      handleAutoLogout('inactivity')
    }, timeout)
  }, [token, user, getSessionTimeout, handleAutoLogout])

  // Start session monitoring
  const startSessionMonitoring = useCallback(() => {
    if (!token || !user) return
    
    // Check token expiration every 30 seconds
    if (expiryCheckRef.current) clearInterval(expiryCheckRef.current)
    expiryCheckRef.current = setInterval(() => {
      const payload = decodeToken(token)
      if (!payload || !payload.exp) {
        // If we can't decode, use inactivity-based check
        return
      }
      const expiresAt = payload.exp * 1000 // Convert to ms
      const now = Date.now()
      const timeLeft = expiresAt - now
      
      if (timeLeft <= 0) {
        // Token expired
        clearInterval(expiryCheckRef.current)
        handleAutoLogout('token_expired')
        return
      }
      
      // Show warning 60 seconds before expiry
      if (timeLeft <= WARNING_BEFORE_EXPIRY && !warningShownRef.current) {
        warningShownRef.current = true
        setShowExpiryWarning(true)
        setExpiryCountdown(Math.ceil(timeLeft / 1000))
        
        // Start countdown
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
        countdownIntervalRef.current = setInterval(() => {
          const remaining = Math.ceil((expiresAt - Date.now()) / 1000)
          if (remaining <= 0) {
            clearInterval(countdownIntervalRef.current)
            handleAutoLogout('token_expired')
          } else {
            setExpiryCountdown(remaining)
          }
        }, 1000)
      }
    }, 30000) // Check every 30 seconds
    
    // Start inactivity timer
    resetActivityTimer()
  }, [token, user, resetActivityTimer, handleAutoLogout])

  // Track user activity to reset inactivity timer
  useEffect(() => {
    if (!token || !user) return
    
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      if (!showExpiryWarning) {
        resetActivityTimer()
      }
    }
    
    events.forEach(event => document.addEventListener(event, handleActivity, { passive: true }))
    
    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity))
    }
  }, [token, user, showExpiryWarning, resetActivityTimer])

  // Extend session (when user clicks 'Continue' on warning)
  const extendSession = useCallback(() => {
    setShowExpiryWarning(false)
    warningShownRef.current = false
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    resetActivityTimer()
    startSessionMonitoring()
  }, [resetActivityTimer, startSessionMonitoring])

  // Start monitoring when user/token changes
  useEffect(() => {
    if (token && user) {
      startSessionMonitoring()
    }
    return () => {
      if (expiryCheckRef.current) clearInterval(expiryCheckRef.current)
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
      if (activityTimerRef.current) clearTimeout(activityTimerRef.current)
    }
  }, [token, user, startSessionMonitoring])

  const loadUser = useCallback(async (tkn) => {
    if (tkn) {
      try {
        // Try admin endpoint first, then customer
        let res
        try {
          res = await api.get('/admin/me')
        } catch {
          res = await api.get('/auth/me')
        }
        setUser(res.data)
        // Also update localStorage with fresh data
        localStorage.setItem('tv_user', JSON.stringify(res.data))
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [logout])

  // Refresh user data from server (call after profile update)
  const refreshUser = useCallback(async () => {
    if (!token) return
    try {
      let res
      try {
        res = await api.get('/admin/me')
      } catch {
        res = await api.get('/auth/me')
      }
      setUser(res.data)
      localStorage.setItem('tv_user', JSON.stringify(res.data))
    } catch {
      // Silently fail
    }
  }, [token])

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      loadUser(token)
    } else {
      setLoading(false)
    }
  }, [token, loadUser])

  const login = async (email, password) => {
    const res = await api.post('/admin/login', { email, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    warningShownRef.current = false
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  const customerLogin = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    warningShownRef.current = false
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  const register = async (name, email, phone, password) => {
    const res = await api.post('/auth/register', { name, email, phone, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    warningShownRef.current = false
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, customerLogin, register, logout, isAdmin, isCustomer, showExpiryWarning, expiryCountdown, extendSession, refreshUser }}>
      {children}
      {/* Session Expiry Warning Modal */}
      {showExpiryWarning && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={extendSession}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Session Expiring Soon</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your session will expire in <span className="font-bold text-red-600">{expiryCountdown} seconds</span>.
              Click below to continue your session.
            </p>
            <div className="flex gap-3">
              <button
                onClick={logout}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={extendSession}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Continue Session
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
