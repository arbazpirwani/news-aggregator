import { useState } from 'react';
import { QueryProvider } from './presentation/providers/QueryProvider';
import { DependencyProvider } from './presentation/context/DependencyContext';
import { SearchBar } from './presentation/components/molecules/SearchBar';
import { ArticleList } from './presentation/components/organisms/ArticleList';
import { FilterPanel } from './presentation/components/organisms/FilterPanel';
import { Button } from './presentation/components/atoms/Button';
import { Spinner } from './presentation/components/atoms/Spinner';
import { Category, Country } from './domain/entities/UserPreferences';
import type { Article } from './domain/entities/Article';
import { useTopHeadlines } from './presentation/hooks/useTopHeadlines';
import { useSearchArticles } from './presentation/hooks/useSearchArticles';

function App() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [selectedCountry, setSelectedCountry] = useState<Country>();

    const top = useTopHeadlines(
        { country: selectedCountry, category: selectedCategory },
        { enabled: searchQuery === '' }
    );
    const search = useSearchArticles(
        { query: searchQuery },
        { enabled: searchQuery !== '' }
    );

    const { data: collection, isLoading, error } = searchQuery ? search : top;
    const articles: Article[] = collection?.articles ?? [];
    const totalResults = collection?.totalResults ?? 0;

    const handleSearch = (query: string) => setSearchQuery(query);
    const handleClearFilters = () => {
        setSelectedCategory(undefined);
        setSelectedCountry(undefined);
    };

    return (
        <QueryProvider>
            <DependencyProvider>
                <div className="min-h-screen bg-gray-100">
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">News Aggregator</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Sign In</Button>
                                <Button variant="primary" size="sm">Subscribe</Button>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8">
                            <SearchBar onSearch={handleSearch} />
                            {searchQuery && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Showing results for: <span className="font-medium">{searchQuery}</span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <aside className="lg:col-span-1">
                                <FilterPanel
                                    selectedCategory={selectedCategory}
                                    selectedCountry={selectedCountry}
                                    onCategoryChange={setSelectedCategory}
                                    onCountryChange={setSelectedCountry}
                                    onClearFilters={handleClearFilters}
                                />
                            </aside>

                            <section className="lg:col-span-3">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {searchQuery ? 'Search Results' : 'Latest Articles'}
                                    </h2>
                                    <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {isLoading
                          ? 'Loading…'
                          : `Showing ${articles.length} of ${totalResults} articles`}
                    </span>
                                    </div>
                                </div>

                                <ArticleList articles={articles} isLoading={isLoading} error={error} />
                            </section>
                        </div>
                    </main>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t">
                        <h3 className="text-lg font-semibold mb-4">Component Demo</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2 items-center">
                                <Button variant="primary" size="sm">Small</Button>
                                <Button variant="primary" size="md">Medium</Button>
                                <Button variant="primary" size="lg">Large</Button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Spinner size="sm" />
                                <Spinner size="md" />
                                <Spinner size="lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </DependencyProvider>
        </QueryProvider>
    );
}

export default App;
