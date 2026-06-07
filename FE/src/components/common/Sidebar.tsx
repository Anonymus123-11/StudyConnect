import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

const NavItem = ({
  to,
  children,
  icon,
  end = false,
}: {
  to: string
  children: React.ReactNode
  icon?: React.ReactNode
  end?: boolean
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded text-sm transition ${
        isActive
          ? 'bg-[#FF6B00] text-white font-semibold'
          : 'text-gray-700 hover:bg-[#FFF4E8]'
      }`
    }
  >
    {icon && <span className="text-lg">{icon}</span>}
    {children}
  </NavLink>
)

export default function Sidebar() {
  const { role, logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(true)

  const memberNav = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/opportunities', label: 'Opportunities', icon: '🎯' },
    { to: '/idea-generator', label: 'Idea Generator', icon: '💡' },
    { to: '/team-matching', label: 'Team Matching', icon: '👥' },
    { to: '/workspace', label: 'Workspace', icon: '📋' },
    { to: '/analytics', label: 'Analytics', icon: '📈' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ]

  const leaderNav = [...memberNav, { to: '/team-management', label: 'Team Management', icon: '🛠️' }]

  const managerNav = [
    { to: '/manager', label: 'Dashboard', icon: '📊', end: true },
    { to: '/manager/teams', label: 'Team Monitoring', icon: '👁️' },
    { to: '/manager/invitations', label: 'Invitations', icon: '📬' },
  ]

  const adminNav = [
    { to: '/admin', label: 'Dashboard', icon: '🏢', end: true },
    { to: '/admin/users', label: 'User Management', icon: '👥' },
    { to: '/admin/subscriptions', label: 'Subscriptions', icon: '💳' },
    { to: '/admin/payments', label: 'Payments', icon: '💰' },
    { to: '/admin/reports', label: 'System Reports', icon: '📊' },
  ]

  const navItems = role === 'member' ? memberNav : role === 'leader' ? leaderNav : role === 'manager' ? managerNav : role === 'admin' ? adminNav : []

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-4">
        <Menu size={24} />
      </button>
      <aside className={`fixed md:relative w-64 border-r bg-white transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 h-screen flex flex-col`}>
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-[#FF6B00]">StudyConnect</h2>
          {user && <p className="text-xs text-gray-500 mt-1 capitalize">{user.role}</p>}
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              end={(item as any).end}
            >
              {item.label}
            </NavItem>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm bg-[#FFF4E8] text-[#FF6B00] hover:bg-[#FFA64D] hover:text-white">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
