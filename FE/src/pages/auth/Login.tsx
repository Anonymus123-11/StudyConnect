import { useAuth, Role } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login, updateTier } = useAuth()
  const nav = useNavigate()

  const handleDemo = (role: Role) => {
    login(role)

    // Khôi phục lại chính xác gói cước đã mua của role này trước khi chuyển trang
    const savedTiers = JSON.parse(localStorage.getItem('purchased_tiers') || '{}')
    if (savedTiers[role]) {
      updateTier(savedTiers[role])
    }

    if (role === 'admin') nav('/admin')
    else if (role === 'teacher') nav('/teacher')
    else nav('/dashboard')
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Sign in to System</h2>
      <div className="space-y-3">
        <button onClick={() => handleDemo('student')} className="w-full px-4 py-2 rounded bg-[#FF6B00] text-white font-medium hover:bg-[#E85A00] transition">
          Sign in as Student (Demo)
        </button>
        <button onClick={() => handleDemo('teacher')} className="w-full px-4 py-2 rounded border border-gray-300 font-medium hover:bg-gray-50 transition">
          Sign in as Teacher (Demo)
        </button>
        <button onClick={() => handleDemo('admin')} className="w-full px-4 py-2 rounded border border-gray-300 font-medium hover:bg-gray-50 transition">
          Sign in as Admin (Demo)
        </button>
      </div>
    </div>
  )
}