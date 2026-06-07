const categories = ['Education', 'Healthcare', 'Environment', 'Technology', 'Student Life', 'Smart Cities', 'Sustainability']

export default function Opportunities() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Opportunities</h1>
      <div className="mb-4 flex gap-2">
        {categories.map((c) => (
          <button key={c} className="px-3 py-1 rounded border text-sm">{c}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="card">
            <h3 className="font-semibold">Opportunity {i}</h3>
            <p className="text-sm text-gray-600">Short description and tags</p>
            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 rounded bg-[var(--color-primary)] text-white text-sm">View</button>
              <button className="px-2 py-1 rounded border text-sm">Bookmark</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
