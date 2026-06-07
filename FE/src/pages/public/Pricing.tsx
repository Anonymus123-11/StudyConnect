export default function Pricing() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Pricing</h1>
      <p className="text-gray-600">Plans for individuals and teams. No payment integration — mock upgrade buttons.</p>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold">Free</h3>
          <p className="mt-2">Basic Profile, Join Teams, Workspace Access, Basic Analytics</p>
          <div className="mt-4">
            <button className="px-4 py-2 rounded border">Current</button>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Premium</h3>
          <p className="mt-2">Unlimited AI Idea Generation, Advanced Matching, Advanced Analytics, Export Reports</p>
          <div className="mt-4">
            <button className="px-4 py-2 rounded bg-[var(--color-primary)] text-white">Upgrade (Coming Soon)</button>
          </div>
        </div>
      </div>
    </div>
  )
}
