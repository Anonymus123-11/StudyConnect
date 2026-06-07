import Card from '../../components/cards/Card'
import { mockSubscriptions, mockUsers } from '../../services/mock/mockData'

export default function SubscriptionManagement() {
  const freeCount = mockSubscriptions.filter(s => s.plan === 'free').length
  const premiumCount = mockSubscriptions.filter(s => s.plan === 'premium').length
  const enterpriseCount = mockSubscriptions.filter(s => s.plan === 'enterprise').length

  const plans = [
    {
      name: 'Free',
      price: 0,
      users: freeCount,
      features: ['Basic Profile', 'Join Teams', 'Workspace Access', 'Basic Analytics'],
      color: 'gray',
    },
    {
      name: 'Premium',
      price: 9.99,
      users: premiumCount,
      features: ['Unlimited AI Ideas', 'Advanced Matching', 'Advanced Analytics', 'Export Reports', 'Priority Support'],
      color: 'orange',
    },
    {
      name: 'Enterprise',
      price: 49.99,
      users: enterpriseCount,
      features: ['Dedicated Manager', 'Custom Features', 'API Access', 'Analytics Dashboard', '24/7 Support'],
      color: 'red',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>

      {/* Plan Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {plans.map(plan => (
          <Card key={plan.name} className={`border-l-4 ${plan.color === 'orange' ? 'border-[#FF6B00]' : plan.color === 'red' ? 'border-red-500' : 'border-gray-300'}`}>
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-[#FF6B00] mb-3">${plan.price}/mo</p>
            <p className="text-sm text-gray-600 mb-3"><strong>{plan.users}</strong> users</p>
            <button className={`w-full px-4 py-2 rounded font-medium mb-3 ${plan.color === 'orange' ? 'bg-[#FF6B00] text-white hover:bg-[#E85A00]' : 'border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF4E8]'}`}>
              Edit Plan
            </button>
            <div className="space-y-1">
              {plan.features.map(f => (
                <div key={f} className="text-xs text-gray-700">✓ {f}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* User Subscriptions Table */}
      <Card>
        <h3 className="font-semibold mb-3 pb-2 border-b-2 border-[#FF6B00]">Active Subscriptions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-2">User</th>
                <th className="p-2">Plan</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
                <th className="p-2">Auto-Renew</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map(sub => {
                const user = mockUsers.find(u => u.id === sub.userId)
                return (
                  <tr key={sub.userId} className="border-b hover:bg-[#FFF4E8]">
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2"><span className={`px-2 py-1 rounded text-xs font-medium ${sub.plan === 'premium' ? 'bg-[#FFA64D] text-white' : sub.plan === 'enterprise' ? 'bg-[#FF6B00] text-white' : 'bg-gray-100'}`}>{sub.plan}</span></td>
                    <td className="p-2">{new Date(sub.startDate).toLocaleDateString()}</td>
                    <td className="p-2">{new Date(sub.endDate).toLocaleDateString()}</td>
                    <td className="p-2">{sub.autoRenew ? '✓' : '✗'}</td>
                    <td className="p-2"><button className="text-xs text-[#FF6B00] hover:underline">Edit</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
