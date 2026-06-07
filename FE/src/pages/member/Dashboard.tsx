import Card from '../../components/cards/Card'
import ContributionChart from '../../components/charts/ContributionChart'
import { mockTeams, getTeamsByLeader, mockTasks } from '../../services/mock/mockData'
import { useAuth } from '../../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const userTeams = mockTeams.filter(t => t.members.includes(user?.id || ''))
  const leadTeams = user ? getTeamsByLeader(user.id) : []

  const KPICard = ({ label, value, icon, color = 'text-[#FF6B00]' }: { label: string; value: string | number; icon: string; color?: string }) => (
    <div className={`card flex items-center gap-4 border-l-4 border-[#FF6B00]`}>
      <div className={`text-4xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-[#FF6B00]">{value}</p>
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* KPI Row */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Active Teams" value={userTeams.length} icon="👥" />
        <KPICard label="Total Tasks" value={mockTasks.length} icon="✓" />
        <KPICard label="Completed" value={mockTasks.filter(t => t.status === 'completed').length} icon="🎯" />
        <KPICard label="In Progress" value={mockTasks.filter(t => t.status === 'in-progress').length} icon="⚡" />
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Active Projects */}
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">📋</span>
            <h3 className="font-semibold text-lg">Active Teams</h3>
          </div>
          <div className="space-y-2">
            {userTeams.length > 0 ? userTeams.map(team => (
              <div key={team.id} className="flex justify-between items-center p-2 rounded bg-[#FFF4E8]">
                <span>{team.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${team.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{team.status}</span>
              </div>
            )) : <p className="text-sm text-gray-500">No teams yet</p>}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">📊</span>
            <h3 className="font-semibold text-lg">Your Stats</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Teams Leading:</span><strong className="text-[#FF6B00]">{leadTeams.length}</strong></div>
            <div className="flex justify-between"><span>Team Members:</span><strong className="text-[#FF6B00]">{userTeams.reduce((sum, t) => sum + t.members.length, 0)}</strong></div>
            <div className="flex justify-between"><span>Avg Team Health:</span><strong className="text-[#FF6B00]">{userTeams.length > 0 ? Math.round(userTeams.reduce((sum, t) => sum + t.healthScore, 0) / userTeams.length) : 0}%</strong></div>
          </div>
        </Card>
      </div>

      {/* Contribution Chart */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">📈</span>
            <h3 className="font-semibold text-lg">Weekly Activity</h3>
          </div>
          <ContributionChart />
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">⚡</span>
            <h3 className="font-semibold text-lg">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">+ Create Team</button>
            <button className="w-full px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">💡 Generate Idea</button>
            <button className="w-full px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">🎯 Find Team</button>
          </div>
        </Card>
      </div>
    </div>
  )
}
