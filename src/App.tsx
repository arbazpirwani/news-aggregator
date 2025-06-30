import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-center gap-4 mb-8">
                <img src={viteLogo} className="h-16" alt="Vite logo" />
                <img src={reactLogo} className="h-16 animate-spin" alt="React logo" />
            </div>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                Tailwind is Working! 🎉
            </h1>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <button
                    onClick={() => setCount(count + 1)}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Count is {count}
                </button>
            </div>
        </div>
    )
}

export default App