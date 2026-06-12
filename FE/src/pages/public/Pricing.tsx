import { useAuth, UserTier } from '../../contexts/AuthContext'

export default function Pricing() {
  const { user, updateTier } = useAuth()
  const currentTier = user?.tier || 'free'

  const handlePayment = (tier: UserTier, method: 'MoMo' | 'VNPay') => {
    if (!user) {
      alert('Please login first to upgrade your plan!')
      return
    }
    
    const confirmPay = window.confirm(`[Mock Payment] Do you want to pay for ${tier.toUpperCase()} via ${method}?`)
    if (confirmPay) {
      updateTier(tier)
      alert(`Success! Your account has been upgraded to ${tier.toUpperCase()}.`)
    }
  }

  const plans: { id: UserTier; name: string; price: string; features: string[] }[] = [
    {
      id: 'student-basic',
      name: 'Student Basic',
      price: '$4.99/mo',
      features: ['Basic Profile', 'Join Teams', 'Workspace Access', 'Basic Analytics'],
    },
    {
      id: 'student-pro',
      name: 'Student Pro',
      price: '$9.99/mo',
      features: ['Unlimited AI Idea Generation', 'Advanced Matching', 'Advanced Analytics', 'Export Reports'],
    },
    {
      id: 'teacher-pro',
      name: 'Teacher Pro',
      price: '$19.99/mo',
      features: ['All Student Pro Features', 'Monitor Multiple Teams', 'Student Invitations', 'Detailed Team Analytics'],
    },
  ]

  return (
    <div className="py-8 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center">Pricing Plans</h1>
      <p className="text-gray-600 text-center mt-2">
        Current Status: <span className="font-bold text-[var(--color-primary)] uppercase">{currentTier}</span>
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentTier === plan.id

          return (
            <div key={plan.id} className={`border rounded-lg p-6 bg-white shadow-sm flex flex-col justify-between ${isCurrent ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-2xl font-semibold mt-2 text-gray-800">{plan.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {plan.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {isCurrent ? (
                  <button className="w-full px-4 py-2 rounded bg-gray-100 text-gray-500 font-medium cursor-not-allowed border" disabled>
                    Current Plan
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => handlePayment(plan.id, 'MoMo')} 
                      className="w-full px-4 py-2 rounded bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
                    >
                      Pay with MoMo (Mock)
                    </button>
                    <button 
                      onClick={() => handlePayment(plan.id, 'VNPay')} 
                      className="w-full px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      Pay with VNPay (Mock)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}