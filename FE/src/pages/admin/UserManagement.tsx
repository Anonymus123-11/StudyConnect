import Card from '../../components/cards/Card'
import { mockUsers } from '../../services/mock/mockData'
import { useState } from 'react'

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleSuspend = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
  }

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Search Users</label>
            <input
              type="text"
              placeholder="Name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="all">All Roles</option>
              <option value="member">Member</option>
              <option value="leader">Leader</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Results</label>
            <div className="mt-1 px-3 py-2 bg-[#FFF4E8] rounded text-[#FF6B00] font-bold">{filteredUsers.length} users</div>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b-2 border-[#FF6B00]">
              <tr>
                <th className="text-left p-3 text-sm font-semibold">User</th>
                <th className="text-left p-3 text-sm font-semibold">Email</th>
                <th className="text-left p-3 text-sm font-semibold">Role</th>
                <th className="text-left p-3 text-sm font-semibold">Subscription</th>
                <th className="text-left p-3 text-sm font-semibold">Status</th>
                <th className="text-left p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-[#FFF4E8]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{user.avatar}</span>
                      <strong>{user.name}</strong>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm capitalize focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="member">Member</option>
                      <option value="leader">Leader</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 text-sm capitalize"><span className={`px-2 py-1 rounded text-xs ${user.subscription === 'premium' ? 'bg-[#FFA64D] text-white' : user.subscription === 'enterprise' ? 'bg-[#FF6B00] text-white' : 'bg-gray-100'}`}>{user.subscription}</span></td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSuspend(user.id)}
                      className={`px-3 py-1 rounded text-xs font-medium ${user.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
