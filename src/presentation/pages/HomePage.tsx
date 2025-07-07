import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterPanel }     from '../components/organisms/FilterPanel'
import { ArticleList }     from '../components/organisms/ArticleList'
import { Button }          from '../components/atoms/Button'
import { useTopHeadlines } from '../../hooks'
import { Provider, ALL_PROVIDERS } from '../../domain/entities/Provider'
import type { Category, Country }  from '../../domain'

export default function HomePage() {
    const [provider, setProvider] = useState<Provider>()
    const [category, setCategory] = useState<Category>()
    const [country, setCountry]   = useState<Country>()
    const [page, setPage]         = useState(1)

    const { data, isLoading, error } = useTopHeadlines(
        provider,
        category,
        country,
        page
    )

    const handleClear = () => {
        setProvider(undefined)
        setCategory(undefined)
        setCountry(undefined)
        setPage(1)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Top Headlines</h1>
                    <Link to="/search">
                        <Button variant="outline" size="sm">Search</Button>
                    </Link>
                </div>
            </header>

            {/* Filters + Provider Selector */}
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                <div className="bg-white rounded-md shadow p-6 space-y-4">
                    <FilterPanel
                        selectedCategory={category}
                        selectedCountry={country}
                        onCategoryChange={c => { setCategory(c); setPage(1) }}
                        onCountryChange={c => { setCountry(c); setPage(1) }}
                        onClearFilters={handleClear}
                    />

                    <div className="flex items-center gap-4">
                        <label className="font-medium text-gray-700">Provider:</label>
                        <select
                            value={provider ?? ''}
                            onChange={e => {
                                setProvider(e.target.value as Provider)
                                setPage(1)
                            }}
                            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">All</option>
                            {ALL_PROVIDERS.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && <div className="text-red-600">Error: {error.message}</div>}

                {/* Articles */}
                <ArticleList
                    articles={data?.articles ?? []}
                    isLoading={isLoading}
                />

                {/* Pagination */}
                <div className="flex justify-between">
                    <Button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                        Previous
                    </Button>
                    <Button disabled={!data?.articles?.length} onClick={() => setPage(p => p + 1)}>
                        Next
                    </Button>
                </div>
            </main>
        </div>
    )
}
