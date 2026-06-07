import Card from '../../components/cards/Card'
import { mockTeams, calculatePlatformStats } from '../../services/mock/mockData'
import { useState } from 'react'

export default function ManagerDashboard() {
  const stats = calculatePlatformStats()
  const activeTeams = mockTeams.filter(t => t.status === 'active')
  const atRiskTeams = mockTeams.filter(t => t.status === 'at-risk')
  const [teams] = useState(mockTeams)

  const StatCard = ({ label, value, icon }: { label: string; value: number; icon: string }) => (
    <div className="card border-l-4 border-[#FF6B00]">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-[#FF6B00]">{value}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Teams" value={teams.length} icon="👥" />
        <StatCard label="Active Teams" value={activeTeams.length} icon="✓" />
        <StatCard label="At Risk" value={atRiskTeams.length} icon="⚠️" />
        <StatCard label="Platform Users" value={stats.activeUsers} icon="🌍" />
      </div>

      {/* Teams Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">📊</span>
            <h3 className="font-semibold text-lg">Team Status</h3>
          </div>
          <div className="space-y-3">
            {teams.map(team => (
              <div key={team.id} className="flex items-center justify-between p-3 rounded bg-[#FFF4E8]">
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-xs text-gray-600">{team.members.length} members • {team.projectCount} projects</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6B00]">{team.healthScore}%</div>
                  <div className={`text-xs ${team.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{team.status}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-[#FF6B00]">
            <span className="text-xl">⚡</span>
            <h3 className="font-semibold text-lg">Manager Actions</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E85A00] font-medium">+ Create Team</button>
            <button className="w-full px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">📋 View All Teams</button>
            <button className="w-full px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">📬 Manage Invitations</button>
            <button className="w-full px-4 py-2 rounded border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8] font-medium">📊 View Reports</button>
          </div>
        </Card>
      </div>

      {/* At-Risk Teams Alert */}
      {atRiskTeams.length > 0 && (
        <div className="mt-6 card border-l-4 border-yellow-500 bg-yellow-50">
          <h3 className="font-semibold flex items-center gap-2 mb-2">⚠️ Teams Needing Attention</h3>
          <div className="space-y-1">
            {atRiskTeams.map(team => (
              <div key={team.id} className="text-sm text-gray-700">
                <strong>{team.name}</strong> - Health Score: {team.healthScore}% (Low engagement detected)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
