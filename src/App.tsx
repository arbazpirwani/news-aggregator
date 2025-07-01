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

// Mock data for testing UI
const mockArticles: Article[] = [
    {
        id: '1',
        title: 'Breaking: Major Tech Company Announces Revolutionary AI Breakthrough',
        description: 'Scientists have developed a new artificial intelligence system that can understand and generate human-like text with unprecedented accuracy.',
        url: 'https://example.com/article1',
        urlToImage: 'https://picsum.photos/400/300?random=1',
        publishedAt: '2024-01-15T10:30:00Z',
        source: { id: 'tech-news', name: 'Tech News Daily' },
        author: 'John Smith',
        category: 'technology',
    },
    {
        id: '2',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'World leaders commit to ambitious new targets for reducing carbon emissions over the next decade.',
        url: 'https://example.com/article2',
        urlToImage: 'https://picsum.photos/400/300?random=2',
        publishedAt: '2024-01-15T08:15:00Z',
        source: { id: 'world-news', name: 'World News Network' },
        author: 'Sarah Johnson',
        category: 'general',
    },
    {
        id: '3',
        title: 'Stock Market Hits Record High Amid Economic Recovery',
        description: 'Major indices surge as investors show confidence in the recovering economy and strong corporate earnings.',
        url: 'https://example.com/article3',
        urlToImage: 'https://picsum.photos/400/300?random=3',
        publishedAt: '2024-01-14T14:45:00Z',
        source: { id: 'financial-times', name: 'Financial Times' },
        author: 'Michael Chen',
        category: 'business',
    },
];

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Simulate loading
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleClearFilters = () => {
        setSelectedCategory(undefined);
        setSelectedCountry(undefined);
    };

    return (
        <QueryProvider>
            <DependencyProvider>
                <div className="min-h-screen bg-gray-100">
                    {/* Header */}
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">News Aggregator</h1>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Sign In</Button>
                                    <Button variant="primary" size="sm">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Search Bar */}
                        <div className="mb-8">
                            <SearchBar onSearch={handleSearch} />
                            {searchQuery && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Showing results for: <span className="font-medium">{searchQuery}</span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Filters - Sidebar on desktop, top on mobile */}
                            <aside className="lg:col-span-1">
                                <FilterPanel
                                    selectedCategory={selectedCategory}
                                    selectedCountry={selectedCountry}
                                    onCategoryChange={setSelectedCategory}
                                    onCountryChange={setSelectedCountry}
                                    onClearFilters={handleClearFilters}
                                />
                            </aside>

                            {/* Articles */}
                            <section className="lg:col-span-3">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Latest Articles</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Showing {mockArticles.length} articles</span>
                                    </div>
                                </div>

                                <ArticleList
                                    articles={mockArticles}
                                    isLoading={isLoading}
                                    error={null}
                                />
                            </section>
                        </div>
                    </main>

                    {/* Demo UI Elements */}
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