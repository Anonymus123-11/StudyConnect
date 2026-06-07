import Card from '../../components/cards/Card'
import { mockPayments, mockUsers } from '../../services/mock/mockData'

export default function PaymentManagement() {
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length
  const avgTransaction = mockPayments.length > 0 ? (totalRevenue / mockPayments.length).toFixed(2) : '0.00'

  const revenueByPlan = {
    free: 0,
    premium: mockPayments.filter(p => p.plan === 'premium').reduce((sum, p) => sum + p.amount, 0),
    enterprise: mockPayments.filter(p => p.plan === 'enterprise').reduce((sum, p) => sum + p.amount, 0),
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment Management</h1>

      {/* Revenue Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-[#FF6B00]">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-[#FF6B00]">${totalRevenue.toFixed(2)}</p>
        </Card>
        <Card className="border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Completed Payments</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{completedPayments}</p>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Avg Transaction</p>
          <p className="text-3xl font-bold text-[#FF6B00]">${avgTransaction}</p>
        </Card>
        <Card className="border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-3xl font-bold text-[#FF6B00]">{mockPayments.length}</p>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="font-semibold mb-3 pb-2 border-b-2 border-[#FF6B00]">Revenue by Plan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Premium</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded h-2 overflow-hidden">
                  <div className="bg-[#FF6B00] h-full" style={{ width: revenueByPlan.premium > 0 ? '70%' : '0%' }} />
                </div>
                <span className="font-bold text-[#FF6B00]">${revenueByPlan.premium.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Enterprise</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded h-2 overflow-hidden">
                  <div className="bg-[#FF6B00] h-full" style={{ width: revenueByPlan.enterprise > 0 ? '100%' : '0%' }} />
                </div>
                <span className="font-bold text-[#FF6B00]">${revenueByPlan.enterprise.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3 pb-2 border-b-2 border-[#FF6B00]">Payment Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Success Rate:</span><strong className="text-[#FF6B00]">100%</strong></div>
            <div className="flex justify-between"><span>Pending:</span><strong className="text-[#FF6B00]">{mockPayments.filter(p => p.status === 'pending').length}</strong></div>
            <div className="flex justify-between"><span>Failed:</span><strong className="text-[#FF6B00]">{mockPayments.filter(p => p.status === 'failed').length}</strong></div>
            <div className="flex justify-between"><span>Avg Monthly:</span><strong className="text-[#FF6B00]">${(totalRevenue / 12).toFixed(2)}</strong></div>
          </div>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <h3 className="font-semibold mb-3 pb-2 border-b-2 border-[#FF6B00]">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-2">User</th>
                <th className="p-2">Plan</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map(payment => {
                const user = mockUsers.find(u => u.id === payment.userId)
                return (
                  <tr key={payment.id} className="border-b hover:bg-[#FFF4E8]">
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2 capitalize">{payment.plan}</td>
                    <td className="p-2 font-bold text-[#FF6B00]">${payment.amount.toFixed(2)}</td>
                    <td className="p-2 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">{payment.status}</span></td>
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
