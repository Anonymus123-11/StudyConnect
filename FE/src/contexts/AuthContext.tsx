import { createContext, useState, useContext, ReactNode } from 'react'

export type Role = 'guest' | 'member' | 'leader' | 'manager' | 'admin'

type User = {
  id: string
  name: string
  email: string
  role: Role
}

type AuthContextValue = {
  user: User | null
  role: Role
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (role: Role) => {
    const mock: User = {
      id: 'u1',
      name: role === 'guest' ? 'Guest' : `${role[0].toUpperCase() + role.slice(1)} User`,
      email: `${role}@example.com`,
      role,
    }
    setUser(mock)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, role: (user?.role ?? 'guest') as Role, login, logout }}>
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
