import Card from '../../components/cards/Card'
import { mockUsers, calculatePlatformStats, mockPayments, mockAIUsage } from '../../services/mock/mockData'

export default function AdminDashboard() {
  const stats = calculatePlatformStats()
  const totalAIRequests = mockAIUsage.reduce((sum, u) => sum + u.count, 0)
  
  const totalStudents = mockUsers.filter(u => u.role === 'student').length
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length

  const activeUserFromStorage = localStorage.getItem('user')
  let extraRevenue = 0
  let currentTierName = 'free'
  
  if (activeUserFromStorage) {
    const parsedUser = JSON.parse(activeUserFromStorage)
    currentTierName = parsedUser.tier || 'free'
    if (currentTierName === 'student-basic') extraRevenue = 4.99
    if (currentTierName === 'student-pro') extraRevenue = 9.99
    if (currentTierName === 'teacher-pro') extraRevenue = 19.99
  }

  const baseRevenueToday = 125.50
  const revenueToday = baseRevenueToday + extraRevenue
  const revenueThisMonth = stats.totalRevenue + extraRevenue
  const newRegistrationsToday = 14 + (currentTierName !== 'free' ? 1 : 0)

  const StatCard = ({ label, value, subtext, icon }: { label: string; value: string | number; subtext?: string; icon: string }) => (
    <div className="card border-l-4 border-[#FF6B00] bg-white p-4 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-[#FF6B00]">{value}</p>
          {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={totalStudents} icon="👨‍🎓" />
        <StatCard label="Total Teachers" value={totalTeachers} icon="👩‍🏫" />
        <StatCard label="Revenue Today" value={`$${revenueToday.toFixed(2)}`} subtext="Real-time updated" icon="⚡" />
        <StatCard label="Revenue This Month" value={`$${revenueThisMonth.toFixed(2)}`} icon="💰" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">New Registrations (Today)</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{newRegistrationsToday}</p>
        </Card>
        <Card className="border-l-4 border-green-500">
          <p className="text-sm text-gray-600">AI Usage (Total Requests)</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{totalAIRequests}</p>
        </Card>
        <Card className="border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Conversion Rate</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{Math.round((stats.premiumUsers / stats.totalUsers) * 100)}%</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">👥</span>
            <h3 className="font-semibold">User Overview</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Active Users:</span><strong className="text-[#FF6B00]">{stats.activeUsers}</strong></div>
            <div className="flex justify-between"><span>Suspended Accounts:</span><strong className="text-red-600">{mockUsers.filter(u => u.status === 'suspended').length}</strong></div>
            <div className="flex justify-between"><span>Free Tier Users:</span><strong className="text-gray-600">{mockUsers.filter(u => u.subscription === 'free').length}</strong></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">💳</span>
            <h3 className="font-semibold">Recent Live Payments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2">Plan</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {extraRevenue > 0 && (
                  <tr className="border-b bg-green-50 animate-pulse">
                    <td className="p-2 capitalize font-medium text-green-700">{currentTierName.replace('-', ' ')}</td>
                    <td className="p-2 font-bold text-green-700">${extraRevenue.toFixed(2)}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded bg-green-200 text-green-800 text-xs">Success (Live)</span></td>
                  </tr>
                )}
                {mockPayments.slice(-3).map(p => (
                  <tr key={p.id} className="border-b hover:bg-[#FFF4E8]">
                    <td className="p-2 capitalize">{p.plan}</td>
                    <td className="p-2 font-bold text-[#FF6B00]">${p.amount.toFixed(2)}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6 card bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-3">Admin Controls</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <button className="px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">👥 Manage Users</button>
          <button className="px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">💳 Manage Subscriptions</button>
          <button className="px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">📊 View Reports</button>
        </div>
      </div>
    </div>
  )
}