import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()

  const handleDemo = (role: any) => {
    login(role)
    nav('/dashboard')
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <div className="space-y-3">
        <button onClick={() => handleDemo('member')} className="w-full px-4 py-2 rounded bg-[var(--color-primary)] text-white">Sign in as Member (Demo)</button>
        <button onClick={() => handleDemo('leader')} className="w-full px-4 py-2 rounded border">Sign in as Leader (Demo)</button>
        <button onClick={() => handleDemo('manager')} className="w-full px-4 py-2 rounded border">Sign in as Manager (Demo)</button>
        <button onClick={() => handleDemo('admin')} className="w-full px-4 py-2 rounded border">Sign in as Admin (Demo)</button>
      </div>
    </div>
  )
}
