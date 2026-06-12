export type UserRole = 'student' | 'teacher' | 'admin'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}
