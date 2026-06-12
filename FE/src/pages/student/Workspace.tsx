export default function Workspace() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Workspace</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">To Do</div>
        <div className="card">In Progress</div>
        <div className="card">Completed</div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Project Overview</h3>
        <p className="text-sm text-gray-600">Milestones, files, and activity feed (mock).</p>
      </div>
    </div>
  )
}
