import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-4 text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight">Resource Centre</h1>
      <p className="text-slate-400">
        Edit <code className="rounded bg-slate-800 px-2 py-1">src/App.tsx</code>{' '}
        and save to test HMR
      </p>
      <button
        type="button"
        className="rounded-lg bg-violet-600 px-4 py-2 font-medium transition hover:bg-violet-500"
        onClick={() => setCount((value) => value + 1)}
      >
        Count is {count}
      </button>
    </main>
  )
}

export default App
