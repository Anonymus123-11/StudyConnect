import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'
import { useAuth, Role } from '../contexts/AuthContext'

import Landing from '../pages/public/Landing'
import Pricing from '../pages/public/Pricing'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import Dashboard from '../pages/student/Dashboard'
import Profile from '../pages/student/Profile'
import Opportunities from '../pages/student/Opportunities'
import IdeaGenerator from '../pages/student/IdeaGenerator'
import TeamMatching from '../pages/student/TeamMatching'
import Workspace from '../pages/student/Workspace'
import Analytics from '../pages/student/Analytics'

import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeamMonitoring from '../pages/teacher/TeamMonitoring'
import StudentInvitations from '../pages/teacher/StudentInvitations'

import AdminDashboard from '../pages/admin/AdminDashboard'
import UserManagement from '../pages/admin/UserManagement'
import SubscriptionManagement from '../pages/admin/SubscriptionManagement'
import PaymentManagement from '../pages/admin/PaymentManagement'
import ReportManagement from '../pages/admin/ReportManagement'

const ProtectedRoute = ({ children, allowed }: { children: JSX.Element; allowed: Role[] }) => {
  const { role } = useAuth()
  if (!role || role === 'guest') return <Navigate to="/login" replace />
  if (!allowed.includes(role)) return <Navigate to="/" replace />
  return children
}

const RoleBasedRedirect = () => {
  const { role } = useAuth()
  if (role === 'admin') return <Navigate to="/admin" replace />
  if (role === 'teacher') return <Navigate to="/teacher" replace />
  return <Navigate to="/dashboard" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/app" element={<RoleBasedRedirect />} />

      <Route path="/" element={<MainLayout />}> 
        <Route index element={<Landing />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>

      <Route element={<AuthLayout />}> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route 
        path="/" 
        element={
          <ProtectedRoute allowed={['student', 'teacher', 'admin']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="idea-generator" element={<IdeaGenerator />} />
        <Route path="team-matching" element={<TeamMatching />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route 
        path="/teacher" 
        element={
          <ProtectedRoute allowed={['teacher', 'admin']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="teams" element={<TeamMonitoring />} />
        <Route path="invitations" element={<StudentInvitations />} />
      </Route>

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowed={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="subscriptions" element={<SubscriptionManagement />} />
        <Route path="payments" element={<PaymentManagement />} />
        <Route path="reports" element={<ReportManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}