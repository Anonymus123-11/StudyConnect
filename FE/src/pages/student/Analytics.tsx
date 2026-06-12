import ContributionChart from '../../components/charts/ContributionChart'

export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Contribution Analytics</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold">Participation Score</h3>
          <p className="text-3xl mt-2">78</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Completed Tasks</h3>
          <p className="text-3xl mt-2">24</p>
        </div>
      </div>

      <div className="mt-6 card">
        <h3 className="font-semibold">Weekly Activity</h3>
        <ContributionChart />
      </div>
    </div>
  )
}
