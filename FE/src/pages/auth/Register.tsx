import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { login } = useAuth()
  const nav = useNavigate()

  const handleRegister = () => {
    login('student')
    nav('/dashboard')
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create your account</h2>
      <p className="text-sm text-gray-600 mb-4">Registration is mocked — this will create a demo Member account.</p>
      <div>
        <button onClick={handleRegister} className="px-4 py-2 rounded bg-[var(--color-primary)] text-white">Register (Demo)</button>
      </div>
    </div>
  )
}
