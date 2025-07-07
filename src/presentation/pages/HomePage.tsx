import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterPanel }      from '../components/organisms/FilterPanel'
import { ArticleList }      from '../components/organisms/ArticleList'
import { Button }           from '../components/atoms/Button'
import { useTopHeadlines }  from '../../hooks'
import type { Category, Country } from '../../domain'

export default function HomePage() {
    const [category, setCategory] = useState<Category>()
    const [country, setCountry]   = useState<Country>()
    const [page, setPage]         = useState(1)

    const { data, isLoading, error } = useTopHeadlines(
        category,
        country,
        page
    )

    const handleClear = () => {
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

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-md shadow p-6 space-y-4">
                    <FilterPanel
                        selectedCategory={category}
                        selectedCountry={country}
                        onCategoryChange={c => { setCategory(c); setPage(1) }}
                        onCountryChange={c => { setCountry(c); setPage(1) }}
                        onClearFilters={handleClear}
                    />
                </div>

                {/* Errors */}
                {error && <div className="text-red-600">Error: {error.message}</div>}

                {/* Articles */}
                <ArticleList
                    articles={data?.articles ?? []}
                    isLoading={isLoading}
                />

                {/* Pagination */}
                <div className="flex justify-between">
                    <Button
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={!data?.articles?.length}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    )
}
