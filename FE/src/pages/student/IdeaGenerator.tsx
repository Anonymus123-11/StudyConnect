import { useState } from 'react'

export default function IdeaGenerator() {
  const [idea, setIdea] = useState<any>(null)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    // mock AI output
    setIdea({
      name: 'EduMatch AI',
      problem: 'Students struggle to find complementary team members for capstone projects.',
      solution: 'A matchmaking platform that pairs complementary skills and schedules.',
      market: 'Universities and bootcamps',
      potential: 'High'
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">AI Idea Generator</h1>
      <form onSubmit={handleGenerate} className="card">
        <div className="grid md:grid-cols-3 gap-2">
          <input placeholder="Target Users" className="border px-2 py-1" />
          <input placeholder="Problem Area" className="border px-2 py-1" />
          <input placeholder="Technology" className="border px-2 py-1" />
        </div>
        <div className="mt-3">
          <button className="px-4 py-2 rounded bg-[var(--color-primary)] text-white">Generate Idea</button>
        </div>
      </form>

      {idea && (
        <div className="mt-4 card">
          <h3 className="text-lg font-semibold">{idea.name}</h3>
          <p className="mt-2"><strong>Problem:</strong> {idea.problem}</p>
          <p className="mt-1"><strong>Solution:</strong> {idea.solution}</p>
          <p className="mt-1"><strong>Target Market:</strong> {idea.market}</p>
        </div>
      )}
    </div>
  )
}
