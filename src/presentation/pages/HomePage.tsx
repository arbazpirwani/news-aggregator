import {useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {SearchBar} from '../components/molecules/SearchBar'
import {ArticleList} from '../components/organisms/ArticleList'
import {FilterPanel} from '../components/organisms/FilterPanel'
import {Button} from '../components/atoms/Button'
import {useTopHeadlines} from '../../hooks'
import {useSearchArticles} from '../../hooks'
import {Category, Country} from '../../domain'
import type {Article} from '../../domain'

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [selectedCountry, setSelectedCountry] = useState<Country>()
    const [page, setPage] = useState(1)

    const queryClient = useQueryClient()

    // Top headlines
    const {
        data: topData,
        isLoading: loadingTop,
        error: errorTop,
    } = useTopHeadlines(selectedCategory, selectedCountry, page)

    // Search results (enabled only when `searchQuery` is non-empty)
    const {
        data: searchData,
        isLoading: loadingSearch,
        error: errorSearch,
    } = useSearchArticles(searchQuery, selectedCategory, selectedCountry, page)

    const isLoading = searchQuery ? loadingSearch : loadingTop
    const error = searchQuery ? errorSearch : errorTop
    const articles: Article[] =
        (searchQuery ? searchData : topData)?.articles ?? []

    const handleSearch = (q: string) => {
        setSearchQuery(q)
        setPage(1)
    }

    const handleClearFilters = () => {
        setSearchQuery('')
        setSelectedCategory(undefined)
        setSelectedCountry(undefined)
        setPage(1)
        // clear out any stale search-query cache
        queryClient.removeQueries({queryKey: ['searchArticles'], exact: false})
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            News Aggregator
                        </h1>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Sign In</Button>
                            <Button variant="primary" size="sm">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search */}
                <div className="mb-8">
                    <SearchBar
                        onSearch={handleSearch}
                        initialValue={searchQuery}
                    />
                    {searchQuery && (
                        <p className="mt-2 text-sm text-gray-600">
                            Showing results for: <span className="font-medium">{searchQuery}</span>
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <aside className="lg:col-span-1">
                        <FilterPanel
                            selectedCategory={selectedCategory}
                            selectedCountry={selectedCountry}
                            onCategoryChange={cat => {
                                setSelectedCategory(cat);
                                setPage(1)
                            }}
                            onCountryChange={c => {
                                setSelectedCountry(c);
                                setPage(1)
                            }}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    {/* Articles + Pagination */}
                    <section className="lg:col-span-3">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {searchQuery ? 'Search Results' : 'Latest Articles'}
                            </h2>
                            <span className="text-sm text-gray-600">
                    Showing {articles.length} of{' '}
                                {searchQuery
                                    ? (searchData?.totalResults ?? 0)
                                    : (topData?.totalResults ?? 0)}
                  </span>
                        </div>

                        <ArticleList
                            articles={articles}
                            isLoading={isLoading}
                            error={error?.message ?? null}
                        />

                        {/* pagination */}
                        <div className="mt-6 flex justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

