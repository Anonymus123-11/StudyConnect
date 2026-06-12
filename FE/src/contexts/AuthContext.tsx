import { createContext, useState, useContext, ReactNode } from 'react'

export type Role = 'guest' | 'student' | 'teacher' | 'admin'
export type UserTier = 'free' | 'student-basic' | 'student-pro' | 'teacher-pro'

type User = {
  id: string
  name: string
  email: string
  role: Role
  tier: UserTier
}

type AuthContextValue = {
  user: User | null
  role: Role
  login: (role: Role) => void
  logout: () => void
  updateTier: (tier: UserTier) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  
  const login = (role: Role) => {
    const mock: User = {
      id: 'u1',
      name: role === 'guest' ? 'Guest' : `${role[0].toUpperCase() + role.slice(1)} User`,
      email: `${role}@example.com`,
      role,
      tier: 'free',
    }
    setUser(mock)
    localStorage.setItem('user', JSON.stringify(mock))
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const updateTier = (tier: UserTier) => {
    if (!user) return
    const updatedUser = { ...user, tier }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, role: (user?.role ?? 'guest') as Role, login, logout, updateTier }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext