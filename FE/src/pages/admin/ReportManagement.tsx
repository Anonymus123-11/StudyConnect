import Card from '../../components/cards/Card'
import { calculatePlatformStats, mockUsers, mockTeams, mockAIUsage } from '../../services/mock/mockData'

export default function ReportManagement() {
  const stats = calculatePlatformStats()
  const suspendedUsers = mockUsers.filter(u => u.status === 'suspended')
  const atRiskTeams = mockTeams.filter(t => t.status === 'at-risk')
  const topAIUsers = mockAIUsage.reduce((acc, a) => {
    const existing = acc.find(x => x.userId === a.userId)
    if (existing) existing.count += a.count
    else acc.push({ userId: a.userId, count: a.count })
    return acc
  }, [] as any[]).sort((a, b) => b.count - a.count).slice(0, 5)

  const ReportCard = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <Card className="border-l-4 border-[#FF6B00]">
      <h3 className="font-semibold mb-3 flex items-center gap-2 pb-2 border-b-2 border-[#FF6B00]">{icon} {title}</h3>
      {children}
    </Card>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Reports</h1>

      {/* Active Users Report */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ReportCard title="Platform Activity" icon="🌍">
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Users:</span><strong className="text-[#FF6B00]">{stats.totalUsers}</strong></div>
            <div className="flex justify-between"><span>Active Users:</span><strong className="text-green-600">{stats.activeUsers}</strong></div>
            <div className="flex justify-between"><span>Active Rate:</span><strong className="text-[#FF6B00]">{Math.round(stats.activeUsers / stats.totalUsers * 100)}%</strong></div>
            <div className="flex justify-between"><span>Suspended:</span><strong className="text-red-600">{suspendedUsers.length}</strong></div>
          </div>
        </ReportCard>

        <ReportCard title="Team Activity" icon="🏢">
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Teams:</span><strong className="text-[#FF6B00]">{mockTeams.length}</strong></div>
            <div className="flex justify-between"><span>Active Teams:</span><strong className="text-green-600">{stats.activeTeams}</strong></div>
            <div className="flex justify-between"><span>Avg Team Size:</span><strong className="text-[#FF6B00]">{Math.round(mockTeams.reduce((sum, t) => sum + t.members.length, 0) / mockTeams.length)}</strong></div>
            <div className="flex justify-between"><span>At Risk:</span><strong className="text-yellow-600">{atRiskTeams.length}</strong></div>
          </div>
        </ReportCard>
      </div>

      {/* Growth Metrics */}
      <ReportCard title="Growth Metrics" icon="📈">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Subscription Rate</p>
            <p className="text-2xl font-bold text-[#FF6B00]">{Math.round((stats.premiumUsers / stats.totalUsers * 100))}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg Active Days</p>
            <p className="text-2xl font-bold text-[#FF6B00]">24</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Retention Rate</p>
            <p className="text-2xl font-bold text-[#FF6B00]">85%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Monthly Growth</p>
            <p className="text-2xl font-bold text-green-600">+12%</p>
          </div>
        </div>
      </ReportCard>

      {/* Flagged Items */}
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {suspendedUsers.length > 0 && (
          <Card className="border-l-4 border-red-500 bg-red-50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">⚠️ Suspended Accounts ({suspendedUsers.length})</h3>
            <div className="space-y-1">
              {suspendedUsers.map(u => (
                <div key={u.id} className="text-sm text-gray-700">{u.name} ({u.email})</div>
              ))}
            </div>
          </Card>
        )}

        {atRiskTeams.length > 0 && (
          <Card className="border-l-4 border-yellow-500 bg-yellow-50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">⚠️ At-Risk Teams ({atRiskTeams.length})</h3>
            <div className="space-y-1">
              {atRiskTeams.map(t => (
                <div key={t.id} className="text-sm text-gray-700">{t.name} - Health: {t.healthScore}%</div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* AI Usage Report */}
      <ReportCard title="AI Feature Usage" icon="🤖">
        <div className="space-y-2">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr><th className="text-left p-2">User</th><th className="text-left p-2">Total Requests</th></tr>
            </thead>
            <tbody>
              {topAIUsers.map((item) => {
                const user = mockUsers.find(u => u.id === item.userId)
                return (
                  <tr key={item.userId} className="border-b">
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2 font-bold text-[#FF6B00]">{item.count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ReportCard>

      {/* Export Section */}
      <Card className="mt-6">
        <h3 className="font-semibold mb-3">Export Reports</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">📊 Export CSV</button>
          <button className="px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">📑 Export PDF</button>
          <button className="px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">📧 Email Report</button>
        </div>
      </Card>
    </div>
  )
}
