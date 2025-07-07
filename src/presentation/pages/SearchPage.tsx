import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar }         from '../components/molecules/SearchBar'
import { ArticleList }       from '../components/organisms/ArticleList'
import { Button }            from '../components/atoms/Button'
import { useSearchArticles } from '../../hooks'
import DatePicker            from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage]               = useState(1)

    // single date‑range state
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
    const [startDate, endDate]      = dateRange

    // disable manual typing in the picker
    const handleRaw = (e: React.KeyboardEvent<HTMLInputElement>) => e.preventDefault()

    // convert to YYYY-MM-DD
    const from = startDate ? startDate.toISOString().split('T')[0] : undefined
    const to   = endDate   ? endDate.toISOString().split('T')[0]   : undefined

    const { data, isLoading, error } = useSearchArticles(
        searchQuery,
        page,
        from,
        to
    )

    const handleSearch = (q: string) => {
        setSearchQuery(q)
        setPage(1)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Search Articles</h1>
                    <Link to="/">
                        <Button variant="outline" size="sm">Home</Button>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                <div className="bg-white rounded-md shadow p-6 space-y-4 w-full">
                    {/* full‑width search bar */}
                    <SearchBar
                        onSearch={handleSearch}
                        initialValue={searchQuery}
                        placeholder="Enter keywords and press Go…"
                        className="w-full"
                    />

                    {/* single date‑range picker */}
                    <DatePicker
                        selectsRange
                        startDate={startDate ?? undefined}
                        endDate={endDate   ?? undefined}
                        onChange={upd => { setDateRange(upd); setPage(1) }}
                        isClearable
                        onChangeRaw={handleRaw}
                        placeholderText="Select date range"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Errors */}
                {error && <div className="text-red-600">Error: {error.message}</div>}

                {/* Articles */}
                <ArticleList
                    articles={data?.articles ?? []}
                    isLoading={isLoading}
                    emptyMessage="No matching articles"
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
