export default function TeamMatching() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Team Matching</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold">Create Team</h3>
          <p className="text-sm text-gray-600">Start a new team and invite members.</p>
        </div>
        <div className="card">Browse Teams</div>
        <div className="card">Search & Filters</div>
      </div>
    </div>
  )
}
