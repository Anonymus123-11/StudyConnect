import { useAuth } from '../../contexts/AuthContext'
import { LogOut, Zap } from 'lucide-react'
import { useState } from 'react'

export default function TopNav() {
  const { user, logout, login } = useAuth()
  const [showRoleMenu, setShowRoleMenu] = useState(false)

  const roles = ['member', 'leader', 'manager', 'admin']

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        <h1 className="text-xl font-bold text-[#FF6B00]">EXE StudyConnect</h1>
      </div>
      <div className="flex items-center gap-4">
        {!user ? (
          <div className="flex gap-2">
            <button onClick={() => login('member')} className="px-3 py-1 rounded bg-[#FF6B00] text-white text-sm hover:bg-[#E85A00]">Demo Member</button>
            <button onClick={() => login('admin')} className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300">Demo Admin</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>
            {/* Role Switcher - Demo Only */}
            <div className="relative">
              <button onClick={() => setShowRoleMenu(!showRoleMenu)} className="flex items-center gap-1 px-2 py-1 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] text-sm">
                <Zap size={14} />
                Demo
              </button>
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  {roles.map(r => (
                    <button key={r} onClick={() => { login(r as any); setShowRoleMenu(false); }} className="w-full text-left px-4 py-2 text-sm capitalize hover:bg-[#FFF4E8] border-b last:border-b-0">
                      Sign in as {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={logout} title="Logout" className="p-2 rounded hover:bg-gray-100">
              <LogOut size={18} className="text-[#FF6B00]" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
