import Card from '../../components/cards/Card'
import { mockUsers, mockTeams, calculatePlatformStats, mockPayments, mockAIUsage } from '../../services/mock/mockData'

export default function AdminDashboard() {
  const stats = calculatePlatformStats()
  const totalAIRequests = mockAIUsage.reduce((sum, u) => sum + u.count, 0)
  const estimatedCost = totalAIRequests * 0.01 // $0.01 per request

  const StatCard = ({ label, value, subtext, icon }: { label: string; value: string | number; subtext?: string; icon: string }) => (
    <div className="card border-l-4 border-[#FF6B00]">
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

      {/* Main KPIs */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard label="Premium Users" value={stats.premiumUsers} subtext={`${Math.round(stats.premiumUsers / stats.totalUsers * 100)}% conversion`} icon="⭐" />
        <StatCard label="Active Teams" value={stats.activeTeams} icon="🏢" />
        <StatCard label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="💰" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{stats.activeUsers}</p>
        </Card>
        <Card className="border-l-4 border-green-500">
          <p className="text-sm text-gray-600">AI Requests (Monthly)</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{totalAIRequests}</p>
        </Card>
        <Card className="border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Estimated AI Cost</p>
          <p className="text-3xl font-bold text-[#FF6B00]">${estimatedCost.toFixed(2)}</p>
        </Card>
      </div>

      {/* User & Team Management */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">👥</span>
            <h3 className="font-semibold">User Overview</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Users:</span><strong className="text-[#FF6B00]">{stats.totalUsers}</strong></div>
            <div className="flex justify-between"><span>Active:</span><strong className="text-green-600">{stats.activeUsers}</strong></div>
            <div className="flex justify-between"><span>Suspended:</span><strong className="text-red-600">{mockUsers.filter(u => u.status === 'suspended').length}</strong></div>
            <div className="flex justify-between"><span>Free Plan:</span><strong className="text-[#FF6B00]">{mockUsers.filter(u => u.subscription === 'free').length}</strong></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">🏢</span>
            <h3 className="font-semibold">Team Overview</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Teams:</span><strong className="text-[#FF6B00]">{mockTeams.length}</strong></div>
            <div className="flex justify-between"><span>Active:</span><strong className="text-green-600">{mockTeams.filter(t => t.status === 'active').length}</strong></div>
            <div className="flex justify-between"><span>At Risk:</span><strong className="text-yellow-600">{mockTeams.filter(t => t.status === 'at-risk').length}</strong></div>
            <div className="flex justify-between"><span>Avg Team Size:</span><strong className="text-[#FF6B00]">{Math.round(mockTeams.reduce((sum, t) => sum + t.members.length, 0) / mockTeams.length)}</strong></div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
          <span className="text-xl">💳</span>
          <h3 className="font-semibold">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr><th className="text-left p-2">User</th><th className="text-left p-2">Plan</th><th className="text-left p-2">Amount</th><th className="text-left p-2">Status</th></tr>
            </thead>
            <tbody>
              {mockPayments.slice(-5).map(p => {
                const user = mockUsers.find(u => u.id === p.userId)
                return (
                  <tr key={p.id} className="border-b hover:bg-[#FFF4E8]">
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2 capitalize">{p.plan}</td>
                    <td className="p-2 font-bold text-[#FF6B00]">${p.amount.toFixed(2)}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{p.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Admin Actions */}
      <div className="mt-6 card">
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
