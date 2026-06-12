import { useAuth } from '../../contexts/AuthContext'
import { LogOut } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function TopNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      {/* Logo ứng dụng */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
        <span className="text-2xl">🚀</span>
        <h1 className="text-xl font-bold text-[#FF6B00]">EXE StudyConnect</h1>
      </Link>

      {/* Cụm điều khiển bên phải */}
      <div className="flex items-center gap-4">
        {!user ? (
          // CHƯA ĐĂNG NHẬP: Hiện nút Login thực tế chuyển hướng sang trang đăng nhập
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 border border-[#FF6B00] text-[#FF6B00] font-medium text-sm rounded hover:bg-[#FFF4E8] transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="px-4 py-2 bg-[#FF6B00] text-white font-medium text-sm rounded hover:bg-[#E85A00] transition shadow-sm"
            >
              Get Started
            </button>
          </div>
        ) : (
          // ĐÃ ĐĂNG NHẬP: Chỉ hiển thị Avatar thông tin User và nút Logout sạch sẽ
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-800">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>

            {/* Nút Đăng xuất */}
            <button 
              onClick={() => {
                logout()
                navigate('/')
              }} 
              title="Logout" 
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <LogOut size={18} className="text-gray-600 hover:text-[#FF6B00]" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}